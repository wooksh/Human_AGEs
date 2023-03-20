import initializeInteractionEvents from './interaction.js';


function changeClusterStrategyEvent() {
    $('#map').on('cluster-strategy-change', function(event, data) {
        let regionId = data.config.method.region;
		let regionsLayer = ArcheoMap.getRegionsLayer();
		regionsLayer.getSource().clear();

		/* Trigger filtering to assign feature to the proper region basing on timeline filter */
		ArcheoMap.triggerClusterFilters();

		let entityMapFeature = ArcheoMap.getMapLayerFeatures(window.layerId)[0];
		let isRegionClusteringModeActive = ArcheoUtilities.isValidNonEmptyString(regionId) && ArcheoUtilities.isValid(entityMapFeature);

		if(isRegionClusteringModeActive) {
			let regionsDict = ArcheoMap.getMapRegions();
			//let regionIds = window.entityFeature.regionsIds;

			let regionId = entityMapFeature.getProperties().regionId;
			let regionIds = [regionId];

			regionIds.forEach((regionId) => {
				let regionInfo = regionsDict[ regionId ];

				if( ! ArcheoUtilities.isValid(regionInfo.polygon) )
					ArcheoMap.fetchAndAddRegionPolygon(regionId, regionsLayer);
				else
					regionsLayer.getSource().addFeature(regionInfo.polygon);
			});
		} else {
			regionsLayer.getSource().clear();
		}

		ArcheoMap.triggerClusterFilters();
		ArcheoMap.triggerLayerStyleFunction();

		ArcheoEvents.broadcast(['map-regions-updated'], null, {});		
	});
}


function initializeMapEvents() {    
    initializeInteractionEvents();
    changeClusterStrategyEvent();
}


export default initializeMapEvents;