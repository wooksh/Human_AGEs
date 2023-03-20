(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoCache"] = factory();
	else
		root["ArcheoCache"] = factory();
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "getLocalEntry": () => (/* reexport */ getLocalEntry),
  "getSessionEntry": () => (/* reexport */ getSessionEntry),
  "getTemporaryEntry": () => (/* reexport */ getTemporaryEntry),
  "incrementTemporaryEntry": () => (/* reexport */ incrementTemporaryEntry),
  "loadSession": () => (/* binding */ loadSession),
  "saveSession": () => (/* binding */ saveSession),
  "setLocalEntry": () => (/* reexport */ setLocalEntry),
  "setSessionEntry": () => (/* reexport */ setSessionEntry),
  "setTemporaryEntry": () => (/* reexport */ setTemporaryEntry)
});

;// CONCATENATED MODULE: ./views/js-snippets/archeo-cache/utilities.js
function parseEntryValue(entry, type) {
  if (entry === null) return null;

  switch (type) {
    case 'object':
      return JSON.parse(entry);

    case 'number':
      return parseFloat(entry) || null;

    case 'boolean':
      return entry.toLowerCase() === "true";

    default:
      return entry === "null" ? null : entry;
    // It's string
  }
}

function getSessionEntry(entryName, type = null) {
  let entry = 'archeocache_' + entryName;
  var entryValue = window.sessionStorage.getItem(entry);
  return parseEntryValue(entryValue, type);
}

function setSessionEntry(entryName, value, type = null) {
  let entry = 'archeocache_' + entryName;
  if (!ArcheoUtilities.isValid(value)) return window.sessionStorage.removeItem(entry); // because setting null as a value causes it to be converted to the string, which is boolean-true

  switch (type) {
    case 'object':
      return window.sessionStorage.setItem(entry, JSON.stringify(value));

    default:
      return window.sessionStorage.setItem(entry, value);
  }
}

function getLocalEntry(entryName, type = null) {
  let entry = 'archeocache_' + entryName;
  var entryValue = window.localStorage.getItem(entry);
  return parseEntryValue(entryValue, type);
}

function setLocalEntry(entryName, value, type = null) {
  let entry = 'archeocache_' + entryName;
  if (!ArcheoUtilities.isValid(value)) return window.localStorage.removeItem(entry); // because setting null as a value causes it to be converted to the string, which is boolean-true

  switch (type) {
    case 'object':
      return window.localStorage.setItem(entry, JSON.stringify(value));

    default:
      return window.localStorage.setItem(entry, value);
  }
}

function getTemporaryEntry(entryName) {
  let entry = 'archeocache_' + entryName;
  return ArcheoCache[entry];
}

function setTemporaryEntry(entryName, value) {
  let entry = 'archeocache_' + entryName;
  ArcheoCache[entry] = value;
}

function incrementTemporaryEntry(entryName, incrementationValue) {
  let entry = 'archeocache_' + entryName;
  ArcheoCache[entry] += incrementationValue;
}


;// CONCATENATED MODULE: ./views/js-snippets/archeo-cache/archeo-cache.js

/*
Three levels of cache:

1. Temporal - not saved opon closing tab
2. Session - save until closing browser window
3. Local - save on the disk
*/

function loadSession(sessionDict = null) {
  let cloned = ArcheoUtilities.deepCloneObject(sessionDict);
  let currentSession = ArcheoSession.get();

  if (ArcheoUtilities.isValid(currentSession)) {
    cloned = ArcheoUtilities.deepExtend(currentSession, cloned);
  }

  ArcheoSession.set(cloned);
}

function saveSession() {
  let session = ArcheoSession.get();
  let scope = Object.keys(session);
  scope.forEach(key => {
    setSessionEntry(`session_${key}`, session[key], type = null);
  });
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});