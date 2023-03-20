// CSS //
import 'ol/ol.css'

import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { createOceanLayer } from './ocean';
import VectorTileLayer from 'ol/layer/VectorTile';
import Feature from 'ol/Feature';

import XYZ from 'ol/source/XYZ';

import {boundingExtent} from 'ol/extent';

import {getHoverStyle} from './appearance/interactions';
import {getRegionsStyles} from './appearance/regions';
import {piechartLabelsStyle} from './appearance/piechartLabels';

import extents from './data/extents.json';
import centers from './data/centers.json';

import {
  getMapSettingElementsList,
  applyTileLayerStyle,
  triggerLayerStyleFunction,
  triggerClusterFilters
} from './utilities';

import {
	getLayer
} from './layer';

/* Import UI controls */
import {extendedControls, defaultControls} from './controls';
import {extendedInteractions, defaultInteractions} from './interactions/index.js';
import {transform} from 'ol/proj';
import {transformExtent} from 'ol/proj';
import tileLayerSources from './data/tile-layer-sources';
import mapLayersIds from './data/map-layers-ids';

import { getOceanStyle } from './ocean';



const GeoJsonParser = new GeoJSON();


function getCoordinatesProjectedToMap(coordinates, selector = '#map') {
	return transform(coordinates, 
		ArcheoSession.get().map.dataProjection, 
		ArcheoSession.get().map.mapProjection 
	);
}


function getCoordinatesProjectedToData(coordinates, selector = '#map') {
	return transform(coordinates, 
		ArcheoSession.get().map.mapProjection,
		ArcheoSession.get().map.dataProjection
	);
}


function getProjectedExtent(name, mapProjection) {
	return transformExtent(extents.data[name], extents.projection, mapProjection);
}

/*function getProjectedCenter(name, mapProjection) {
	return transform(centers.data[name], centers.projection, mapProjection);
}*/


function initializeMap(config = {}, lang = 'en') {
	var dataProjection = ArcheoUtilities.valOrDef(config, 'dataProjection', 'EPSG:4326');
	var mapProjection = ArcheoUtilities.valOrDef(config, 'mapProjection', 'EPSG:3857');

	var controlsNames = ArcheoUtilities.valOrDef(config, 'controlsNames', []); // 'all' or [<>, <>, ...]
	var interactionsNames = ArcheoUtilities.valOrDef(config, 'interactionsNames', []); // 'all' or [<>, <>, ...]
	var mapInitialZoom = ArcheoUtilities.valOrDef(config, 'mapInitialZoom', 4);
	var mapDOMObjectId = ArcheoUtilities.valOrDef(config, 'mapDOMObjectId', "map");
	var layers = ArcheoUtilities.valOrDef(config, 'layers', []);      
	var basemapName = ArcheoUtilities.valOrDef(config, 'basemapName', "Light");
	/* It is as well coded in data projection by default */
	var mapInitialCenter = ArcheoUtilities.valOrDef(config, 'mapInitialCenter',
		centers.data['Poland']
	);
	mapInitialCenter = transform(mapInitialCenter, dataProjection, mapProjection);

	var heatmapImageLayer = new VectorLayer({ 
		className: 'heatmap-image',
		zIndex: -1,
		properties: {
			layerId: 'heatmap-image'
		}
	});

	var regionsVector = new VectorLayer({
		className: 'vector-regions',
		source: new VectorSource(),
		zIndex: 2,
		style: getRegionsStyles(),
		properties: {
			layerId: 'vector-regions'
		}
	});

	var hoverVector = new VectorLayer({
		className: 'vector-hover',
		source: new VectorSource(),
		zIndex: 3,
		style: getHoverStyle(),
		properties: {
			layerId: 'vector-hover'
		}
	});

	var draggableInteractionsVector = new VectorLayer({
		className: 'vectorDraggable',
		source: new VectorSource(),
		zIndex: 9000,
		style: piechartLabelsStyle(),
		properties: {
			layerId: 'vector-draggable'
		}
	});

	var additionalLayers = [
		regionsVector,
		hoverVector,
		draggableInteractionsVector,
		heatmapImageLayer
	];

	var extendedControlsDict = ArcheoUtilities.filterDictionaryByKeys(
		extendedControls(), controlsNames, controlsNames === 'all'
	);

	var extendedInteractionsDict = ArcheoUtilities.filterDictionaryByKeys( 
		extendedInteractions({
			hover: {layer: hoverVector, labelsLayer: draggableInteractionsVector},
			select: {layer: draggableInteractionsVector},
			dragBox: {layer: draggableInteractionsVector},
			showModal: {layer: draggableInteractionsVector}
		}), interactionsNames, interactionsNames === 'all' );

	var mapControls = extendedControlsDict;

	var mapObj = new Map({
		target: document.getElementById(mapDOMObjectId),
		layers: [...layers, ...additionalLayers],
		view: new View({
			projection: mapProjection,
			multiWorld: false,
			center: mapInitialCenter,
			zoom: mapInitialZoom,
			minZoom: 1,
			showFullExtent: true,
			//maxZoom: 11,
			constrainOnlyCenter: true
		}),
		pixelRatio: 1.0,
		controls: getMapSettingElementsList(controlsNames, mapControls, defaultControls),
		interactions: getMapSettingElementsList(interactionsNames, extendedInteractionsDict, defaultInteractions)
	});	

	let selector = '#' + mapDOMObjectId;

	ArcheoCache.setTemporaryEntry('basemapLayers', []);
	ArcheoCache.setTemporaryEntry('map', mapObj);
	ArcheoCache.setTemporaryEntry('sources', {});
	ArcheoCache.setTemporaryEntry('regions', { world: { 
		world: { name: "World", centroid: [0, 0], polygon: new Feature() }	
	}
	});
	ArcheoCache.setTemporaryEntry('baseLayers', {
		'vectorDraggable': draggableInteractionsVector,
		'regionsLayer': regionsVector,
		'hoverVector': hoverVector
	});

	ArcheoCache.setTemporaryEntry('mapControls', mapControls);

	ArcheoCache.setTemporaryEntry('mapInteractions', extendedInteractionsDict);

	ArcheoCache.setTemporaryEntry('mapScaleFactor', 1);

	mapObj.on('moveend', () => {
		triggerLayerStyleFunction();
		
		//ArcheoLegend.clearLegend();
	});

	return mapObj;
}


