//import $ from 'jquery';
import {
	graphqlify, 
	isEmpty, 
	promiseIncorporatingAttributeType,
	promiseIncorporatingAttribute,
	regenerateAttributeCache
} from './utilities';


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


function queryDownload(query, fileType, successCallback, variables = {}, lang = 'en'
	) {

	queryAPI(query, successCallback, variables, 
		0, 
		'POST', 
		lang, 
		{},
		'/download',
		{fileType: fileType}
	);

}


async function queryGraphQL(query, successCallback, variables = {}, 
	interval = 0, 
	method = 'POST', 
	lang = 'en', 
	headers = {}
	) {

	queryAPI(query, successCallback, variables, 
		interval, 
		method, 
		lang, 
		headers,
		'/api'
	);
}


async function queryAPI(query, successCallback, variables = {}, 
	interval = 0, 
	method = 'POST', 
	lang = 'en', 
	headers = {},
	url = '/query',
	additionalData = {}
	){

	$.ajax({
		type: method,//"GET",
        url: url,
        method: method,
        data: JSON.stringify({
			query: query,
			variables: {...variables},
			...additionalData
		}),
        contentType: additionalData.fileType === 'CSV' ? 'text/csv' : 'application/json',
        dataType: 'json',
		timeout: interval,
		headers: headers,
		async: true,

        success: async function (response) {
            if (response)
                successCallback(response);
            else
				successCallback(response, `Response error: no data were fetched`);
        },
        error: async function (jqXHR, textStatus, errorThrown) {
			let errorString;
			if(jqXHR.status === 0)
				errorString = `Can\'t establish connection with the database. Please, check your internet connection or contact the administrator if the problem persists.`;
			else
				errorString = `Request error, status: ${jqXHR.statusText}, message: ${jqXHR.responseText}`;

			successCallback(false, errorString);
		}
    });
}


function createGraphqlQuery(
	entityName, 
	selectionSet,
	filters = {},
	/* I am turning off language for now */
	variablesDeclarations = {} //{'$lang': 'String'}
	){

	var queryFilters = filters;
	
	if( !isEmpty(variablesDeclarations) )
		return `query(${graphqlify(variablesDeclarations, true)}){${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;
	else
		return `query{${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;
}


function getEntityQueryData( queriesData, entityName ) {
	if("default" in queriesData)
		return {...queriesData['default'], ...queriesData[entityName]};
	return queriesData[entityName]
}


const attributeTypesStyleDict = {'admixture': true, 'pca': false, 'umap': false};

function incorporateAttributes(data) {
	return new Promise((resolution, rejection) => {
		if( ArcheoUtilities.isValidNonEmptyString(data.attributeId) ) {
			let datasetsIds;

			if( (ArcheoUtilities.isValid(data.datasetId)) )
				datasetsIds = [data.datasetId];	
			else
				datasetsIds = ArcheoSession.get().datasets._order;

			let promises = [];

			/* Reset the cache if datasets has changed */
			ArcheoCache.clearAttributeCache(data.attributeId);
		
			let isFetchPending = false;
			datasetsIds.forEach((datasetId) => {
				//let features = ArcheoMap.getDataSourceFeatures(datasetId);
				var features = ArcheoMap.getDatasetFeatures(datasetId);

				let dataset = ArcheoSession.get().datasets[datasetId];
				let objectId = dataset.objectId;

				if(features.length > 0) {
					if(ArcheoUtilities.isValid(dataset.isCustom)) {
						promises.push(regenerateAttributeCache(data.attributeId, features));
					} else {

						let anyFeatureProperties = features[0].get('properties');
						let isDatasetFetched = data.attributeId in anyFeatureProperties;

						if(isFetchPending === false && isDatasetFetched === true)
							isFetchPending = anyFeatureProperties[data.attributeId] === 'pending';

						if(data.attributeType in attributeTypesStyleDict) {
							if(!isDatasetFetched) {
								promises.push(promiseIncorporatingAttributeType(
									data.attributeId, data.attributeType, features, objectId, attributeTypesStyleDict[data.attributeType]));
							} else {
								promises.push(regenerateAttributeCache(data.attributeId, features));
							}
						}
						else {
							/* Resolve promise when firstly called incorporation promise is done */
							if(isFetchPending) {
								/* If attribute is incorporated for a certain layer */
								if(ArcheoUtilities.isValid(data.layerId)) {
									let $layer = $(`#${data.layerId}.layer`);
									$layer.one('attribute-fetched', (event, fetchedData) => {;
										if(data.datasetId === fetchedData.datasetId) {
											resolution(false);
										}
									})
								} else {
									promises.push(regenerateAttributeCache(data.attributeId, features));
								}
							} else {
								promises.push(regenerateAttributeCache(data.attributeId, features));
							}
							
							if(!isDatasetFetched) {
								promises.push(promiseIncorporatingAttribute(data.attributeId, features, objectId));
								// Just to prevent creating another promise for this dataset and this attribute id
								features[0].get('properties')[data.attributeId] = 'pending';
							}		
						}
					}
				}
			});

			Promise.all(promises).then((successFlags) => {
				let areAllSuccessful = promises.length > 0;

				successFlags.forEach((isSuccess) => {
					areAllSuccessful = areAllSuccessful && isSuccess;
				});

			   if(areAllSuccessful === true)
					resolution(true);
			});
		}
		else {
			resolution(false);
		}
	});
}


export {
    queryAPI,
	queryGraphQL, 
	createGraphqlQuery,
	getEntityQueryData,
	queryDownload,
	requestStatic,
	incorporateAttributes,
	promiseIncorporatingAttributeType,
	promiseIncorporatingAttribute,
	regenerateAttributeCache
};