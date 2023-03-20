(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoUI"] = factory();
	else
		root["ArcheoUI"] = factory();
})(window, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addPlotlyTrace": () => (/* binding */ addPlotlyTrace),
/* harmony export */   "addSliderMark": () => (/* binding */ addSliderMark),
/* harmony export */   "copyStringToClipboard": () => (/* binding */ copyStringToClipboard),
/* harmony export */   "copyToClipboard": () => (/* binding */ copyToClipboard),
/* harmony export */   "createPlotly": () => (/* binding */ createPlotly),
/* harmony export */   "hoverPlotlyFeature": () => (/* binding */ hoverPlotlyFeature),
/* harmony export */   "initializeChart": () => (/* binding */ initializeChart),
/* harmony export */   "initializeColorInput": () => (/* binding */ initializeColorInput),
/* harmony export */   "initializeGradientInput": () => (/* binding */ initializeGradientInput),
/* harmony export */   "initializeRangeSpinner": () => (/* binding */ initializeRangeSpinner),
/* harmony export */   "initializeSlider": () => (/* binding */ initializeSlider),
/* harmony export */   "initializeYearInput": () => (/* binding */ initializeYearInput),
/* harmony export */   "initializeYearTexts": () => (/* binding */ initializeYearTexts),
/* harmony export */   "setGradientValue": () => (/* binding */ setGradientValue),
/* harmony export */   "setSelect": () => (/* binding */ setSelect),
/* harmony export */   "setSelectValue": () => (/* binding */ setSelectValue),
/* harmony export */   "setSelectValueNoEvent": () => (/* binding */ setSelectValueNoEvent),
/* harmony export */   "setSelectpicker": () => (/* binding */ setSelectpicker),
/* harmony export */   "setTextboxInputStatus": () => (/* binding */ setTextboxInputStatus),
/* harmony export */   "toggleCheckbox": () => (/* binding */ toggleCheckbox),
/* harmony export */   "toggleRadiobutton": () => (/* binding */ toggleRadiobutton)
/* harmony export */ });
/***
 * Contains functions that hooks newly created custom UI elements to corresponding events.
 */
async function initializeYearTexts(selector = '.years-text') {
  $(selector).each(function () {
    $(this).html(ArcheoUtilities.getFormattedYear($(this).text()));
  });
}

function initializeYearInput($element, doInitialize = true, initialyTrigger = true) {
  var $input = $element.find('input');
  if (!$.fn.getDateNumberValue) $.fn.getDateNumberValue = function () {
    return ArcheoUtilities.parseInput($(this).val());
  };
  /* Set min-max span from cache */

  if (doInitialize) {
    //$input.attr('min', minMax[0]);
    //$input.attr('max', minMax[1]);
    $input.val(ArcheoUtilities.getFirstNonEmptyValue($input.attr('value'), $input.val()));
  }

  $input.change(function () {
    let properValue = ArcheoUtilities.parseInput($(this).val());
    if (properValue === '') properValue = ArcheoUtilities.parseInput($(this).attr('value'));else $(this).attr('value', properValue);

    if (ArcheoUtilities.isValid($(this).attr('is_year'))) {
      let era = ArcheoUtilities.getEra(properValue);
      $(this).val(`${Math.abs(properValue)} ${era}`);
    } else $(this).val(`${properValue}`);
    /* Trigger change on the main container */


    $input.parent().change();
    $($input.parent().parent()[0]).change();
    return false;
  });
  /* Initially run events to properly display initial data */

  if (initialyTrigger) {
    $input.trigger('change');
  }
}

