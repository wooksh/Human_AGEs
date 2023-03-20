import Cluster from 'ol/source/Cluster';
import {filtersDict} from './filters.js';
import VectorSource from 'ol/source/Vector';
import { getDefaultFeatureConfig } from './feature.js';

import { getMapLegend, getRegionsLayer, getAttributeLegend } from './archeo-map';


import {
	getLayer
} from './layer';

import {
    getDecorationWithAttributeData
} from './entities-attributes';

import { asString } from 'ol/color';
import { getUid } from 'ol/util';

import { 
    getFeatureDatingBasedColorRGBA,
    averageRgba,
	triggerLayerStyleFunction,
	getClusterConvexHull
} from './utilities';

import {
	regionFilter
} from './filters.js'

import colors from 'Views/mixins-sass/_colors.scss';


function setClusterFilters(cluster, layer) {
	var currentYear = new Date().getFullYear();

	cluster.geometryFunction = function(feature) {
		/* Update feature attributes data */
		/* You should setup it only once somewhere else on changing data event */
		let layerId = layer.get('layerId')
		setupFeatureAttributesData(feature, layerId);

		let doFilterRegionsByTime = ArcheoSession.get().filters.timeline.doFilterRegions;

		if(ArcheoSession.get().clustering.features.method.region === 'world') {
			feature.set('regionId', 'world', true);
		}	
		else {
			/* Filter regions ids for each feature */
			let regionsIds = feature.get('regionsIds'); //feature.get('properties').regionsIds; 
			let featureDatingMean = feature.get('datingMean') || currentYear;
			let isDating = ArcheoUtilities.isValid(feature.get('properties').dating);

			let featureDatingStart = isDating ? feature.get('properties').dating.year_start : metadata.TimePeriod.minYear;
            let featureDatingEnd = isDating ? feature.get('properties').dating.year_end : metadata.TimePeriod.maxYear;
			
			let regionsDict = ArcheoMap.getMapRegions();

			if (ArcheoUtilities.isValid(regionsIds)) {
				let regionTypeId = ArcheoSession.get().clustering.features.method.region;
				let mostRelevantRegionId = null; //regionsIds[0];
				let smallestDatingDistance = Infinity;

				for(var i = 0; i < regionsIds.length; ++i) {
					if( regionFilter(regionsIds[i], regionTypeId) === true ) {

						if( regionsDict !== false ) {
							/* Get dating mean if regions has determined dating or current date if it is present region */
							let regionId = regionsIds[i];
							let regionInfo = regionsDict[regionId];

							if(regionId in regionsDict) {
								let regionDatingMean = regionInfo.datingMean || currentYear;
								//let regionDatingStart = regionInfo.dating.year_start || metadata.TimePeriod.minYear;
								let regionDatingStart = ArcheoUtilities.isValid(regionInfo.dating) ? regionInfo.dating.year_start : metadata.TimePeriod.minYear;
								//let regionDatingEnd = regionInfo.dating.year_end || metadata.TimePeriod.maxYear;
								let regionDatingEnd = ArcheoUtilities.isValid(regionInfo.dating) ? regionInfo.dating.year_end : metadata.TimePeriod.maxYear;

								let datingDistance = Math.abs(regionDatingMean - featureDatingMean);

								// Fix: don't let features cluster to regions, that are in different time interval //
								if(doFilterRegionsByTime === false ||
									(featureDatingStart < regionDatingEnd && featureDatingEnd > regionDatingStart)) {
									
									if(datingDistance < smallestDatingDistance) {
										smallestDatingDistance = datingDistance;
										mostRelevantRegionId = regionId;
									}
								}
							}
						}
					}
				}

				feature.set('regionId', mostRelevantRegionId, true);
			}
		}

		let functionResult = 
			   filtersDict.time(feature, layer, cluster)
			&& filtersDict.region(feature, layer, cluster)
			&& filtersDict.value(feature, layer, cluster)
			&& filtersDict.component(feature, layer, cluster);

		return functionResult === true ? feature.getGeometry() : false;
	};
}


