(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoEvents"] = factory();
	else
		root["ArcheoEvents"] = factory();
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
/* harmony export */   "broadcast": () => (/* binding */ broadcast),
/* harmony export */   "getRoutes": () => (/* binding */ getRoutes),
/* harmony export */   "setRoutes": () => (/* binding */ setRoutes)
/* harmony export */ });
function setRoutes(broadcastRoutes) {
  window.broadcastRoutes = broadcastRoutes;
}

function getRoutes() {
  return window.broadcastRoutes;
}
/**
{
	event: <name>,
	$: <selector>
}
**/


function broadcast(events, casterSelector = null, data = {}, duration = null) {
  return new Promise((resolution, rejection) => {
    if (!ArcheoUtilities.isArray(events)) events = [events];
    events.forEach(function (event) {
      let routes = getRoutes();

      if (event in routes) {
        routes[event].forEach(selector => {
          if (!$(selector).is($(casterSelector))) if (ArcheoUtilities.isValid(duration)) ArcheoUtilities.delayedTrigger(duration, selector, event, data).then(result => {
            resolution(true);
          });else $(selector).trigger(event, data);
        });
      }
    });
  });
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});