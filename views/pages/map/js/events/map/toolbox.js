import { defaultTextAlign } from "ol/render/canvas";
import { saveAs } from 'file-saver';


function initializeImageSaveEvents() {
    let printControl = ArcheoMap.getMapControls().print;

    printControl.on(['print', 'error'], function(e) {
        let isPdf = $('#photo-modal #photo-image-type input:checked').val() === 'pdf';

        //$('body').css('opacity', 1);
        // Print success
        if (e.image) {
          if (isPdf) {
            // Export pdf using the print info
            var pdf = new jsPDF({
              orientation: e.print.orientation,
              unit: e.print.unit,
              format: e.print.size
            });
            pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
            pdf.save();

          } else  {
            e.canvas.toBlob(function(blob) {
              saveAs(blob, 'map.'+e.imageType.replace('image/',''));
            }, e.imageType);
         }
        } else {
          console.warn('No canvas to export');
        }
    });
}


function intializeChangeBaseMap() {
  $('#map-options-basemap .basemap-option').on('click update', (event) => {
    let $el = $(event.target);
    let session = ArcheoSession.get();

    $('#map-options-basemap .basemap-option').removeClass('active');
    $el.addClass('active');

    let basemapName = $el.attr('option-name');

    if(ArcheoUtilities.isValid(basemapName)) {

      ArcheoMap.setBasemap(basemapName).then(() => {
        if(basemapName !== "Light") {
          $('#map-options-basemap-appearance').attr('disabled', true);
          ArcheoMap.setBackgroundColor('transparent'); // Prevents colorful background from flashing
        } else {
          $('#map-options-basemap-appearance').removeAttr('disabled');

          /* Initialize basemap layers appearance when it is loaded */
          $('.basemap-layer-color').trigger('update');
          $('.basemap-layer-toggle').trigger('update');
        }
  
        $("#basemap-appearance-name").text(basemapName);
        session.map.options.basemap.name = basemapName;
      });
    }
  });
}


function initializeBasemapAppearanceSettings() {
  $("#map-options-basemap-appearance").on("click", function() {
    $("#basemap-modal").modal({'backdrop': false, 'focus': true});
    $("#basemap-modal").modal('show');
  });

  $('.basemap-layers-visibility .basemap-layer-toggle').on('click update', function(event) {
    let $obj = $(event.target);
    let layerName = $obj.attr('toggle-visibility');
    let session = ArcheoSession.get();

    let status;

    if(event.type === 'click')
      status = ! $obj.hasClass('active'); // negation applied intentionally
    else 
      status = $obj.hasClass('active');

    if(event.type === 'update') {
      let sessionStatus = session.map.options.basemap.appearance.visible_layers[layerName];
      if(status !== sessionStatus) {
        $obj.trigger('click');
        return true;
      }
    }

    ArcheoMap.getBasemapLayer(layerName).setVisible(status);
  });

  $('.basemap-layer-color').on(`move.spectrum change.spectrum update`, function(e, color) {
    let session = ArcheoSession.get();
    let $el = $(e.target);
    let targetLayer = $el.attr('target-layer');
    let layer = ArcheoMap.getBasemapLayer(targetLayer);

    let rgbColor;

    if(e.type === "update") {
      rgbColor = session.map.options.basemap.appearance.colors[ targetLayer ];

      ArcheoUI.initializeColorInput($el, {
        appendTo: "#map-wrapper",
        color: rgbColor,
        palette: 'default'
      });
    } else {
      rgbColor = color.toRgbString();
      session.map.options.basemap.appearance.colors[ targetLayer ] = rgbColor;
    }
    
    if(targetLayer === 'map-background')
      ArcheoMap.setBackgroundColor(rgbColor);
    else {
      ArcheoMap.setVectorLayerObjectsColor(layer, rgbColor);
    }
  });
}


function initializeFullscreen() {
  var mapEl = document.getElementById("map-wrapper");
  var viewFullScreen = document.getElementById("map-options-fullscreen");
  if (viewFullScreen) {
    viewFullScreen.addEventListener("click", function() {
      $("#map-wrapper").addClass('fullscreen');

      if (mapEl.requestFullscreen) {
        mapEl.requestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        mapEl.msRequestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        mapEl.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        mapEl.webkitRequestFullScreen();
      }
    })
  }

  let onFullScreenExit = function() {
    var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

    if(ArcheoUtilities.isValid(state) == false)
      $("#map-wrapper").removeClass('fullscreen');
  }

  $(mapEl).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
    onFullScreenExit();
  });

  $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
    onFullScreenExit();
  });
}


function initializeFeaturesSettings() {
  $('#map-options-features button.checkbox').on('click update', function(event) {
    let session = ArcheoSession.get();
    let visibleFeaturesDict = session.map.options.features.visible;
    let $el = $(event.target);
    let $target = $( $el.attr("toggle-target") );
    let featureName = $el.attr("option-name");
    let isFeatureVisible = visibleFeaturesDict[featureName] === true;

    if(event.type === 'update') {
      if( $el.hasClass('active') !== isFeatureVisible )
        $el.toggleClass('active');
    }
    else
      $el.toggleClass('active');

    if($el.hasClass('active')) {
      $target.removeClass('hidden');
      visibleFeaturesDict[featureName] = true;
    } else {
      $target.addClass('hidden');
      visibleFeaturesDict[featureName] = false;
    }

    return true;
  });

  $("#map-options-features-appearance").on("click", function() {
    $("#map-features-settings-modal").modal({'backdrop': false, 'focus': true});
    $("#map-features-settings-modal").modal('show');
  });
}


function initializeFeaturesAppearanceSettings() {
  $(".map-features-textbox input").on("change update", function(event) {
    let session = ArcheoSession.get();
    let $el = $(event.target);
    let text = $el.val();
    let $targetEl = $( $el.parent().attr("event-target") );
    let optionName = $el.parent().attr("option-name");

    if(event.type === 'update') {
      text = session.map.options.features.appearance[optionName];
      $el.val(text);
    }
    else if(event.type === 'change') {
      $el.trigger('blur');
    }

    $targetEl.text(text);
    session.map.options.features.appearance[optionName] = text;
  });
}


function initializeBasemapOnSessionLoad() {
  $('#map').on('session-load', function() {
    let session = ArcheoSession.get();
    let basemapName = session.map.options.basemap.name;
    
    let $basemaps = $(`#map-options-basemap .basemap-option[option-name=${basemapName}]`);

    $basemaps.trigger('update');
  });
}


function initializeFeaturesOnSessionLoad() {
  $('#map').on('session-load', function() {
    $('#map-options-features button.checkbox').trigger('update');
    $('.map-features-textbox input').trigger('update');
  });
}


function initializeToolboxEvents() {
    initializeImageSaveEvents();
    intializeChangeBaseMap();
    initializeBasemapAppearanceSettings();
    //initializeBasemapAppearanceSettingsOnSessionLoad();
    initializeFullscreen();
    initializeFeaturesSettings();
    initializeFeaturesOnSessionLoad();
    initializeBasemapOnSessionLoad();
    initializeFeaturesAppearanceSettings();
}


export default initializeToolboxEvents;