function initializeRangeSpinner($element, timelineMinMax, doInitialize = true, lang = 'en', setToMinMax = false) {
  var $fromWrapper = $element.find('.input-years-from');
  var $toWrapper = $element.find('.input-years-to'); //var $singleWrapper = $element.find('.input-years');

  var isFromModern = $fromWrapper.hasClass('contemporary');
  var isToModern = $toWrapper.hasClass('contemporary');
  var $from = $fromWrapper.find('input');
  var $to = $toWrapper.find('input'); //var $single = $singleWrapper.find('input');

  var currentYear = new Date().getFullYear();
  /* Set min-max span from metadata */

  if (doInitialize) {
    let initialFromValue;

    if (isFromModern) {
      $from.attr('min', 1901);
      $from.attr('max', currentYear);
      initialFromValue = "1901";
    } else {
      $from.attr('min', timelineMinMax[0]);
      $from.attr('max', timelineMinMax[1]); //initialFromValue = ArcheoUtilities.getFirstNonEmptyValue( $from.attr('value'), "0" );

      initialFromValue = timelineMinMax[0];
    }

    $from.val(initialFromValue);
    $from.attr('value', initialFromValue);
    $from.trigger("change");
    let initialToValue;

    if (isToModern) {
      $to.attr('min', 1901);
      $to.attr('max', currentYear);
      initialToValue = `${currentYear}`;
    } else {
      $to.attr('min', timelineMinMax[0]);
      $to.attr('max', timelineMinMax[1]); //initialToValue = ArcheoUtilities.getFirstNonEmptyValue( $to.attr('value'), "0" );

      initialToValue = timelineMinMax[1];
    }

    $to.val(initialToValue);
    $to.attr('value', initialToValue);
    $to.trigger("change");
  }
  /* Hook-up events */


  $from.change(function () {
    let $to = $(this).parent().parent().find('.input-years-to input');
    let properValue = ArcheoUtilities.parseInput(ArcheoUtilities.getFirstNonEmptyValue($(this).val(), $(this).attr('value')));
    let toValue = ArcheoUtilities.parseInput(ArcheoUtilities.getFirstNonEmptyValue($to.val(), $to.attr('value')));

    if (properValue !== '') {
      properValue = properValue > toValue ? toValue : properValue;
      properValue = Math.max(properValue, parseInt($(this).attr('min')));
      properValue = Math.min(properValue, parseInt($(this).attr('max')));
      $(this).attr('value', properValue);
    }

    $(this).val('');
    return false;
  });
  $to.change(function () {
    let $from = $(this).parent().parent().find('.input-years-from input');
    let properValue = ArcheoUtilities.parseInput(ArcheoUtilities.getFirstNonEmptyValue($(this).val(), $(this).attr('value')));
    let fromValue = ArcheoUtilities.parseInput(ArcheoUtilities.getFirstNonEmptyValue($from.val(), $from.attr('value')));

    if (properValue !== '') {
      properValue = properValue < fromValue ? fromValue : properValue;
      properValue = Math.max(properValue, parseInt($(this).attr('min')));
      properValue = Math.min(properValue, parseInt($(this).attr('max')));
      $(this).attr('value', properValue);
    }

    $(this).val('');
    return false;
  });
  initializeYearInput($fromWrapper, false, false, lang);
  initializeYearInput($toWrapper, false, false, lang);
  /* Initially run events to properly display initial data */

  $from.trigger('change');
  $to.trigger('change');
}
/*
options: {
	'<value>': {
		name: <label/text>
		datatokens: <tokens>,
		disabled: <disabled>,
		subtext: <subtext>,
		selected: <selected>

		isOptgroup: <>,
		options: {}
	},
	...
}

"attributes": {
	"isOptgroup": true,
	"name": "Data attributes",
	"options": {}
}

*/


function setOptionHTML($el, optionSettings, optionValue) {
  let $newOption = $('<option/>', {
    text: optionSettings.name,
    value: optionValue
  });
  if (optionSettings.datatokens) $newOption.attr('data-tokens', optionSettings.datatokens);
  if (optionSettings.disabled) $newOption.attr('disabled', optionSettings.disabled);
  if (optionSettings.subtext) $newOption.attr('data-subtext', optionSettings.subtext);
  if (optionSettings.type) $newOption.attr('type', optionSettings.type);
  if (optionSettings.special) $newOption.attr('special', '');
  if (optionSettings.title) $newOption.attr('title', optionSettings.title);
  if (optionSettings.filtered) $newOption.addClass('filtered');
  if (ArcheoUtilities.isValid(optionSettings.selected)) $newOption.prop('selected', true);
  $el.append($newOption);
}