function setBasemap(basemapName) {
	return new Promise((resolution, rejection) => {
		var mapObj = getMap();

		/* Delete previous basemap layers */
		[...mapObj.getLayers().array_].forEach((layer) => {
			if(layer.getProperties().layerId.startsWith('basemap')) {
				mapObj.removeLayer(layer);
			}
		});
	
		var basemapSource = tileLayerSources[basemapName];
		var basemapLayers = {};
		
		let layersPromises = [];
		basemapSource.forEach((sourceConfig) => {
			let layerName = sourceConfig.name;
	
			let layerConfig = {
				visible: sourceConfig.visible,
				className: layerName,
				source: sourceConfig.source,
				zIndex: 1,
				properties: {
					layerId: layerName,
					isOption: sourceConfig.isOption || false
				},
				...sourceConfig.layerConfig
			};
	
			let basemapLayer = null;
			if(sourceConfig.isVector)
				basemapLayer = new VectorTileLayer(layerConfig);
			else 
				basemapLayer = new TileLayer(layerConfig);
	
			basemapLayers[layerName] = basemapLayer;
	
			if( ArcheoUtilities.isValid(sourceConfig.style) ) {
				let style = sourceConfig.isLang ? sourceConfig.style[lang] : sourceConfig.style;
	
				let promise = applyTileLayerStyle(style, basemapLayer, layerName, mapLayersIds[layerName],
				() => {
					mapObj.addLayer(basemapLayer);
				});

				layersPromises.push(promise);
			}
			else
				mapObj.addLayer(basemapLayer);
		});
	
		ArcheoCache.setTemporaryEntry('basemapLayers', basemapLayers);

		Promise.all(layersPromises).then(() => {
			resolution(true);
		});
	});
}


function setView(options, transformCoordinates = true) {
	if( transformCoordinates && 'center' in options )
		options.center = getCoordinatesProjectedToMap(options.center);

	let currentView = getMap().getView();

	if('center' in options)
		currentView.setCenter(options.center);
	if('zoom' in options)
		currentView.setZoom(options.zoom);
}


function getMap(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('map');
}


function setBackgroundColor(color) {
	$(getMap().getTargetElement()).css('background-color', color);
}


function getMapScaleFactor() {
	return ArcheoCache.getTemporaryEntry('mapScaleFactor') || 1;
}


function setMapScaleFactor(scaleFactor) {
	return ArcheoCache.setTemporaryEntry('mapScaleFactor', scaleFactor);
}


function getMapSources(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('sources');
}


function getMapControls() {
	return ArcheoCache.getTemporaryEntry('mapControls');
}


function getMapInteractions() {
	return ArcheoCache.getTemporaryEntry('mapInteractions');
}


function clearMapSelection() {
	let interactions = getMapInteractions();

	interactions.select.getFeatures().clear();
	ArcheoCache.setTemporaryEntry('selectedFeatures', {});
}


function getMapLayers(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('layers');
}


function removeLayer(layerId) {
	let mapLayers = getMapLayers();
	let layer = mapLayers[layerId];
	let map = getMap();

	layer.getSource().clear();

	//clustering-mode-selectlayer.setSource(null);

	map.removeLayer(
		layer
	);

	delete mapLayers[layerId];

	map.changed();
}


