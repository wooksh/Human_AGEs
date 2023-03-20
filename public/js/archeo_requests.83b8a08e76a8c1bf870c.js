(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ArcheoRequests"] = factory();
	else
		root["ArcheoRequests"] = factory();
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
  "createGraphqlQuery": () => (/* binding */ createGraphqlQuery),
  "getEntityQueryData": () => (/* binding */ getEntityQueryData),
  "incorporateAttributes": () => (/* binding */ incorporateAttributes),
  "promiseIncorporatingAttribute": () => (/* reexport */ promiseIncorporatingAttribute),
  "promiseIncorporatingAttributeType": () => (/* reexport */ promiseIncorporatingAttributeType),
  "queryAPI": () => (/* binding */ queryAPI),
  "queryDownload": () => (/* binding */ queryDownload),
  "queryGraphQL": () => (/* binding */ queryGraphQL),
  "regenerateAttributeCache": () => (/* reexport */ regenerateAttributeCache),
  "requestStatic": () => (/* binding */ requestStatic)
});

;// CONCATENATED MODULE: external {"commonjs":"JSON5","commonjs2":"JSON5","amd":"JSON5","root":"JSON5"}
const external_commonjs_JSON5_commonjs2_JSON5_amd_JSON5_root_JSON5_namespaceObject = undefined;
;// CONCATENATED MODULE: ./views/js-snippets/archeo-requests/utilities.js