function setSelect($el, options, addEmpty = false) {
  $el.empty();

  if (addEmpty) {
    $el.append($('<option/>', {
      text: '',
      value: ''
    }));
  }

  for (var optionValue in options) {
    let optionSettings = options[optionValue];

    if (optionSettings.isOptgroup) {
      let $optgroup = $('<optgroup/>', {
        label: optionSettings.name
      });

      for (var optionValue2 in optionSettings.options) setOptionHTML($optgroup, optionSettings.options[optionValue2], optionValue2);

      $el.append($optgroup);
    } else setOptionHTML($el, optionSettings, optionValue);
  }
}

function setSelectpicker($el, options, doRefresh = true, addEmpty = false) {
  setSelect($el, options, addEmpty = addEmpty);
  if (doRefresh) $el.selectpicker('refresh');
}

function initializeSlider($slider, options) {
  $slider.ionRangeSlider({
    keyboard: true,
    skin: "flat",
    ...options
  });
  return $slider.data("ionRangeSlider");
}

const palettes = {
  'default': [["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"], ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
  'layer': [["#e06666"], ["#f6be6b"], ["#7ec480"], ["#6dc2b9"], ["#5388d4"], ["#9f7cc2"], ["#c27ba0"]],
  'gradient': [['#fff7f7', '#fffcf7', '#f7fff8', '#f7fffe', '#F6FAFE', '#fbf7ff', '#fff7fb'], ['#d36464', '#d4a763', '#63d467', '#63d4c9', '#63A9D3', '#9c63d4', '#d4639d'], ['#990b0b', '#99600b', '#0b990f', '#0b998b', '#0b4699', '#520b99', '#990b54']]
};

function initializeColorInput($element, options = {}, layerNumber = null, changeButtonColorEvent = null, eventsNames = ['move']) {
  if (changeButtonColorEvent === null) changeButtonColorEvent = function (event, color) {
    let rgbColor = color.toRgbString();
    $element.find('.color').css('background-color', rgbColor);
  };
  let colorId = (layerNumber || 0) % palettes.layer.length;
  let palette = palettes[options.palette || 'layer'];
  let color = options.color || palette[colorId][0];
  var $spectrum = $element.spectrum({
    showAlpha: true,
    showInput: true,
    hideAfterPaletteSelect: true,
    showSelectionPalette: false,
    hideAfterPaletteSelect: false,
    // leave it be
    clickoutFiresChange: true,
    showButtons: false,
    showPalette: true,
    ...options,
    palette: palette,
    color: color
  });
  eventsNames.forEach(eventName => {
    $element.on(`${eventName}.spectrum`, changeButtonColorEvent);
  });
  /* Initialy run change color event to synchronize button color with picker initial color */

  $element.trigger(`${eventsNames[0]}.spectrum`, [$element.spectrum('get')]);
  return $spectrum;
}

const defaultGradients = [['#fff7f7', '#d36464', '#990b0b'], ['#fffcf7', '#d4a763', '#99600b'], ['#f7fff8', '#63d467', '#0b990f'], ['#f7fffe', '#63d4c9', '#0b998b'], ['#F6FAFE', '#63A9D3', '#0b4699'], ['#fbf7ff', '#9c63d4', '#520b99'], ['#fff7fb', '#d4639d', '#990b54']];

function initializeGradientInput($element, appendTo = "body") {
  var gradientInputObj = new Grapick({
    el: $element[0],
    // It must be like that, otherwise it will throw jquery error
    direction: 'right',
    min: 0,
    max: 100
  });
  $element.prop('grapick', gradientInputObj);
  /* Create handle replacement events */

  var replaceHandlers = function () {
    var handlers = gradientInputObj.getHandlers().clone();
    handlers.splice(0, 1);
    handlers.splice(handlers.length - 1, 1);
    var step = 100.0 / (handlers.length + 1);
    handlers.forEach((handle, id) => {
      handle.setPosition(parseInt(step * (id + 1)));
    });
  };

  gradientInputObj.on('handler:add', replaceHandlers);
  gradientInputObj.on('handler:drag:end', replaceHandlers);
  gradientInputObj.on('handler:remove', replaceHandlers);
  /* Assing spectrum as a color picker */

  gradientInputObj.setColorPicker(handler => {
    const el = handler.getEl().querySelector('input');
    const $el = $(el);
    ArcheoUI.initializeColorInput($el, {
      appendTo: appendTo,
      replacerClassName: 'opacity-0',
      color: handler.getColor(),
      showAlpha: false,
      palette: 'gradient'
    }, null);
    $el.on('dragstop.spectrum change.spectrum move.spectrum', function (e, color) {
      let colorString = color.toRgbString();
      handler.setColor(colorString, 0);
      let wrapper = handler.getEl().querySelector('.grp-handler-cp-wrap');
      wrapper.style['background-color'] = colorString;
    }); // on handle click...

    return () => {
      $el.spectrum('destroy');
    };
  });
  return gradientInputObj;
}

function setGradientValue(gradientInputObj, gradient = null, layerNumber = null) {
  let colorId = (layerNumber || 0) % palettes.gradient.length;
  let gradientArray;
  if (ArcheoUtilities.isString(gradient)) gradientArray = ArcheoUtilities.gradientToArray(gradient);else gradientArray = gradient;
  if (!ArcheoUtilities.isValid(gradientArray)) gradientArray = defaultGradients[colorId];
  let step = 100.0 / (gradientArray.length - 1);
  /* Clear previous handlers */

  gradientInputObj.clear();
  /* Add new handlers */

  for (var i = 0; i < gradientArray.length; ++i) {
    let handler = gradientInputObj.addHandler(step * i, gradientArray[i]);
    /* If first or last - do not draw handle */

    if (i === 0 || i === gradientArray.length - 1) handler.el.classList.add('grp-handler-fixed');
  }

  return gradientArray;
}

function calcPercentPosition(min, max, position) {
  return (position - min) / (max - min) * 100;
}

function addSliderMark($slider, min, max, markClass, position, text) {
  let percentPosition = calcPercentPosition(min, max, position);
  let html = `<span class="${markClass}" style="left: ${percentPosition}%">${text}</span>`;
  $slider.append(html);
}

function copyToClipboard($obj, format) {
  let copiedValue = $obj.val();
  copyStringToClipboard(copiedValue, format);
}

function copyStringToClipboard(string, format) {
  var $temp = $("<textarea>");
  $("body").append($temp);
  let copiedValue = string;

  if (format === 'JSON') {
    let json = JSON.parse(copiedValue);
    copiedValue = JSON.stringify(json, null, 2);
  }

  $temp.val(copiedValue).trigger('select');
  document.execCommand("copy");
  $temp.remove();
}

function setSelectValue($obj, value) {
  $obj.selectpicker('val', value);
}

function setSelectValueNoEvent($obj, value) {
  $obj.val(value);
  $obj.selectpicker('render');
}

function toggleCheckbox($el, state) {
  if (state === true) {
    $el.addClass('active');
  } else {
    $el.removeClass('active');
  }

  $el.attr('aria-pressed', state.toString());
}

function toggleRadiobutton($el, optionId) {
  $el.find(`input[value=${optionId}]`).prop('checked', true);
}

function initializeChart($el, size, values, labels, options = {}) {
  let $canvas = $('<canvas/>', {
    width: size[0],
    height: size[1]
  });
  $canvas[0].width = size[0];
  $canvas[0].height = size[1];
  $canvas.appendTo($el);
  new Chart($canvas[0], {
    type: options.type || 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: options.title || '',
        data: values,
        backgroundColor: options.colors || null,
        hoverOffset: options.hoverOffset || 0,
        borderWidth: options.borderWidth || 1,
        borderColor: options.borderColor || '#000'
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: options.legend || false
        }
      },
      animation: {
        duration: 0
      }
    }
  });
}

