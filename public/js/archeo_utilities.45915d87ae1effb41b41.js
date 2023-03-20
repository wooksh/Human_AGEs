(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoUtilities"] = factory();
	else
		root["ArcheoUtilities"] = factory();
})(window, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4616:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }

  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a), d.responseType = "blob", d.onload = function () {
      g(d.response, b, c);
    }, d.onerror = function () {
      console.error("could not download file");
    }, d.send();
  }

  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);

    try {
      b.send();
    } catch (a) {}

    return 200 <= b.status && 299 >= b.status;
  }

  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }

  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof __webpack_require__.g && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : void 0,
      a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
      g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
    var i = f.URL || f.webkitURL,
        j = document.createElement("a");
    g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
      i.revokeObjectURL(j.href);
    }, 4E4), setTimeout(function () {
      e(j);
    }, 0));
  } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
    if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
      var i = document.createElement("a");
      i.href = f, i.target = "_blank", setTimeout(function () {
        e(i);
      });
    }
  } : function (b, d, e, g) {
    if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
    var h = "application/octet-stream" === b.type,
        i = /constructor/i.test(f.HTMLElement) || f.safari,
        j = /CriOS\/[\d]+/.test(navigator.userAgent);

    if ((j || h && i || a) && "undefined" != typeof FileReader) {
      var k = new FileReader();
      k.onloadend = function () {
        var a = k.result;
        a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
      }, k.readAsDataURL(b);
    } else {
      var l = f.URL || f.webkitURL,
          m = l.createObjectURL(b);
      g ? g.location = m : location.href = m, g = null, setTimeout(function () {
        l.revokeObjectURL(m);
      }, 4E4);
    }
  });
  f.saveAs = g.saveAs = g,  true && (module.exports = g);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayFill": () => (/* binding */ arrayFill),