function graphqlify(obj, asList = false) {
  if (asList) {
    var list = [];

    for (var key in obj) list.push(`${key}:${obj[key]}`);

    return list.join(',');
  } else {
    return JSON5.stringify(obj, {
      quote: '"'
    });
  }
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

async function promiseIncorporatingAttributeType(attributeId, attributeTypeName, features, objectId, generateStyle = true) {
  return new Promise(async function (resolution, rejection) {
    let featuresDict = {};
    features.forEach(feature => {
      featuresDict[feature.get('properties').id] = feature;
    });
    let featuresIds = Object.keys(featuresDict);
    var filters = {
      'id_in': featuresIds
    };
    var selectionSet = ['id', `${attributeTypeName}(type: $type)`];
    var variablesDeclarations = {
      "$type": "String"
    };
    let query = ArcheoRequests.createGraphqlQuery(objectId, selectionSet, filters, variablesDeclarations);
    let attributeLength = 0;
    ArcheoRequests.queryGraphQL(query, response => {
      let attributeData = response.data[objectId];
      attributeData.forEach(featureInfo => {
        let featureId = featureInfo.id;
        let attributeInfo = featureInfo[attributeTypeName];
        featuresDict[featureId].get('properties')[attributeId] = attributeInfo;
        if (ArcheoUtilities.isValid(attributeInfo)) attributeLength = attributeInfo.value.length;
      });

      if (generateStyle === true) {
        let legend = ArcheoSession.getAttributeLegend(attributeId);
        /* Add special entries for filtering purposes */

        if (!('MISSING' in legend)) legend['MISSING'] = {
          filtered: false,
          name: 'MISSING',
          special: true
        };
        if (!('OTHER' in legend)) legend['OTHER'] = {
          filtered: false,
          name: 'OTHER',
          special: true
        };
        let valuesLabels = [];

        if (attributeLength > 0) {
          /* Determine values labels */
          for (var i = 1; i <= attributeLength; ++i) {
            let valueLabel = `k #${i}`;
            valuesLabels.push(valueLabel);
            if (!(valueLabel in legend)) legend[valueLabel] = {
              name: valueLabel,
              filtered: false,
              color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
              group: null,
              order: i - 1
            };
          }

          valuesLabels.push('MISSING');
          legend._order = valuesLabels;
        }
      }

      resolution(true);
    }, {
      type: attributeId
    });
  });
}

async function regenerateAttributeCache(attributeId, features) {
  return new Promise(async function (resolution, rejection) {
    ArcheoCache.createAttributeEntry(attributeId, 'MISSING');
    features.forEach(feature => {
      if (ArcheoUtilities.isValid(feature.get('properties')[attributeId])) {
        let value = feature.get('properties')[attributeId].value || feature.get('properties')[attributeId];
        ArcheoCache.createAttributeEntry(attributeId, value);
      }
    });
    resolution(true);
  });
}

async function promiseIncorporatingAttribute(attributeId, features, objectId) {
  return new Promise(async function (resolution, rejection) {
    let featuresDict = {};
    features.forEach(feature => {
      featuresDict[feature.get('properties').id] = feature;
    });
    let featuresIds = Object.keys(featuresDict);
    var filters = {
      'id_in': featuresIds
    };
    var selectionSet = ['id', `${attributeId}(lang: $lang)`];
    var variablesDeclarations = {
      "$lang": "String"
    };
    let query = ArcheoRequests.createGraphqlQuery(objectId, selectionSet, filters, variablesDeclarations);
    let legend = ArcheoSession.getAttributeLegend(attributeId);
    ArcheoRequests.queryGraphQL(query, response => {
      if (ArcheoUtilities.isValid(response.data)) {
        let attributeDetails = response.data[objectId];

        if (ArcheoUtilities.isValid(response.errors)) {
          alert(response.errors[0].message + ' Please, contact the administrator.');
          resolution(false);
          return;
        }
        /* Add special entries for filtering purposes */


        if (!('MISSING' in legend)) legend['MISSING'] = {
          filtered: false,
          name: 'MISSING',
          special: true
        };
        if (!('OTHER' in legend)) legend['OTHER'] = {
          filtered: false,
          name: 'OTHER',
          special: true
        };
        ArcheoCache.createAttributeEntry(attributeId, 'MISSING');
        ArcheoCache.createAttributeEntry(attributeId, 'OTHER');
        attributeDetails.forEach(featureInfo => {
          let featureId = featureInfo.id;
          let attributeInfo = featureInfo[attributeId];
          featuresDict[featureId].get('properties')[attributeId] = attributeInfo;

          if (ArcheoUtilities.isValid(attributeInfo)) {
            /* Update legend */
            let value = attributeInfo.value; // Register attribute value in legend

            if (!(value in legend)) legend[value] = {
              name: value,
              filtered: false,
              color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
              group: null
            };
            /* Add attribute to cache registry */

            ArcheoCache.createAttributeEntry(attributeId, value);
          }
        });
      }

      resolution(true);
    }, {
      lang: window.getLang()
    });
  });
}


;// CONCATENATED MODULE: ./views/js-snippets/archeo-requests/archeo-requests.js
//import $ from 'jquery';


async function requestStatic(url, funct, errorFunct) {
  return $.ajax({
    dataType: "json",
    url: url,
    //data: data,
    success: funct,
    error: errorFunct,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

function queryDownload(query, fileType, successCallback, variables = {}, lang = 'en') {
  queryAPI(query, successCallback, variables, 0, 'POST', lang, {}, '/download', {
    fileType: fileType
  });
}

async function queryGraphQL(query, successCallback, variables = {}, interval = 0, method = 'POST', lang = 'en', headers = {}) {
  queryAPI(query, successCallback, variables, interval, method, lang, headers, '/api');
}

async function queryAPI(query, successCallback, variables = {}, interval = 0, method = 'POST', lang = 'en', headers = {}, url = '/query', additionalData = {}) {
  $.ajax({
    type: method,
    //"GET",
    url: url,
    method: method,
    data: JSON.stringify({
      query: query,
      variables: { ...variables
      },
      ...additionalData
    }),
    contentType: additionalData.fileType === 'CSV' ? 'text/csv' : 'application/json',
    dataType: 'json',
    timeout: interval,
    headers: headers,
    async: true,
    success: async function (response) {
      if (response) successCallback(response);else successCallback(response, `Response error: no data were fetched`);
    },
    error: async function (jqXHR, textStatus, errorThrown) {
      let errorString;
      if (jqXHR.status === 0) errorString = `Can\'t establish connection with the database. Please, check your internet connection or contact the administrator if the problem persists.`;else errorString = `Request error, status: ${jqXHR.statusText}, message: ${jqXHR.responseText}`;
      successCallback(false, errorString);
    }
  });
}

function createGraphqlQuery(entityName, selectionSet, filters = {},
/* I am turning off language for now */
variablesDeclarations = {} //{'$lang': 'String'}
) {
  var queryFilters = filters;
  if (!isEmpty(variablesDeclarations)) return `query(${graphqlify(variablesDeclarations, true)}){${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;else return `query{${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;
}

function getEntityQueryData(queriesData, entityName) {
  if ("default" in queriesData) return { ...queriesData['default'],
    ...queriesData[entityName]
  };
  return queriesData[entityName];
}

const attributeTypesStyleDict = {
  'admixture': true,
  'pca': false,
  'umap': false
};

function incorporateAttributes(data) {
  return new Promise((resolution, rejection) => {
    if (ArcheoUtilities.isValidNonEmptyString(data.attributeId)) {
      let datasetsIds;
      if (ArcheoUtilities.isValid(data.datasetId)) datasetsIds = [data.datasetId];else datasetsIds = ArcheoSession.get().datasets._order;
      let promises = [];
      /* Reset the cache if datasets has changed */

      ArcheoCache.clearAttributeCache(data.attributeId);
      let isFetchPending = false;
      datasetsIds.forEach(datasetId => {
        //let features = ArcheoMap.getDataSourceFeatures(datasetId);
        var features = ArcheoMap.getDatasetFeatures(datasetId);
        let dataset = ArcheoSession.get().datasets[datasetId];
        let objectId = dataset.objectId;

        if (features.length > 0) {
          if (ArcheoUtilities.isValid(dataset.isCustom)) {
            promises.push(regenerateAttributeCache(data.attributeId, features));
          } else {
            let anyFeatureProperties = features[0].get('properties');
            let isDatasetFetched = (data.attributeId in anyFeatureProperties);
            if (isFetchPending === false && isDatasetFetched === true) isFetchPending = anyFeatureProperties[data.attributeId] === 'pending';

            if (data.attributeType in attributeTypesStyleDict) {
              if (!isDatasetFetched) {
                promises.push(promiseIncorporatingAttributeType(data.attributeId, data.attributeType, features, objectId, attributeTypesStyleDict[data.attributeType]));
              } else {
                promises.push(regenerateAttributeCache(data.attributeId, features));
              }
            } else {
              /* Resolve promise when firstly called incorporation promise is done */
              if (isFetchPending) {
                /* If attribute is incorporated for a certain layer */
                if (ArcheoUtilities.isValid(data.layerId)) {
                  let $layer = $(`#${data.layerId}.layer`);
                  $layer.one('attribute-fetched', (event, fetchedData) => {
                    ;

                    if (data.datasetId === fetchedData.datasetId) {
                      resolution(false);
                    }
                  });
                } else {
                  promises.push(regenerateAttributeCache(data.attributeId, features));
                }
              } else {
                promises.push(regenerateAttributeCache(data.attributeId, features));
              }

              if (!isDatasetFetched) {
                promises.push(promiseIncorporatingAttribute(data.attributeId, features, objectId)); // Just to prevent creating another promise for this dataset and this attribute id

                features[0].get('properties')[data.attributeId] = 'pending';
              }
            }
          }
        }
      });
      Promise.all(promises).then(successFlags => {
        let areAllSuccessful = promises.length > 0;
        successFlags.forEach(isSuccess => {
          areAllSuccessful = areAllSuccessful && isSuccess;
        });
        if (areAllSuccessful === true) resolution(true);
      });
    } else {
      resolution(false);
    }
  });
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});