function setupFeatureAttributesData(feature, layerId) {
	var layerConfig = ArcheoMap.getLayerConfigById(layerId);
	let featureProperties = feature.get('properties');
	let legend = ArcheoSession.getAttributeLegend( layerConfig.attributeId );

	var decorationAttributesConfig = getDecorationWithAttributeData(
		featureProperties, 
		layerConfig,
		legend
	);

	var featureDecorations = feature.get('decoration')[layerId];
	
	if(ArcheoUtilities.isEmpty(featureDecorations))	
		featureDecorations = getDefaultFeatureConfig();

	/* It assigns new attribute value labels to features decorations */
	featureDecorations = ArcheoUtilities.getExtendedDictionary(featureDecorations, 
		//ArcheoUtilities.deepCloneObject( decorationAttributesConfig )
		decorationAttributesConfig
		);

	feature.get('decoration')[layerId] = featureDecorations;

	return decorationAttributesConfig;
}


function registerValue(value, attributeId, layerType, legend) {	
	/* Append to the legend currently displayed values */
	if( ArcheoUtilities.isValidNonEmptyString(value) ) {
		let valueConfig = getAttributeLegend(attributeId, value);

		if(ArcheoUtilities.isValid(valueConfig)) {
			let dataValueColor = valueConfig.color;

			if(layerType === 'piechart')
				ArcheoLegend.appendRecordToLegend(
					attributeId,
					value,
					dataValueColor
					);

			return dataValueColor;
		}
	}

	return '';
}


/* All it does is assigning colors to the value */
function setupFeatureDecoration(feature, clusterSource) {
	/* If appearance has changed or it is new data */
	/* I should event this */

	let layerId = clusterSource.get('layerId')
	var featureDecorations = setupFeatureAttributesData(feature, layerId);

	return featureDecorations;
}


