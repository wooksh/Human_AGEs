/*
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
*/

// remove these?
//import 'jquery';
//import 'jquery-mousewheel';
//import 'malihu-custom-scrollbar-plugin';
import { saveAs } from 'file-saver';


function avg(args) {
    var sum = 0;
    var l = args.length;
    for(var i = 0; i < l; ++i)
        sum += args[i];
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
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1.0/6.0) return p + (q - p) * 6.0 * t;
            if(t < 1.0/2.0) return q;
            if(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
            return p;
        };

        var q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1.0/3.0);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1.0/3.0);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function randomRGBColorGenerator(addAlpha = false, saturationFactor = 0.5, lightnessFactor = 0.4) {
	const goldenRatio = 0.618033988749895;

	//var hueRandomGenerator = new Math.seedrandom('hue');
	//var saturationRandomGenerator = new Math.seedrandom('saturation');
	//var lightnessRandomGenerator = new Math.seedrandom('lightness');

    var hue = (Math.random() + goldenRatio) % 1;
    var saturation = ((Math.random() + goldenRatio/2) % 1) * 0.45 + saturationFactor;
    var lightness = ((Math.random() + goldenRatio*2) % 1) * 0.4 + lightnessFactor;

	var rgbArray = hslToRgb(hue, saturation, lightness);

	var color = tinycolor({r: rgbArray[0], b: rgbArray[1], g: rgbArray[2]});

	if(addAlpha)
		color.setAlpha(1.0);

    return color;
}


function rgbaArrayToCssString(arr) {
	if(arr.length != 4)
	    throw Error('Insufficient number of elements in RGBA array');

    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
}


function isEmpty(obj) {
    return (isObj(obj) && Object.keys(obj).length === 0) || (isArray(obj) && obj.length === 0);
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
    return key in dic && !isStringUndefined( dic[key] ) ? dic[key] : def;
}


function valOrDefChained(dic, keyChain, def = '') {
    let key = keyChain.shift();
    let value = valOrDef(dic, key, def);

    if(keyChain.length > 0 && value !== def)
        return valOrDefChained(value, keyChain, def);
    else
        return value;
}


function getExtendedDictionary(oldDict, newDict) {
    var updatedDict = Object.assign({}, oldDict);
    for(var key in updatedDict)
        if(key in newDict)
            updatedDict[key] = newDict[key];
    
    return updatedDict;
}


function cloneObject(obj) {
	if(isValid(obj))
	    return Object.assign({}, obj);
	else obj;

}


function deepExtend(target, obj) {
	return $.extend(true, target, obj);
}


function deepCloneObject(obj) {
	if(isValid(obj))
		return $.extend(true, {}, obj);
	else obj;
}


/* Java hashing function ,source: https://stackoverflow.com/a/7616484 */
function hashCode(str) {
	var hash = 0, i, chr;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
	  chr   = str.charCodeAt(i);
	  hash  = ((hash << 5) - hash) + chr;
	  hash |= 0; // Convert to 32bit integer
	}
	return hash;
};


function getValueOfAnOnlyItemInDict(dict) {
    let dictKeys = Object.keys(dict);

    if( dictKeys.length > 1 )
        throw 'Error, too many items in dictionary';

    return dict[ dictKeys[0] ];
}


function getDeepestValue(value) {
	if( !isObj(value) )
		return value;
	return getDeepestValue(
			getValueOfAnOnlyItemInDict(value)
			);
}


function quotify(string) {
    return '"' + string +  '"';
}


function filterDictionaryByKeys(dict, keysArray, doNotFilter = false) {
	if(doNotFilter)
		return dict;

	var filteredDict = {};
	for(var i = 0; i < keysArray.length; ++i)
		if( keysArray[i] in dict )
			filteredDict[ keysArray[i] ] = dict[ keysArray[i] ];

	return filteredDict;
}



function traverseObj(obj, fun) {
    for (var key in obj)
        if (obj[key] !== null && typeof(obj[key]) === 'object')
        //if (obj[key] !== null && isObj(obj[key]))
            traverseObj(obj[key], fun);
        else 
			fun.apply(this, [obj, key, obj[key]]); // Apply function on every key: value pair
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

	if(langAttributeName in meta)
		return meta[langAttributeName];
	else if(attributeName in meta)
		return meta[attributeName];

	return '';
}


function getFirstNonEmptyValue(valueA, valueB) {
	let strValueA = valueA.toString();
	let strValueB = valueB.toString();
	return (strValueA || strValueB) === strValueA ? valueA : valueB;
}