/* harmony export */   "arrayRange": () => (/* binding */ arrayRange),
/* harmony export */   "avg": () => (/* binding */ avg),
/* harmony export */   "cantorsPairFunction": () => (/* binding */ cantorsPairFunction),
/* harmony export */   "changeColorOfBase64PNG": () => (/* binding */ changeColorOfBase64PNG),
/* harmony export */   "cloneObject": () => (/* binding */ cloneObject),
/* harmony export */   "csvToJSON": () => (/* binding */ csvToJSON),
/* harmony export */   "deepCloneObject": () => (/* binding */ deepCloneObject),
/* harmony export */   "deepExtend": () => (/* binding */ deepExtend),
/* harmony export */   "delayedTrigger": () => (/* binding */ delayedTrigger),
/* harmony export */   "escapeRegex": () => (/* binding */ escapeRegex),
/* harmony export */   "exists": () => (/* binding */ exists),
/* harmony export */   "filterDictionaryByKeys": () => (/* binding */ filterDictionaryByKeys),
/* harmony export */   "filterObject": () => (/* binding */ filterObject),
/* harmony export */   "getCurrentDateString": () => (/* binding */ getCurrentDateString),
/* harmony export */   "getDatasetDating": () => (/* binding */ getDatasetDating),
/* harmony export */   "getDeepestValue": () => (/* binding */ getDeepestValue),
/* harmony export */   "getEra": () => (/* binding */ getEra),
/* harmony export */   "getExtendedDictionary": () => (/* binding */ getExtendedDictionary),
/* harmony export */   "getFeaturesAttributeValue": () => (/* binding */ getFeaturesAttributeValue),
/* harmony export */   "getFirstNonEmptyValue": () => (/* binding */ getFirstNonEmptyValue),
/* harmony export */   "getFormatedDate": () => (/* binding */ getFormatedDate),
/* harmony export */   "getFormatedTime": () => (/* binding */ getFormatedTime),
/* harmony export */   "getFormattedYear": () => (/* binding */ getFormattedYear),
/* harmony export */   "getLangMetaValue": () => (/* binding */ getLangMetaValue),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt),
/* harmony export */   "getValueOfAnOnlyItemInDict": () => (/* binding */ getValueOfAnOnlyItemInDict),
/* harmony export */   "gradientToArray": () => (/* binding */ gradientToArray),
/* harmony export */   "hashCode": () => (/* binding */ hashCode),
/* harmony export */   "hslToRgb": () => (/* binding */ hslToRgb),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isHumanTriggeredEvent": () => (/* binding */ isHumanTriggeredEvent),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObj": () => (/* binding */ isObj),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isStringUndefined": () => (/* binding */ isStringUndefined),
/* harmony export */   "isValid": () => (/* binding */ isValid),
/* harmony export */   "isValidNonEmptyString": () => (/* binding */ isValidNonEmptyString),
/* harmony export */   "limit": () => (/* binding */ limit),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "parseInput": () => (/* binding */ parseInput),
/* harmony export */   "parseValues": () => (/* binding */ parseValues),
/* harmony export */   "quotify": () => (/* binding */ quotify),
/* harmony export */   "randomRGBColorGenerator": () => (/* binding */ randomRGBColorGenerator),
/* harmony export */   "rgbaArrayToCssString": () => (/* binding */ rgbaArrayToCssString),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "roundAndMinify": () => (/* binding */ roundAndMinify),
/* harmony export */   "sampleArray": () => (/* binding */ sampleArray),
/* harmony export */   "saveCSV": () => (/* binding */ saveCSV),
/* harmony export */   "saveJSON": () => (/* binding */ saveJSON),
/* harmony export */   "setButtonLoaded": () => (/* binding */ setButtonLoaded),
/* harmony export */   "setButtonLoading": () => (/* binding */ setButtonLoading),
/* harmony export */   "setContentLoaded": () => (/* binding */ setContentLoaded),
/* harmony export */   "setContentLoading": () => (/* binding */ setContentLoading),
/* harmony export */   "shuffleArray": () => (/* binding */ shuffleArray),
/* harmony export */   "traverseObj": () => (/* binding */ traverseObj),
/* harmony export */   "valOrDef": () => (/* binding */ valOrDef),
/* harmony export */   "valOrDefChained": () => (/* binding */ valOrDefChained)
/* harmony export */ });
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4616);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/*
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
*/
// remove these?
//import 'jquery';
//import 'jquery-mousewheel';
//import 'malihu-custom-scrollbar-plugin';


function avg(args) {
  var sum = 0;
  var l = args.length;

  for (var i = 0; i < l; ++i) sum += args[i];

  return sum / l;
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */


function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
      if (t < 1.0 / 2.0) return q;
      if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
      return p;
    };

    var q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1.0 / 3.0);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1.0 / 3.0);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function randomRGBColorGenerator(addAlpha = false, saturationFactor = 0.5, lightnessFactor = 0.4) {
  const goldenRatio = 0.618033988749895; //var hueRandomGenerator = new Math.seedrandom('hue');
  //var saturationRandomGenerator = new Math.seedrandom('saturation');
  //var lightnessRandomGenerator = new Math.seedrandom('lightness');

  var hue = (Math.random() + goldenRatio) % 1;
  var saturation = (Math.random() + goldenRatio / 2) % 1 * 0.45 + saturationFactor;
  var lightness = (Math.random() + goldenRatio * 2) % 1 * 0.4 + lightnessFactor;
  var rgbArray = hslToRgb(hue, saturation, lightness);
  var color = tinycolor({
    r: rgbArray[0],
    b: rgbArray[1],
    g: rgbArray[2]
  });
  if (addAlpha) color.setAlpha(1.0);
  return color;
}

function rgbaArrayToCssString(arr) {
  if (arr.length != 4) throw Error('Insufficient number of elements in RGBA array');
  return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
}

function isEmpty(obj) {
  return isObj(obj) && Object.keys(obj).length === 0 || isArray(obj) && obj.length === 0;
}

