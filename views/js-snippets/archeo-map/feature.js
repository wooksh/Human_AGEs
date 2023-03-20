import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { transform } from 'ol/proj';
//import { getFeaturesFromMostInnerSource } from './utilities';

import { getDataSource } from './source';

const defaultConfig = {};


const defaultConfigForLayer = {
	"isHighlit": false,
	"isSelected": false,
	"selected": false,
	"label": "",
	"attributeName": "",
	"attributeValue": "",
	"attributeType": "",
	"attributeId": "",
	"treeIndex": "",
	"regionId": [],
	"version": -1
};


function getDefaultFeatureConfig() {
	return ArcheoUtilities.cloneObject(defaultConfigForLayer);
} 
 
 
function setupDecorationsConfig(decorationsConfig = {}, previousConfig = null) {
    return ArcheoUtilities.getExtendedDictionary(previousConfig || defaultConfigForLayer, decorationsConfig);
}


function resetDecorationConfig( oldConfig ) {
    return ArcheoUtilities.getExtendedDictionary(oldConfig, defaultConfig);
}
  

function resetFeatureDecoration(feature, decorationName = '') {
    if( feature !== null && 'decoration' in feature.getProperties() ) {
      if(decorationName === '') {
        //feature.set('decoration');

        let oldDecorationConfig = feature.get('decoration');
        let resetedConfig = resetDecorationConfig( oldDecorationConfig );
        feature.set('decoration', resetedConfig);
      }
      else {
	  	/* feature.get('decoration')[decorationName] = decorationDefaultConfig[decorationName]; */
		// ERROR, TODO, there is no configuration for separate decorations types

		feature.get('decoration')[decorationName] = defaultConfig;
	  }

      feature.changed();
    }
}


/*
function removeFeatureDecorationConfig(feature) {
    feature.set('decoration', null);
}
*/


/*
function updateFeaturesEntityDecoration(layer) {

    for(var i = 0; i < features.length; ++i) {
      let feature = features[i];
      ArcheoMap.setupFeatureEntityDecoration(feature, layer);
    }
}
*/


function setFeatureDecorationForLayer(feature, layerId, newDecorationConfig = {}) {	
	var currentDecorations = feature.get('decoration'); // cause it's a cluster

	currentDecorations[ layerId ] = setupDecorationsConfig(
		newDecorationConfig, currentDecorations[ layerId ]);

	feature.set('decoration', currentDecorations, true); // must be silent
}


function initializeFeaturesConfigForLayer(layerId, dataSource) {
	var features = dataSource.getFeatures();

	features.forEach((feature) => {
		setFeatureDecorationForLayer(feature, layerId);
	});
}


function createFeatures(data, dataProjection, mapProjection) {
    var features = [];
  
    var dataLength = data === null ? 0 : data.length;
    for(var i = 0; i < dataLength; ++i) {
		let chunk = data[i];

		let placeAttribute = 'site' in chunk ? 'site' : 'place';
		
		if( chunk && ArcheoUtilities.isValid(chunk[placeAttribute]) ) {
			var point = new Point( transform(
				[chunk[placeAttribute].longitude, chunk[placeAttribute].latitude], 
				dataProjection, 
				mapProjection
			));  

			let feature = new Feature({ 
				geometry: point 
			});
	
			feature.setId(chunk.id);
			feature.set("properties", chunk);
			//ArcheoMap.setupFeatureEntityDecoration(feature, layer);

			/* Set default decorations */
			feature.set("decoration", {});
			feature.set("id", chunk.id);

			features.push(feature);
		}
    }
    
    return features;
}


function createUserFeatures(data, mapProjection) {
    var features = [];
  
    var dataLength = data === null ? 0 : data.length;
    for(var i = 0; i < dataLength; ++i) {
		let chunk = {...data[i]};
		
		if( chunk && ArcheoUtilities.isValid(chunk['place_name']) ) {
			var point = new Point( transform(
				[chunk['longitude'], chunk['latitude']], 
				chunk['projection'] || "EPSG:4326", 
				mapProjection
			));  

			let feature = new Feature({ 
				geometry: point 
			});
	
			feature.setId(chunk.sample_id);
			feature.set("properties", chunk);

			/* Set default decorations */
			feature.set("decoration", {});
			feature.set("id", chunk.sample_id);

			/* Fix for proper dating detection */
			if( ArcheoUtilities.isValid(chunk['dating_from']) && ArcheoUtilities.isValid(chunk['dating_to']) )
				feature.get('properties').dating = {
					year_start: chunk['dating_from'],
					year_end: chunk['dating_to']
				};

			/* Fix for proper place display */
			feature.get('properties').place = { name: chunk['place_name'] }

			/* Fix for proper id display */
			feature.get('properties').id = chunk['sample_id'];

			features.push(feature);
		}
    }
    
    return features;
}


function getFeatureRegionId(feature) {
	return feature.get('regionId');
}


export {
	createFeatures,
	createUserFeatures,
	setFeatureDecorationForLayer,
	//updateFeaturesEntityDecoration,
	//removeFeatureDecorationConfig,
	resetFeatureDecoration,
	resetDecorationConfig,
	setupDecorationsConfig,
	getDefaultFeatureConfig,
	initializeFeaturesConfigForLayer,
	getFeatureRegionId
}