function parseValues(values, dataType) {
	var parsedValues = values;
	if( !isArray(values) )
		parsedValues = [values]

	for(var i = 0; i < parsedValues.length; ++i) {
		var value = parsedValues[i];

		if(!isValid(value))
			value = null;
		else if( typeof(value) === 'object' ) {
			if( dataType == 'integer' )
				traverseObj(
					value, 
					(obj, key, val) => { obj[key] = parseInt( val ); }
					);
			else if( dataType == 'double' || dataType == 'number' )
				traverseObj(
					value, 
					(obj, key, val) => { obj[key] = parseFloat( val ); }
					);
			else if( dataType == 'string' )
				traverseObj(
					value, 
					(obj, key, val) => { obj[key] = val.trim(); }
					);
			else if( dataType == 'boolean' )
				traverseObj(
					value, 
					(obj, key, val) => { obj[key] = val.trim().toLowerCase() === 'true'; }
					);
		} else {
			if( dataType == 'integer' )
				value = parseInt( value );
			else if( dataType == 'double' || dataType == 'number' )
				value = parseFloat( value );
			else if( dataType == 'string' )
				value = value.trim();
			else if( dataType == 'boolean' )
				value = value.trim().toLowerCase() === 'true';
		}

		parsedValues[i] = value;
	}

	if( !isArray(values) )
		return parsedValues[0];
	else
		return values;
}


function isFunction(obj) {
	return typeof obj === 'function';
}