function getMapRegions(regionsType = null, selector = '#map') {
	if( !ArcheoUtilities.isValid(regionsType) )
		regionsType = ArcheoSession.get().clustering.features.method.region;

	if(ArcheoUtilities.isValidNonEmptyString(regionsType)) {
		let regions = ArcheoCache.getTemporaryEntry('regions');

		if( !(regionsType in regions) )
			regions[regionsType] = {};

		return regions[regionsType];
	}

	return false;
}


function setMapRegions(regionId, regionInfo, regionsType = null, selector = '#map') {
	if( !ArcheoUtilities.isValid(regionsType) )
		regionsType = ArcheoSession.get().clustering.features.method.region;

	let regions = ArcheoCache.getTemporaryEntry('regions');

	if( !(regionsType in regions) )
		regions[regionsType] = {};

	regions[regionsType][regionId] = regionInfo;
}


function getMapLegend(selector = '#map') {
	return ArcheoSession.get().legend;
}


function getMapSelectDraggableLayer(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('baseLayers').vectorDraggable;
}


function clearPiechartLabels() {
	getMapSelectDraggableLayer().getSource().clear();
}


function refreshPiechartLabels() {
	let piechartsLabelsLayer = getMapSelectDraggableLayer();
	piechartsLabelsLayer.setStyle( piechartLabelsStyle() );
}


function refreshRegionsLayer() {
	let regionsLayer = getRegionsLayer();
	regionsLayer.setStyle( getRegionsStyles() );
}


function getRegionsLayer(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('baseLayers').regionsLayer;
}


function getHoverVector(selector = '#map') {
	return ArcheoCache.getTemporaryEntry('baseLayers').hoverVector;
}


function getDatasetFeatures(datasetId, mapSelector = '#map') {
	return getMapSources()[datasetId].getFeatures();
}


function getAllFeaturesDictGroupedByObjectId(datasetId = null, mapSelector = '#map') {
	let featuresDict = {};

	let sources = getMapSources();
	let keys;
	
	if(ArcheoUtilities.isValid(datasetId))
		keys = [datasetId];
	else
		keys = Object.keys(sources);

	keys.forEach((key) => {
		let source = sources[key];

		let objectId = ArcheoSession.get().datasets[key].objectId;

		if( !(objectId in featuresDict) )
			featuresDict[ objectId ] = {};

		source.getFeatures().forEach((f) => {
			let featureId = f.get('id');
			if( !(featureId in featuresDict[ objectId ]) )
				featuresDict[ objectId ][ featureId ] = [f];
			else
				featuresDict[ objectId ][ featureId ].push(f);
		});
	});

	return featuresDict;
}


function getExtentFromBoundingBox(coordinates) {
	return boundingExtent(coordinates);
}


/*
function getMapSelectedFeaturesIds(selector = '#map') {
	return $(selector).data('selected-features-ids');
}


function setMapSelectedFeaturesIds(newSet, selector = '#map') {
	return $(selector).data('selected-features-ids', newSet);
}
*/


/*
function addUserRegionsLayer() {
var userRegionsLayer = new VectorLayer({
	source: new VectorSource()
});
}
*/


function refreshLayer(layerId) {
	let layer = getLayer( layerId );
	triggerClusterFilters(layer);
	triggerLayerStyleFunction(layer);
}


function parseFeaturesToGeoJSON(features) {
	return GeoJsonParser.writeFeaturesObject( features );
}


function readFeaturesAsGeoJSON(features) {
	return GeoJsonParser.readFeatures( features );
}


function getAttributeLegend(attributeId, value) {
	let legend = getMapLegend().attributes;
	return legend[value] || legend[attributeId][value];
}


function getMapLayerFeatures(layerId) {
	return getMapLayers()[layerId].getSource().getFeatures();
}


function getBasemapLayer(layerName) {
	return ArcheoCache.getTemporaryEntry('basemapLayers')[layerName];
}


export * from './feature.js';
export * from './layer.js';
export * from './source.js';
export * from './entities-attributes.js';
export * from './cluster.js';
export * from './utilities.js';


export {
	getCoordinatesProjectedToMap,
	getCoordinatesProjectedToData,
	getProjectedExtent,
	initializeMap,
	parseFeaturesToGeoJSON,
	readFeaturesAsGeoJSON,
	getMap,
	getMapSources,
	getMapLayers,
	getMapLegend,
	getMapRegions,
	setMapRegions,
	getMapSelectDraggableLayer,
	getRegionsLayer,
	getDatasetFeatures,
	getAllFeaturesDictGroupedByObjectId,
	removeLayer,
	setView,
	getExtentFromBoundingBox,
	refreshLayer,
	getHoverVector,
	clearPiechartLabels,
	refreshPiechartLabels,
	refreshRegionsLayer,
	getMapControls,
	getMapInteractions,
	getMapScaleFactor,
	setMapScaleFactor,
	setBasemap,
	getAttributeLegend,
	clearMapSelection,
	getMapLayerFeatures,
	getBasemapLayer,
	setBackgroundColor
};