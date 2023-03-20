/* Change layer appearance events */
function changeLayerTypeEvent() {
	$('#map').on('layer-type-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );
		let layerType = data.value;
		//let oldLayerType = data.value;

		// provide dataset if present

		ArcheoMap.changeLayer(layer, {
			layerId: layer.get('layerId'),
			layerType: layerType
		});

		/* Update objects filtering */
		ArcheoLegend.clearLegend();
	});
}


function changeLayerAttributeEvent() {
	$('#map').on('layer-attribute-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		ArcheoMap.setLayerConfig(layer, {
			attributeId: data.attributeId,
			attributeName: data.attributeName,
			attributeType: data.attributeType
		});

		ArcheoMap.refreshLayer(data.layerId);
	});
}


function changeLayerValueEvent() {
	$('#map').on('layer-value-change', function(event, data) {
		let layerStyle = ArcheoMap.getLayerStyleById(data.layerId);
		let legend = ArcheoSession.getAttributeLegend(data.attributeId);

		layerStyle.componentValues.data = {};
		layerStyle.componentValues.special = {
			"OTHER": false,
			"MISSING": false
		};

		let valuesOrders = [];
		let selectedValuesLabels = [];

		data.values.forEach((value, index) => {
			if(value === 'OTHER' || value === 'MISSING')
				layerStyle.componentValues.special[value] = true;
			else {
				/* Assuming that values are sorted */
				layerStyle.componentValues.data[value] = true;

				let valueOrder = legend[value].order;

				if(ArcheoUtilities.isValid(valueOrder)) {
					valuesOrders.push(valueOrder);
					selectedValuesLabels.push(value);
				}
			}
		});

		let selectedDataAttributesCount = Object.keys( layerStyle.componentValues.data ).length;

		if( data.dataAttributesCount === selectedDataAttributesCount )
			layerStyle.componentValues.data = 'selectAll';

		/* Update objects filtering */
		ArcheoMap.refreshLayer(data.layerId);
	});
}


function addLayerEvent() {
	$('#map').on('layer-add', function(event, data) {
		let layerId = data.layerId;
		let layerTitle = ArcheoSession.get().layers[ layerId ].name;

		/* Create map layer object */
		ArcheoMap.addLayer(layerId, {
			declutter: true,
			title: layerTitle,
			...data.settings
		});

		/* Assign proper zIndexes */
	});
}


function changeLayerDataSetEvent() {
	$('#map').on('layer-dataset-change', function(event, data) {
		let layerId = data.layerId;
		let datasetId = data.datasetId;

		ArcheoMap.setLayerDataSource(layerId, datasetId);
	});
}


function changeLayerSettingEvent() {
	$('#map').on('layer-setting-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		ArcheoSession.get().layers[ data.layerId ].settings[ data.setting ] = data.value;

		if( ArcheoUtilities.isValid(layer) ) {
			layer.set(data.setting, data.value, false);
			ArcheoMap.triggerLayerStyleFunction(layer);
		}
	});
}


function changeLayerConfigEvent() {
	$('#map').on('layer-config-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		if( ArcheoUtilities.isValid(layer) ) {
			ArcheoMap.setLayerStyle(layer, data.value);

			if(ArcheoMap.getLayerConfig(layer).type === 'heatmap' || data.refresh === true)
				ArcheoMap.triggerClusterFilters(layer);	
			else
				ArcheoMap.triggerLayerStyleFunction(layer);

			if(data.refreshRegions === true) {
				ArcheoMap.triggerLayerStyleFunction( ArcheoMap.getRegionsLayer() );
			}
		}
	});
}


function changeLayerColorEvent() {
	$('#map').on('layer-color-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		if( ArcheoUtilities.isValid(layer) ) {
			ArcheoMap.setLayerStyle(layer, {
				color: data.value
			});

			/* Update objects filtering */
			ArcheoMap.triggerLayerStyleFunction(layer);
			ArcheoMap.triggerLayerStyleFunction( ArcheoMap.getRegionsLayer() );
		}	
	});
}


function changeLayerGradientEvent() {
	$('#map').on('layer-gradient-change', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		if( ArcheoUtilities.isValid(layer) && ArcheoUtilities.isValid(data.value) ) {
			ArcheoMap.setLayerStyle(layer, {
				gradient: data.value
			});

			if( ArcheoSession.get().layers[data.layerId].type === 'heatmap')
				layer.setGradient(data.value);

			/* Update objects filtering */
			//ArcheoMap.triggerLayerStyleFunction(layer);
		}	
	});
}


function sortMapLayersOnElementsSort() {
	/* On layers sort - change z-index setting */
	$('#layers-container').on('sortbeforestop layer-map-change', function(event, ui) {
		var newLayersOrder = $(event.target).sortable('toArray');
		let sessionLayersOrder = [];
	
		/* Update layers order on the map */
		newLayersOrder.forEach((layerId, index) => {
			if( ArcheoUtilities.isValidNonEmptyString(layerId) ) {
				let zIndex = ArcheoMap.getLayerZIndex(index, ArcheoSession.get().layers[layerId].type);

				ArcheoEvents.broadcast('layer-setting-change', null, {
					layerId: layerId,
					setting: 'zIndex',
					value: zIndex
				});

				sessionLayersOrder.push(layerId);
			}
		});

		/* Update layers order in session */
		ArcheoSession.get().layers._order = sessionLayersOrder;

		/* Update layers order on the legend */
		ArcheoLegend.sortLayers(sessionLayersOrder);
	})
}


function layerInitializationEvent() {
	$('#map').on('layer-initialization', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

		/* Update objects filtering */
		ArcheoMap.refreshLayer(data.layerId);
		ArcheoMap.triggerClusterFilters(layer);	
	});
}


function initializeLayersEvents() {
	layerInitializationEvent();
	addLayerEvent();
	changeLayerTypeEvent();
	changeLayerAttributeEvent();
	changeLayerValueEvent();
	changeLayerSettingEvent();
	changeLayerConfigEvent();
	changeLayerColorEvent();
	changeLayerGradientEvent();
	changeLayerDataSetEvent();
	sortMapLayersOnElementsSort();
}


export default initializeLayersEvents;