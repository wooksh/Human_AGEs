(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoSearcher"] = factory();
	else
		root["ArcheoSearcher"] = factory();
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
/* harmony export */   "initialize": () => (/* binding */ initialize)
/* harmony export */ });
function initialize(inputEl, entityName, valueAttribute, queryAttribute, detailsAttribute, lang, selectFunction = null, closeFunction = null) {
  /* You search using label attribute, but you receive value attribute */
  inputEl.autocomplete({
    source: function (req, res) {
      var queryTerm = req.term.trim();

      if (ArcheoUtilities.isValidNonEmptyString(queryTerm)) {
        let url = `/search/${entityName}/${queryAttribute}/${lang}/${queryTerm}`;
        $.ajax({
          // a nie value attribute?
          url: url,
          dataType: "json",
          type: "GET",
          success: function (data) {
            data = ArcheoUtilities.getValueOfAnOnlyItemInDict(data);
            res($.map(data, function (item) {
              return {
                value: ArcheoUtilities.getLangMetaValue(lang, item, valueAttribute),
                label: ArcheoUtilities.getLangMetaValue(lang, item, queryAttribute),
                details: ArcheoUtilities.getLangMetaValue(lang, item, detailsAttribute)
              };
            }));
          },
          error: (jqXHR, textStatus, errorThrown) => console.error(`Request error, status: ${textStatus}, msg: ${errorThrown}, jqXHR: ${JSON.stringify(jqXHR)}`)
        });
      }
    },
    minLength: 1,
    select: selectFunction,
    close: closeFunction
  }).autocomplete("instance")._renderItem = function (ul, item) {
    let itemElement = $("<li>").attr("data-value", item.value).append(item.label);
    if (!ArcheoUtilities.isStringUndefined(item.details)) itemElement.append(" (" + item.details + ")");
    return itemElement.appendTo(ul);
  };
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});