function setFeaturesClusterStyleConfig(features, clusterSource, cluster, legend) {
	var averagedTimeColor = [];
	var dataPositionDic = {};

	var dataValuesArray = [];
	var dataNamesArray = [];

	var featuresIdsArray = [];
	var dataColorsArray = [];

	var layerId = clusterSource.get('layerId');

	var clusterDecorationConfig = cluster.get('decoration');

	var layerConfig = ArcheoMap.getLayerConfigById(layerId);
	var layerStyle = ArcheoMap.getLayerStyleById(layerId);

	var clusteringConfig = ArcheoSession.get().clustering.features;
	
	clusterDecorationConfig['count'] = 0;

	var featuresCount = features.length;

	/* Calculate decoration */
	features.forEach((feature) => {
		setupFeatureDecoration(feature, clusterSource, layerConfig, legend);
	});

	var attributeId = layerConfig.attributeId;

	/* Setup for admixture */
	if(layerConfig.attributeType === 'admixture') {
		let valuesLabels = layerStyle.componentValues.data;

		if(ArcheoUtilities.isObj(valuesLabels))
			valuesLabels = Object.keys(valuesLabels);
		else
			valuesLabels = legend[attributeId]._order.clone();

		/* Remove filtered out values */
		valuesLabels = valuesLabels.filter((value) => {
			if(value === 'MISSING')
				return true;

			let valueGroup = legend[attributeId][value].group;

			if(ArcheoUtilities.isValid(valueGroup)) {
				let isGroupFilteredInFilters = !(getAttributeLegend(attributeId, valueGroup).filtered);
				return isGroupFilteredInFilters;
			}
			else {
				let isFilteredInFilters = !(getAttributeLegend(attributeId, value).filtered);
				return isFilteredInFilters;
			}
		});

		/* Change visible attribute values according to attribute clustering settings */
		valuesLabels = valuesLabels.map(function(label) {
			var groupName = getAttributeLegend(attributeId, label).group;
			let properLabel;

			if( ArcheoUtilities.isValid(groupName) )
				properLabel = groupName;
			else
				properLabel = label;

			/* Set proper color */
			dataColorsArray.push(
				getAttributeLegend(attributeId, properLabel).color
			);

			/* Set proper name */
			return getAttributeLegend(attributeId, properLabel).name;
		});
		
		dataNamesArray = valuesLabels;
		dataValuesArray = ArcheoUtilities.arrayFill( valuesLabels.length, 0 );
		featuresIdsArray = ArcheoUtilities.arrayRange( valuesLabels.length );
	}

	/* Sort features by value or treeindex */
	var sortedFeatures = features.sort((a, b) => {
		let a_index = a.get('decoration')[layerId].treeIndex;
		let b_index = b.get('decoration')[layerId].treeIndex;

		if( layerConfig.attributeType === 'tree' &&
			ArcheoUtilities.isValid(a_index) && ArcheoUtilities.isValid(b_index) ) {

			return b_index.localeCompare(a_index);
		} else {
			let a_value = a.get('decoration')[layerId].value || '';
			let b_value = b.get('decoration')[layerId].value || '';
			
			return b_value.localeCompare(a_value);
		}
	});

	for(var i = featuresCount - 1; i >= 0; --i) {
		let feature = sortedFeatures[i];
		let featureDecoration = feature.get('decoration')[layerId];

		/* Calculate time color */
		let timeColor = getFeatureDatingBasedColorRGBA( feature );

		if( ArcheoUtilities.isValid(timeColor) ) {
			averagedTimeColor = averagedTimeColor.length == 0 ? timeColor : averageRgba(averagedTimeColor, timeColor);
			clusterDecorationConfig['timeColor'] = averagedTimeColor;
		}
		else {
			let colorStringArray = colors.present_time_color_array_string.split(','); // Got from SASS
			let rgbaColorArray = colorStringArray.map( (x) => parseFloat(x) );

			clusterDecorationConfig['timeColor'] = rgbaColorArray;
		}

		let featureData = featureDecoration.attributeValue;

		/* Populate array for piechart generation */
		if(layerConfig.attributeType === 'admixture') {			
			/* For admixture */			
			dataValuesArray = dataValuesArray.add(featureData);
		} 
		else {
			/* For normal attributes */
			if( featureData in dataPositionDic ) {
				let dataPosition = dataPositionDic[ featureData ];
				dataValuesArray[ dataPosition ] += 1; 
			} else {
				dataNamesArray.push(featureData);
				dataValuesArray.push(1);
				
				let valueColor;

				console.log("ArcheoSession.get().legend.attributes");
				console.log(ArcheoSession.get().legend.attributes);
				console.log("attributeId");
				console.log(attributeId);
				console.log("featureData");
				console.log(featureData);

				valueColor = getAttributeLegend(attributeId, featureData).color;
				
				dataColorsArray.push( valueColor );

				featuresIdsArray.push(i);

				dataPositionDic[ featureData ] = dataValuesArray.length - 1;
			}
		}
	}

	/* Hide repeating groups entries */
	if(layerConfig.attributeType === 'admixture') {
		dataNamesArray.forEach((element, index) => {
			let elementIndex = dataNamesArray.indexOf(element);

			if(elementIndex !== index) {
				dataNamesArray[index] = '';

				dataValuesArray[elementIndex] += dataValuesArray[index];
				dataValuesArray[index] = 0;

				dataColorsArray[index] = '';
			}
		});
	}

	/* Consider existance of Others cluster */

	/* Determine whether certain groups should be considered as 'other' */
	if( layerStyle.otherRatio > 0 || layerStyle.otherCount > 0 ) {
		var totalClusterCount = dataValuesArray.sum();
		var otherCount = 0;

		for(var k = dataValuesArray.length - 1; k >= 0; --k) {
			let featureCount = dataValuesArray[k];
			let featureRatio = featureCount / totalClusterCount;

			if( 
				(featureRatio < layerStyle.otherRatio ||
				featureCount < layerStyle.otherCount) 
			) {
				otherCount += featureCount;

				/* Remove feature data */
				dataValuesArray.splice(k, 1);
				dataNamesArray.splice(k, 1);
				dataColorsArray.splice(k, 1);

				if(layerConfig.attributeType !== 'admixture') {
					let featureDecoration = features[ featuresIdsArray[k] ].get('decoration')[layerId];
					featureDecoration.attributeValue = 'OTHER';
				}

				featuresIdsArray.splice(k, 1);
			}
		}

		let isOtherFilteredInComponents = ArcheoUtilities.isValid(layerStyle.componentValues.special.OTHER) === true;
		let isOtherFilteredInFilters = legend[attributeId].OTHER.filtered === false;

		if(otherCount > 0 && isOtherFilteredInComponents && isOtherFilteredInFilters) {
			dataValuesArray.push(otherCount);
			dataNamesArray.push(legend.OTHER.name);
			dataColorsArray.push(legend.OTHER.color);
		}
	}

	/* Feature has changed */
	if(layerConfig.attributeType !== 'admixture')
		clusterDecorationConfig['count'] = Math.round(dataValuesArray.sum() * 1000) / 1000;
	else
		clusterDecorationConfig['count'] = features.length;

	clusterDecorationConfig['dataValuesArray'] = dataValuesArray;
	clusterDecorationConfig['dataNamesArray'] = dataNamesArray;
	clusterDecorationConfig['dataColorsArray'] = dataColorsArray;
	
	/* Add convex hull */
	if(layerConfig.type !== 'heatmap' && clusteringConfig.showRegions === true && !ArcheoUtilities.isValid(clusteringConfig.method.region)) {
		getClusterConvexHull(cluster, false, getRegionsLayer(), {});
	}
}


