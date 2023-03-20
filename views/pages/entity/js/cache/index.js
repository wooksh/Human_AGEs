function registerCacheFunctions() {
    ArcheoCache.removeLayer = function(layerId) {
        delete ArcheoCache.getTemporaryEntry('styleCache')[layerId];
        delete ArcheoCache.getTemporaryEntry('canvasCache')[layerId];
        delete ArcheoCache.getTemporaryEntry('featuresClusters')[layerId];
        delete ArcheoCache.getTemporaryEntry('layers')[layerId];
    }


	ArcheoCache.removeDataset = function(datasetId) {
        delete ArcheoCache.getTemporaryEntry('sources')[datasetId];
        delete ArcheoCache.getTemporaryEntry('datasets')[datasetId];
    }


	ArcheoCache.addDataset = function(datasetId, features){
		ArcheoCache.getTemporaryEntry('datasets')[datasetId] = features;
	}


	ArcheoCache.getDataset = function(datasetId){
		return ArcheoCache.getTemporaryEntry('datasets')[datasetId];
	}


	ArcheoCache.getDatasetFeatures = function(datasetId) {
		var features = ArcheoCache.getDataset(datasetId);

		if(ArcheoUtilities.isValid(features))
			return ArcheoMap.readFeaturesAsGeoJSON(features);
		else
			return [];
	}


	ArcheoCache.addSession = function(sessionDict) {
		let importedSessions = ArcheoCache.getTemporaryEntry('importedSessions');

        let sessionsNumber = importedSessions._counter + 1 || 1;
		let sessionId = `session-${sessionsNumber}`;
		
		importedSessions[ sessionId ] = sessionDict;

        importedSessions._order.push( sessionId );
        importedSessions._counter += 1;

        return sessionId;
    };


	ArcheoCache.updateSession = function(sessionId) {
		let importedSessions = ArcheoCache.getTemporaryEntry('importedSessions');
		let updatedSession = importedSessions[sessionId];

		let currentSessionState = ArcheoUtilities.deepCloneObject( ArcheoSession.get() );
		delete currentSessionState['_meta'];
	
		updatedSession = ArcheoUtilities.deepExtend(updatedSession, currentSessionState);
		updatedSession._meta.editDate = ArcheoUtilities.getCurrentDateString();

		importedSessions[sessionId] = updatedSession;

		return updatedSession;
	}


	ArcheoCache.getSessionsDict = function() {
		return ArcheoCache.getTemporaryEntry('importedSessions');
	};


	ArcheoCache.getSession = function(sessionId, copy = false) {
		let importedSessions = ArcheoCache.getTemporaryEntry('importedSessions');
		if(copy === true)
			return ArcheoUtilities.deepCloneObject(importedSessions[ sessionId ]);
		else
			return importedSessions[ sessionId ];
	}


	ArcheoCache.removeSession = function(sessionId) {
		delete ArcheoCache.getTemporaryEntry('importedSessions')[sessionId];

		ArcheoCache.getTemporaryEntry('importedSessions')._order.removeEl(sessionId);
	}


	ArcheoCache.createAttributeEntry = function(attributeId, value) {
		let attributeCache = ArcheoCache.getTemporaryEntry('attributes');
	
		if(!(attributeId in attributeCache))
			attributeCache[attributeId] = {};
	
		attributeCache[attributeId][value] = true
	}


	ArcheoCache.clearAttributeCache = function(attributeId) {
		let attributeCache = ArcheoCache.getTemporaryEntry('attributes');

		attributeCache[attributeId] = {};
	}


	ArcheoCache.getAttributeCache = function(attributeId) {
		let attributeCache = ArcheoCache.getTemporaryEntry('attributes');

		if(!(attributeId in attributeCache))
			attributeCache[attributeId] = {};

		return attributeCache[attributeId];
	}
}


function cacheInitialization() {
    ArcheoCache.setTemporaryEntry('datasetsFeaturesToDownload', {});

    ArcheoCache.setTemporaryEntry('styleCache', {
		'vector-regions': {}
	});
	ArcheoCache.setTemporaryEntry('regionsNamesCache', {});
	ArcheoCache.setTemporaryEntry('canvasCache', {});
	ArcheoCache.setTemporaryEntry('attributeClustering', {});
	ArcheoCache.setTemporaryEntry('attributeFiltering', {});

    ArcheoCache.setTemporaryEntry('$symbol', null);
	ArcheoCache.setTemporaryEntry('featuresClusters', {});
	ArcheoCache.setTemporaryEntry('layers', {});
	ArcheoCache.setTemporaryEntry('datasets', {});
	ArcheoCache.setTemporaryEntry('sources', {});
	ArcheoCache.setTemporaryEntry('selectedFeatures', {});
	ArcheoCache.setTemporaryEntry('attributes', {});
	ArcheoCache.setTemporaryEntry('importedSessions', { _order: [], _counter: 0 });

	ArcheoCache.setTemporaryEntry('resultsCache', {});

	ArcheoCache.setTemporaryEntry('map', null);
	ArcheoCache.setTemporaryEntry('baseLayers', {
		'vectorDraggable': null,
		'regionsLayer': null
	});

	/* Keep track of the open features modals count */
	ArcheoCache.setTemporaryEntry('features-modals-count', 0);
}


export {cacheInitialization, registerCacheFunctions};

/*

    if( ! ArcheoUtilities.exists( document.documentElement.lang ) )
		document.documentElement.lang = 'en';

	window.getLang = () => { return document.documentElement.lang };

*/