function isObj(obj) {
  return obj !== undefined && obj !== null && obj.constructor === Object; //&& Object.getPrototypeOf(obj) === null;
}

function isArray(obj) {
  return obj instanceof Array;
}

function isStringUndefined(value) {
  return value === undefined || value === '' || value === null;
}

function valOrDef(dic, key, def = '') {
  return key in dic && !isStringUndefined(dic[key]) ? dic[key] : def;
}

function valOrDefChained(dic, keyChain, def = '') {
  let key = keyChain.shift();
  let value = valOrDef(dic, key, def);
  if (keyChain.length > 0 && value !== def) return valOrDefChained(value, keyChain, def);else return value;
}

function getExtendedDictionary(oldDict, newDict) {
  var updatedDict = Object.assign({}, oldDict);

  for (var key in updatedDict) if (key in newDict) updatedDict[key] = newDict[key];

  return updatedDict;
}

function cloneObject(obj) {
  if (isValid(obj)) return Object.assign({}, obj);else obj;
}

function deepExtend(target, obj) {
  return $.extend(true, target, obj);
}

function deepCloneObject(obj) {
  if (isValid(obj)) return $.extend(true, {}, obj);else obj;
}
/* Java hashing function ,source: https://stackoverflow.com/a/7616484 */


function hashCode(str) {
  var hash = 0,
      i,
      chr;
  if (str.length === 0) return hash;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

;

function getValueOfAnOnlyItemInDict(dict) {
  let dictKeys = Object.keys(dict);
  if (dictKeys.length > 1) throw 'Error, too many items in dictionary';
  return dict[dictKeys[0]];
}

function getDeepestValue(value) {
  if (!isObj(value)) return value;
  return getDeepestValue(getValueOfAnOnlyItemInDict(value));
}

function quotify(string) {
  return '"' + string + '"';
}

function filterDictionaryByKeys(dict, keysArray, doNotFilter = false) {
  if (doNotFilter) return dict;
  var filteredDict = {};

  for (var i = 0; i < keysArray.length; ++i) if (keysArray[i] in dict) filteredDict[keysArray[i]] = dict[keysArray[i]];

  return filteredDict;
}

function traverseObj(obj, fun) {
  for (var key in obj) if (obj[key] !== null && typeof obj[key] === 'object') //if (obj[key] !== null && isObj(obj[key]))
    traverseObj(obj[key], fun);else fun.apply(this, [obj, key, obj[key]]); // Apply function on every key: value pair

}

function isValid(obj) {
  //return obj !== undefined && obj !== null;
  return obj !== undefined && obj !== null && obj !== false && obj !== NaN;
}

function exists(obj) {
  return isValid(obj) && obj !== false;
}

function isValidNonEmptyString(str) {
  return isValid(str) && str !== '';
}

function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

function isNumber(value) {
  return !isNaN(value) && isValidNonEmptyString(value);
}

function getLangMetaValue(lang, meta, attributeName) {
  let langAttributeName = `lang_${lang}__${attributeName}`;
  if (langAttributeName in meta) return meta[langAttributeName];else if (attributeName in meta) return meta[attributeName];
  return '';
}

function getFirstNonEmptyValue(valueA, valueB) {
  let strValueA = valueA.toString();
  let strValueB = valueB.toString();
  return (strValueA || strValueB) === strValueA ? valueA : valueB;
}

function parseValues(values, dataType) {
  var parsedValues = values;
  if (!isArray(values)) parsedValues = [values];

  for (var i = 0; i < parsedValues.length; ++i) {
    var value = parsedValues[i];
    if (!isValid(value)) value = null;else if (typeof value === 'object') {
      if (dataType == 'integer') traverseObj(value, (obj, key, val) => {
        obj[key] = parseInt(val);
      });else if (dataType == 'double' || dataType == 'number') traverseObj(value, (obj, key, val) => {
        obj[key] = parseFloat(val);
      });else if (dataType == 'string') traverseObj(value, (obj, key, val) => {
        obj[key] = val.trim();
      });else if (dataType == 'boolean') traverseObj(value, (obj, key, val) => {
        obj[key] = val.trim().toLowerCase() === 'true';
      });
    } else {
      if (dataType == 'integer') value = parseInt(value);else if (dataType == 'double' || dataType == 'number') value = parseFloat(value);else if (dataType == 'string') value = value.trim();else if (dataType == 'boolean') value = value.trim().toLowerCase() === 'true';
    }
    parsedValues[i] = value;
  }

  if (!isArray(values)) return parsedValues[0];else return values;
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function delayedTrigger(duration, selector, event, data = {}) {
  return new Promise((resolution, rejection) => {
    if (!$.delayedEvents) $.delayedEvents = {};
    var key = selector + event;

    if (!(key in $.delayedEvents)) {
      $(selector).trigger(event, data);
      $.delayedEvents[key] = setTimeout(function () {
        delete $.delayedEvents[key];
        resolution(true);
      }, duration);
    }
  });
}

function limit(number, lowerBound, upperBound) {
  return Math.min(upperBound, Math.max(lowerBound, number));
}

function round(number, decimals = 0) {
  let factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
}

function roundAndMinify(number, decimals = 0) {
  return round(number, decimals).toString().replace(/^0+/, "");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function arrayFill(i, fill = 0) {
  return [...Array(i)].map(x => fill);
}

function arrayRange(i, start = 0, prefix = null) {
  var k = start;
  if (isValid(prefix)) return [...Array(i)].map(x => prefix + k++);else return [...Array(i)].map(x => k++);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sampleArray(array, ratio = 1.0) {
  if (ratio === 1) return array;else {
    let indices = arrayRange(array.length);
    shuffleArray(indices);
    let newArrayLength = Math.ceil(array.length * ratio);
    indices = indices.slice(0, newArrayLength);
    let newArray = [];

    for (var i = 0; i < indices.length; ++i) newArray.push(array[indices[i]]);

    return newArray;
  }
}

function filterObject(obj, fun) {
  return Object.fromEntries(Object.entries(obj).filter(fun));
}

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const pattern = /([-+])?\s*(\d{1,6})\d*\s*((?:BC|BCE|AD|CE|p\.?n\.?e|n\.?e))?/i;
const eraDic = {
  'negative': {
    'en': 'BC',
    'pl': 'p.n.e'
  },
  'positive': {
    'en': 'AD',
    'pl': 'n.e'
  }
};

function getEra(value) {
  const lang = document.documentElement.lang;
  if (value === 0) return "";else if (value > 0) return eraDic['positive'][lang];else return eraDic['negative'][lang];
}

function parseInput(value) {
  value = value.toString();
  let result = value.match(pattern);
  if (result === null) return "";
  let sign = result[1];
  let year = result[2];
  let era = result[3] !== undefined ? result[3].toUpperCase() : "";
  let intValue = parseInt(year);
  if (typeof intValue !== 'number' || isNaN(intValue)) return "";
  if (sign === "-" || era === "BC" || era === "BCE") return -intValue;else return intValue;
}

function getFormattedYear(value) {
  let properValue = parseInput(value);
  let era = getEra(properValue);
  return `${Math.abs(properValue)} ${era}`;
}

function saveJSON(data, fileName) {
  var blob = new Blob([JSON.stringify(data, null, 1)], {
    type: "text/plain;charset=utf-8"
  });
  (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(blob, fileName);
}

function saveCSV(data, fileName) {
  var file = new File([data.join('\n')], fileName, {
    type: "text/csv;charset=utf-8"
  });
  (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(file);
}

function changeColorOfBase64PNG(dataString, rgbColorArray) {
  return new Promise((resolution, rejection) => {
    let myImg = new Image();
    myImg.src = dataString;

    myImg.onload = function () {
      var $canvas = $('<canvas/>');
      $canvas.attr('width', myImg.width);
      $canvas.attr('height', myImg.height);
      let canvas = $canvas.get()[0];
      var ctx = canvas.getContext("2d");
      ctx.drawImage(myImg, 0, 0);
      var imgd = ctx.getImageData(0, 0, myImg.width, myImg.height);

      for (var i = 0; i < imgd.data.length; i += 4) {
        if (imgd.data[i + 3] > 0) {
          imgd.data[i] = rgbColorArray[0];
          imgd.data[i + 1] = rgbColorArray[1];
          imgd.data[i + 2] = rgbColorArray[2];
        }
      }

      ctx.putImageData(imgd, 0, 0);
      resolution(canvas.toDataURL());
    };
  });
}

function getFormatedDate(date) {
  if (isString(date)) return new Date(date).toLocaleString(window.getLang());else return date.toLocaleString(window.getLang());
}

function getFormatedTime(date) {
  if (isString(date)) return new Date(date).toLocaleTimeString(window.getLang());else return date.toLocaleTimeString(window.getLang());
}

function getCurrentDateString() {
  return new Date().toString();
}

function cantorsPairFunction(point) {
  let w = point[0] + point[1];
  return 0.5 * (w ** 2 + w) + point[1];
}

function isHumanTriggeredEvent(event) {
  return isValid(event.originalEvent) && isValid(event.originalEvent.isTrusted);
}

function gradientToArray(gradientCss) {
  return gradientCss.split('%, ').map(function (el) {
    if (el.includes('rgb')) return el.split(')')[0] + ')';else if (el.includes('#')) return el.split(' ')[0];
  });
}

function setContentLoaded(selector, loadingClassSelector = null) {
  let $wrapper = $(selector);
  let $loadingContent = $wrapper.find('.loading-content');
  $loadingContent.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
    $wrapper.hide();
  });
  if (loadingClassSelector === null) $wrapper.removeClass('loading');else $(loadingClassSelector).removeClass('loading');
}

function setContentLoading(selector, loadingClassSelector = null) {
  return new Promise((resolution, rejection) => {
    let $wrapper = $(selector);

    if (loadingClassSelector === null) {
      $wrapper.addClass('loading');
    } else {
      $(loadingClassSelector).addClass('loading');
    }

    $wrapper.show();
    setTimeout(() => {
      resolution(true);
    }, 100);
  });
}

function setButtonLoaded(buttonSelector) {
  let $button = $(buttonSelector);
  $button.removeClass('loading');
}

async function setButtonLoading(buttonSelector) {
  return new Promise((resolution, rejection) => {
    let $button = $(buttonSelector);
    $button.addClass('loading');
    setTimeout(() => {
      resolution(true);
    }, 100);
  });
}

function getFeaturesAttributeValue(attributeProperty) {
  if (ArcheoUtilities.isObj(attributeProperty)) return ArcheoUtilities.isValid(attributeProperty.value) ? attributeProperty.value : 'MISSING';else return ArcheoUtilities.isValid(attributeProperty) ? attributeProperty : 'MISSING';
}

function log(base, number) {
  return Math.log(number) / Math.log(base);
}

function getDatasetDating(features) {
  var dating = [Infinity, -Infinity];

  if (isValid(features[0].get('properties').dating)) {
    features.forEach(feature => {
      let datingStart = feature.get('properties').dating.year_start;
      let datingEnd = feature.get('properties').dating.year_end;
      dating[0] = Math.min(dating[0], datingStart);
      dating[1] = Math.max(dating[1], datingEnd);
      let featureDatingMean = (datingEnd - datingStart) / 2.0;
      feature.set('datingMean', featureDatingMean, true);
    });
    return dating;
  }

  return undefined;
}

function csvToJSON(csv, delimiter = "\t") {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(delimiter);

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(delimiter);

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});