function createPlotly(elId, data, title, options = {}) {
  return new Promise((resolution, rejection) => {
    var layout = {
      showlegend: options.showLegend !== undefined ? options.showLegend : true,
      title: title,
      hovermode: 'closest',
      margin: {
        l: 30,
        r: 30,
        t: 30,
        b: 30
      }
    };
    var tracesDic = {};
    var distinguishedFeature = {};
    var dataLength = data === null ? 0 : data.length;

    for (var i = 0; i < dataLength; ++i) {
      let result = data[i];
      let pointText = `Population: ${result.label}, sample: ${result.id}`;

      if (!(result.label in tracesDic)) {
        tracesDic[result.label] = {
          x: [],
          y: [],
          //color: [],
          name: result.label,
          mode: 'markers',
          type: 'scatter',
          text: [],
          //opacity: options.opacity || 1,
          marker: {
            opacity: []
          },
          legendrank: 1000 //hoverinfo: 'skip'
          //hoverinfo:"x+y"

        };
      }

      if (result.label in tracesDic) {
        tracesDic[result.label].x.push(result.x);
        tracesDic[result.label].y.push(result.y);
        tracesDic[result.label].text.push(pointText);
        tracesDic[result.label].marker.opacity.push(options.opacity || 1);
      }

      if (options.featureId === result.id) distinguishedFeature = result; // result.plot_data.is_present
    }

    if (ArcheoUtilities.isValid(options.featureId)) {
      let feature = distinguishedFeature;
      layout.annotations = [{
        x: feature.x,
        y: feature.y,
        xref: 'x',
        yref: 'y',
        text: '',
        showarrow: true,
        arrowhead: 1,
        ax: 0,
        ay: -50,
        yshift: -3,
        arrowcolor: '#000',
        arrowwidth: 4
      }, {
        x: feature.x,
        y: feature.y,
        xref: 'x',
        yref: 'y',
        text: feature.id,
        showarrow: true,
        arrowhead: 1,
        ax: 0,
        ay: -50,
        arrowcolor: '#fff',
        arrowwidth: 2,
        //arrowsize: 2,
        bordercolor: '#000',
        bgcolor: '#fff',
        borderwidth: 2,
        font: {
          size: 20
        }
      }];
    }

    var traces = [];

    for (var key in tracesDic) traces.push(tracesDic[key]);

    Plotly.newPlot(elId, traces, layout);
    resolution(true);
  });
}

