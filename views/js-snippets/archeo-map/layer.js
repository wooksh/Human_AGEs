import { getDataSource } from './source.js';
import { initializeFeaturesConfigForLayer } from './feature';
import { setClusterFilters } from './cluster';
import { getMap, getMapLayers } from './archeo-map';
import { createHeatmap } from './heatmap';

import { initializeClusterSource } from './cluster.js';

import { 
	triggerLayerStyleFunction,
	triggerClusterFilters
 } from './utilities';

import AnimatedCluster from 'ol-ext/layer/AnimatedCluster'; 


function getClusterSourceByLayerId(layerId, mapSelector = '#map') {
	return getMapLayers()[layerId].getSource();
}


function getLayerConfig(layer) {
	let layerId = layer.get('layerId');
	if( ArcheoUtilities.isValid(layerId) )
		return getLayerConfigById(layerId);
	else
		return undefined;
}


function getLayerStyle(layer) {
	let layerId = layer.get('layerId');
	if( ArcheoUtilities.isValid(layerId) )
		return getLayerStyleById(layerId);
	else
		return undefined;
}


function getLayerConfigById(layerId) {
	return ArcheoSession.get().layers[ layerId ];
}


function getLayerStyleById(layerId) {
	return getLayerConfigById(layerId).style;
}

  
function setupStyleConfig(styleConfig = {}, previousConfig = null) {
	return ArcheoUtilities.getExtendedDictionary(previousConfig, styleConfig);
}
 
 
function setLayerStyle(layer, newConfig, mapSelector = '#map') {
	let previousConfig = getLayerStyle(layer);
	let newConfigSetup = setupStyleConfig(newConfig, previousConfig);

	ArcheoSession.get().layers[ layer.get('layerId') ].style = newConfigSetup;

	//triggerLayerStyleFunction(layer);
}


function setLayerConfig(layer, newConfig, mapSelector = '#map') {
	let previousConfig = getLayerConfig(layer);
	let newConfigSetup = setupStyleConfig(newConfig, previousConfig);

	ArcheoSession.get().layers[ layer.get('layerId') ] = newConfigSetup;

	//triggerLayerStyleFunction(layer);
}


// change Layer function
function changeLayer(layer, params, mapSelector = '#map') {
	return new Promise((resolution, rejection) => {
		/* Get layer id and layer source */
		var layerId = params.layerId;
		var clusterSource = params.clusterSource;
		
		var currentLayerType = params.layerType;

		var layerConfig = getLayerConfigById(layerId);
		var layerStyle = layerConfig.style;

		var doesLayerExist = ArcheoUtilities.isValid(layer);
		var layerSettings;

		if( doesLayerExist ) {
			layerId = layer.get('layerId');
			clusterSource = layer.getSource();
			currentLayerType = layerConfig.type;

			getMap(mapSelector).removeLayer( layer );

			layerSettings = ArcheoSession.get().layers[layerId].settings;

			params.zIndex = layerSettings.zIndex;
			params.title = layerSettings.title;

			params.opacity = layerSettings.opacity;
			params.visible = layerSettings.visible;
		}

		var previousLayerType = clusterSource.get('previousLayerType');
		var setupStyle = setupStyleConfig(params, layerStyle);	

		//if( !doesLayerExist || (previousLayerType !== currentLayerType) ) {
		if( !doesLayerExist || (currentLayerType !== previousLayerType) ) {
			if(currentLayerType === 'heatmap') {
				clusterSource.set('previousLayerType', currentLayerType, true);
				layer = createHeatmap(layerId, clusterSource, params, mapSelector);
			}
			else {
				clusterSource.set('previousLayerType', currentLayerType, true);
				layer = new AnimatedCluster ({
					layerId: layerId,
					source: clusterSource,
					zIndex: params.zIndex,
					name: params.title,
					className: layerId + " ol-layer",
					opacity: params.opacity,
					visible: params.visible
					//declutter: params.declutter || true
				});
			}

			let dataSource = clusterSource.getSource();

			if( ArcheoUtilities.isValid(dataSource) )
				initializeFeaturesConfigForLayer(layerId, dataSource);
		}

		//if( !doesLayerExist ) {
		//}

		setLayerStyle(layer, setupStyle);

		/* Set layers clustering strategy */
		switch(currentLayerType) {
			default:
				setClusterFilters(clusterSource, layer);
		}

		/* Add new layer to the cache */
		getMapLayers()[layerId] = layer;
		getMap(mapSelector).addLayer( layer );

		triggerClusterFilters(layer);
		triggerLayerStyleFunction(layer);

		ArcheoEvents.broadcast('layer-map-change', null, {layerId: layerId});

		resolution(layer);
	});
}


function getLayer(layerId, mapSelector = '#map') {
	return getMapLayers()[layerId];
}


function clearCache(layer) {
	let layerId = layer.get('layerId');
	ArcheoCache.getTemporaryEntry('styleCache')[ layerId ] = {};

	let canvasCache = ArcheoCache.getTemporaryEntry('canvasCache')[ layerId ] || {};
	/* First remove all canvas elements */
	Object.keys(canvasCache).forEach((uid) => {
		canvasCache[uid].cloudCanvas.remove();
		canvasCache[uid].outlineCanvas.remove();
		canvasCache[uid].textCanvas.remove();
	})
	ArcheoCache.getTemporaryEntry('canvasCache')[ layerId ] = {};
}


function addLayer(layerId, params, mapSelector = '#map') {
	return new Promise((resolution, rejection) => {
		var clusterSource = initializeClusterSource({...params, layerId: layerId});
		
		changeLayer(null, {
			...params,
			layerId: layerId,
			clusterSource: clusterSource,
		}, mapSelector).then((layer) => {
			resolution(layer);
		});
	})

}


function setLayerDataSource(layerId, datasetId, mapSelector = '#map') {
	let layer = getMapLayers(mapSelector)[layerId];
	let layerClusterSource = layer.getSource();
	let dataSource = getDataSource(datasetId, mapSelector);	

	if( ArcheoUtilities.isValid(dataSource) ) {
		initializeFeaturesConfigForLayer(layerId, dataSource);
		layerClusterSource.setSource(dataSource);
	} else {
		layerClusterSource.clear();
	}
}


export {
	setupStyleConfig,
	setLayerStyle,
	getLayer,
	addLayer,
	getLayerStyle,
	getLayerStyleById,
	changeLayer,
	clearCache,
	getClusterSourceByLayerId,
	setLayerDataSource,
	getLayerConfigById,
	getLayerConfig,
	setLayerConfig
};