function updateAttributeLegendAndAppearance(clusterDecoration, layerConfig, legend) {
	let dataNamesArray = clusterDecoration.dataNamesArray;
	let dataColorsArray = clusterDecoration.dataColorsArray;

	for(var i = 0; i < dataNamesArray.length; ++i) {
		let attributeName = dataNamesArray[i];

		var attributeId = layerConfig.attributeId;
		var layerType = layerConfig.type;

		dataColorsArray[i] = registerValue(attributeName, attributeId, layerType, legend);
	}
}


function updateClusterDecoration(layer, cluster) {
	var legend = getMapLegend().attributes;

	var clusterSource = layer.getSource();

	var layerId = clusterSource.get('layerId');
	var clusterDecoration = cluster.get('decoration');

	var layerConfig = ArcheoMap.getLayerConfig(layer);

	if( ArcheoUtilities.isValid(layerConfig) ) {
		var attributeId = layerConfig.attributeId;

		if( ArcheoUtilities.isValid( legend[attributeId] ) ) {
			let features = cluster.get('features');

			/* If there's no feature, move decorations from inner clustered feature to the cluster */
			if( !ArcheoUtilities.isValid(clusterDecoration) ) {
				let innerFeatureDecoration = features[0].get('decoration');
				
				// It might slow down the site //
				//let clonedDecorations = ArcheoUtilities.cloneObject(innerFeatureDecoration[layerId]);
				let clonedDecorations = innerFeatureDecoration[layerId];
				cluster.set('decoration', clonedDecorations, true);

				clusterDecoration = cluster.get('decoration');

				setFeaturesClusterStyleConfig(features, clusterSource, cluster, legend);

			}

			updateAttributeLegendAndAppearance(clusterDecoration, layerConfig, legend);

			return clusterDecoration;
		}
	}

	return null;
}


function initializeClusterSource(clusterConfig) {
	var cluster = new Cluster({
		source: new VectorSource(),
		overlaps: true
	});

	cluster.set('layerId', clusterConfig.layerId, true);

	return cluster;
}


export {
	initializeClusterSource,
	setClusterFilters,
	updateClusterDecoration,
	setupFeatureAttributesData
}