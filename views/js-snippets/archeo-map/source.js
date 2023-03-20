import {bbox} from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';

import { getMapSources } from './archeo-map.js';


// set features for most inner source
function setDataSourceFeatures(datasetId, features, mapSelector = '#map') {
	var source = getDataSource(datasetId, mapSelector);
	
	source.clear();
	source.addFeatures(features);
	source.changed();
}


function getDataSourceFeatures(datasetId, mapSelector = '#map') {
	var source = getDataSource(datasetId, mapSelector);
	
	return source.getFeatures();
}


function getDataSource(datasetId, mapSelector = '#map') {
	return getMapSources(mapSelector)[datasetId];
}


function addSource(datasetId, mapSelector = '#map') {
	var vectorSource = new VectorSource({
		strategy: bbox,
		overlaps: false
	});

	vectorSource.set('datasetId', datasetId, true);

	/* Add new source to the cache */
	getMapSources(mapSelector)[datasetId] = vectorSource;	

	return vectorSource;
}


export {
	setDataSourceFeatures,
	getDataSource,
	addSource,
	getDataSourceFeatures
}
