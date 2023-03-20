
function initializeMapWrapper(map) {
  let $wrapper = $('#map-wrapper');

  $wrapper.resizable({
		//containment: "#legend-panel",
		minHeight: $wrapper.css('min-height'),
    handles: "s",
		/*resize: function( event, ui ) {
			map.updateSize();
    }*/
	});

  $wrapper.resize( function() {
    map.updateSize();
  });
}


function initializeInteractiveMap(lang) {
  let mapInfo = ArcheoSession.get().map;

  let featureCoordinates = window.entityFeature.coordinates;

  var mapConfig = {
    mapInitialCenter: [featureCoordinates.longitude, featureCoordinates.latitude],
	  dataProjection: mapInfo.dataProjection,
	  mapProjection: mapInfo.mapProjection,
    mapInitialZoom: mapInfo.zoom,
    mapDOMObjectId: "map", // #map
	  basemapName: 'Imagery', //'Light',
    controlsNames: [],
    interactionsNames: 'all' //['defaults']
  };

  let map = ArcheoMap.initializeMap(mapConfig, lang);
  ArcheoMap.setBasemap('Imagery');

  return map;
}


function initializeMapElements() {
  let map = initializeInteractiveMap(); // lang?
  initializeMapWrapper(map);
}


export default initializeMapElements;