function delayedTrigger(duration, selector, event, data = {}) {
	return new Promise((resolution, rejection) => {
		if( !$.delayedEvents )
		$.delayedEvents = {};

		var key = selector + event;

		if( ! (key in $.delayedEvents) ) {
			$( selector ).trigger(event, data);

			$.delayedEvents[key] = setTimeout(function() { 
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
	let factor = 10**decimals;
	return Math.round(number*factor)/factor;
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
	
	if(isValid(prefix))
		return [...Array(i)].map(x => prefix + k++);
	else
		return [...Array(i)].map(x => k++);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function sampleArray(array, ratio = 1.0) {
	if(ratio === 1)
		return array;
	else {
		let indices = arrayRange(array.length);
		shuffleArray(indices);
		let newArrayLength = Math.ceil(array.length * ratio);

		indices = indices.slice(0, newArrayLength);

		let newArray = [];

		for(var i = 0; i < indices.length; ++i)
			newArray.push( array[ indices[i] ] );

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
	
    if(value === 0)
        return "";
    else if(value > 0)
        return eraDic['positive'][lang];
    else
        return eraDic['negative'][lang];
}


function parseInput(value) {
	value = value.toString();

    let result = value.match(pattern);
    if(result === null)
        return "";

    let sign = result[1];
    let year = result[2];
    let era = result[3] !== undefined ? result[3].toUpperCase() : "";
    let intValue = parseInt(year);

    if(typeof(intValue) !== 'number' || isNaN(intValue))
        return "";

    if(sign === "-" || era === "BC" || era === "BCE" )
        return -intValue;
    else
        return intValue;
}


function getFormattedYear(value) {
	let properValue = parseInput( value );
	let era = getEra( properValue );
	return `${Math.abs(properValue)} ${era}`;
}


function saveJSON(data, fileName) {
	var blob = new Blob([JSON.stringify(data, null, 1)], {type: "text/plain;charset=utf-8"});
	saveAs(blob, fileName);
}


function saveCSV(data, fileName) {
	var file = new File([data.join('\n')], fileName, { type: "text/csv;charset=utf-8" });
	saveAs(file);
}


function changeColorOfBase64PNG(dataString, rgbColorArray) {
	return new Promise((resolution, rejection) => {
		let myImg = new Image();
		myImg.src = dataString;
		myImg.onload = function() {
		    var $canvas = $('<canvas/>');
		    $canvas.attr('width', myImg.width);
		    $canvas.attr('height', myImg.height);

		    let canvas = $canvas.get()[0];

		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(myImg,0,0);
		    var imgd = ctx.getImageData(0, 0, myImg.width, myImg.height);

		    for (var i = 0; i < imgd.data.length; i += 4) {
		    	if(imgd.data[i+3] > 0) {
		        	imgd.data[i]   = rgbColorArray[0];
		        	imgd.data[i+1] = rgbColorArray[1];
		        	imgd.data[i+2] = rgbColorArray[2];
		        }
		    }

		    ctx.putImageData(imgd, 0, 0);

		    resolution( canvas.toDataURL() );
	    }
	})
}


function getFormatedDate(date) {
	if( isString(date) )
		return (new Date(date)).toLocaleString( window.getLang() );
	else 
		return date.toLocaleString( window.getLang() );
}


function getFormatedTime(date) {
	if( isString(date) )
		return (new Date(date)).toLocaleTimeString( window.getLang() );
	else 
		return date.toLocaleTimeString( window.getLang() );
}


function getCurrentDateString() {
	return (new Date()).toString();
}


function cantorsPairFunction(point) {
	let w = point[0] + point[1];
	return 0.5 * (w**2 + w) + point[1];
}


function isHumanTriggeredEvent(event) {
	return isValid(event.originalEvent) && isValid(event.originalEvent.isTrusted);
}


function gradientToArray(gradientCss) {
	return gradientCss.split('%, ').map( function(el) {
		if( el.includes('rgb') )
			return el.split(')')[0] + ')';
		else if( el.includes('#') )
			return el.split(' ')[0];
	});
}


function setContentLoaded(selector, loadingClassSelector = null) {
	let $wrapper = $(selector);
	let $loadingContent = $wrapper.find('.loading-content');
	$loadingContent.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
		$wrapper.hide();
	});

	if(loadingClassSelector === null)
		$wrapper.removeClass('loading');
	else
		$(loadingClassSelector).removeClass('loading');
}


function setContentLoading(selector, loadingClassSelector = null) {
	return new Promise((resolution, rejection) => {
		let $wrapper = $(selector);

		if(loadingClassSelector === null) {
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
	if( ArcheoUtilities.isObj(attributeProperty) )
	return ArcheoUtilities.isValid(attributeProperty.value) ? attributeProperty.value : 'MISSING';
	else
		return ArcheoUtilities.isValid(attributeProperty) ? attributeProperty : 'MISSING';
}


function log(base, number) {
	return Math.log(number) / Math.log(base);
}


function getDatasetDating(features) {
    var dating = [Infinity, -Infinity]; 

    if( isValid(features[0].get('properties').dating) ) {
        features.forEach((feature) => {
            let datingStart = feature.get('properties').dating.year_start;
            let datingEnd = feature.get('properties').dating.year_end;

            dating[0] = Math.min( dating[0], datingStart );
            dating[1] = Math.max( dating[1], datingEnd );

            let featureDatingMean = (datingEnd - datingStart) / 2.0;

            feature.set('datingMean', featureDatingMean, true);
        });

        return dating;
    }

    return undefined;
}


function csvToJSON(csv, delimiter="\t") {
	var lines=csv.split("\n");
  
	var result = [];
  
	var headers=lines[0].split(delimiter);
  
	for(var i=1;i<lines.length;i++){

		var obj = {};
		var currentline=lines[i].split(delimiter);
  
		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}
  
		result.push(obj);
	}
  
	return result;
}


export {
    avg, 
    hslToRgb, 
    rgbaArrayToCssString, 
    isEmpty,
    valOrDef,
    valOrDefChained,
    getExtendedDictionary,
	isArray,
	isObj,
    cloneObject,
	deepCloneObject,
    randomRGBColorGenerator,
    hashCode, /* Not used yet */
    isStringUndefined,
	getValueOfAnOnlyItemInDict,
	quotify,
	filterDictionaryByKeys,
	exists,
	traverseObj,
	isValidNonEmptyString,
	isValid,
	isString,
	getLangMetaValue,
	getFirstNonEmptyValue,
	parseValues,
	getDeepestValue,
	isFunction,
	delayedTrigger,
	limit,
	round,
	roundAndMinify,
	getRandomInt,
	arrayFill,
	arrayRange,
	deepExtend,
	filterObject,
	escapeRegex,
	getEra,
	parseInput,
	getFormattedYear,
	isNumber,
	saveJSON,
	saveCSV,
	changeColorOfBase64PNG,
	getFormatedDate,
	getFormatedTime,
	getCurrentDateString,
	cantorsPairFunction,
	isHumanTriggeredEvent,
	gradientToArray,
	setContentLoaded,
	setContentLoading,
	setButtonLoaded,
	setButtonLoading,
	shuffleArray,
	sampleArray,
	getFeaturesAttributeValue,
	log,
	getDatasetDating,
	csvToJSON
};