function addPlotlyTrace(elId, data, options = {}) {
  return new Promise((resolution, rejection) => {
    let newTrace = {
      x: [],
      y: [],
      //color: [],
      name: "Cluster's features",
      mode: 'markers',
      type: 'scatter',
      text: [],
      marker: {
        color: '#fff',
        size: 10,
        symbol: 'x',
        line: {
          color: '#000',
          width: 2
        }
      },
      legendrank: 1
    };

    for (var i = 0; i < data.length; ++i) {
      let result = data[i];
      let pointText = `Population: ${result.label}, sample: ${result.id}`;
      newTrace.x.push(result.x);
      newTrace.y.push(result.y);
      newTrace.text.push(pointText);
    }

    Plotly.addTraces(elId, newTrace);
    resolution(true);
  });
}

function hoverPlotlyFeature(elId, state, feature = null) {
  return new Promise((resolution, rejection) => {
    let newLayout = {
      annotations: []
    };

    if (state === true && ArcheoUtilities.isValid(feature.x)) {
      newLayout = {
        annotations: [{
          x: feature.x,
          y: feature.y,
          xref: 'x',
          yref: 'y',
          text: '',
          showarrow: true,
          arrowhead: 1,
          ax: 0,
          ay: -50,
          yshift: -3,
          arrowcolor: '#000',
          arrowwidth: 4
        }, {
          x: feature.x,
          y: feature.y,
          xref: 'x',
          yref: 'y',
          text: feature.id,
          showarrow: true,
          arrowhead: 1,
          ax: 0,
          ay: -50,
          arrowcolor: '#fff',
          arrowwidth: 2,
          //arrowsize: 2,
          bordercolor: '#000',
          bgcolor: '#fff',
          borderwidth: 2,
          font: {
            size: 20
          }
        }]
      };
    }

    Plotly.relayout(elId, newLayout);
    resolution(true);
  });
}

function setTextboxInputStatus($input, isTakingAction) {
  let $icon = $input.next().find('.icon');
  let $status = $input.next().find('.status');

  if (isTakingAction == true) {
    $icon.addClass('hidden');
    $status.removeClass('hidden');
  } else {
    $icon.removeClass('hidden');
    $status.addClass('hidden');
  }
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});