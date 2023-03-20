function changeAttributeClusteringEvent() {
    $('#map').on('clustering-attribute-change', function(event, data) {
		ArcheoMap.triggerClusterFilters();
		ArcheoMap.triggerLayerStyleFunction();
	});
}


function changeClusterStrategyEvent() {
	$('#map').on('cluster-strategy-change', function(event, data) {
			let layersDic = ArcheoMap.getMapLayers();

			/* Only for those visible */
			Object.keys(layersDic).forEach((layerId) => {
				let layer = layersDic[layerId];
				let clusterSource = layer.getSource();

				if( ArcheoUtilities.isValid(clusterSource) )
					clusterSource.refresh(); // remove ?

				// Fix for the animated clusters //
				//layer.oldcluster.clear();

				ArcheoMap.refreshLayer(layerId);
			});
		}
	);
}


function changeClusterConfigEvent() {
	$('#map').on('cluster-config-change', function(event, data) {
		let layersDic = ArcheoMap.getMapLayers();

		ArcheoSession.get().clustering.features = {
			...ArcheoSession.get().clustering.features,
			...data.config
		};

		ArcheoMap.clearPiechartLabels();
		Object.keys(layersDic).forEach((layerId) => {
			let layer = layersDic[layerId];

			/* Fix for the animated clusters */
			//layer.oldcluster.clear();

			ArcheoMap.triggerLayerStyleFunction(layer);
			ArcheoMap.triggerLayerStyleFunction( ArcheoMap.getRegionsLayer() );

			if(data.refresh === true)
				ArcheoMap.triggerClusterFilters(layer);
		});
	});
}


function changeClusterSettingEvent() {
	$('#map').on('cluster-setting-change', function(event, data) {
		let layersDic = ArcheoMap.getMapLayers();

		if(ArcheoUtilities.isValid(data.layerId)) {
			layersDic = {
				[data.layerId]: layersDic[data.layerId]
			};
		}

		let settingName = data.setting;
		let value = data.value;

		if(ArcheoUtilities.isValid(value))
			ArcheoSession.get().clustering.features[settingName] = value;
		else
			value = ArcheoSession.get().clustering.features[settingName];

		ArcheoMap.clearPiechartLabels();
		Object.keys(layersDic).forEach((layerId) => {
			let layer = layersDic[layerId];
			let clusterSource = layer.getSource();

			if( ArcheoUtilities.isValid(clusterSource) ) {
				//layer.oldcluster.clear();

				if(settingName == 'range')
					clusterSource.setDistance(value);
				else if(settingName == 'distance')
					clusterSource.setMinDistance(value);
			}

			ArcheoMap.triggerLayerStyleFunction(layer);
		});
	});
}


function changeClusterRegionShowEvent() {
	$('#map').on('cluster-region-show', function(event, data) {
		let regionsLayer = ArcheoMap.getRegionsLayer();
		let isRegionClusteringModeActive = ArcheoUtilities.isValid( ArcheoSession.get().clustering.features.method.region );
		regionsLayer.getSource().clear();

		if(data.config.showRegions) {
			let regionsDict = ArcheoMap.getMapRegions();
			let regionIds = Object.keys(regionsDict);

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

		if(!isRegionClusteringModeActive) {
			/* Reload all layers to generate neccessary convex hulls for clusters */
			ArcheoMap.triggerClusterFilters();
		}
	});
}


function initializeClusteringEvents() {
	changeAttributeClusteringEvent();
	changeClusterConfigEvent();
	changeClusterStrategyEvent();
	changeClusterSettingEvent();
	changeClusterRegionShowEvent();
}


export default initializeClusteringEvents;