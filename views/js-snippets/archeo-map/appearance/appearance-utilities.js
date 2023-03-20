/* Import representations */
import getPointStyle from './point';
import getPiechartStyle from './piechart';
import getTagStyle from './tag';
import { updateClusterDecoration } from '../cluster';
import {getLayer} from '../layer.js';
//import { transformWeightFactor } from '../utilities';

import { getMapRegions } from '../archeo-map';

import {Style} from 'ol/style';
import {getUid} from 'ol/util';
import {LineString, Polygon} from 'ol/geom';
import {Fill, Stroke} from 'ol/style';
import FlowLine from 'ol-ext/style/FlowLine';

import colors from 'Views/mixins-sass/_colors.scss';


/* Jest kilka zdarzeń zmieniających styl: inicjalizacja, pojawienie się nowego klastra lub zmiana wyświetlanego atrybutu */
function getLayerStyle(layer) {
	return (cluster, resolution) => {
		var layerId = layer.get('layerId');
		var clusterDecoration = updateClusterDecoration(layer, cluster);

		/* If session has been fully initialized */
		if( ArcheoUtilities.isValid(clusterDecoration) ) {
			var layerConfig = ArcheoMap.getLayerConfig(layer);
			var styleCache = ArcheoCache.getTemporaryEntry('styleCache')[layerId];

			var clusterUid = getUid(cluster);

			var clusterFeatures = cluster.get('features');

			if(clusterDecoration.dataValuesArray.length === 0)
				return new Style(null);

			var layerType = 'default';
			if( ArcheoUtilities.isValid(clusterDecoration) ) {
				layerType = layerConfig.type;

				var clusterZIndex = clusterDecoration.dataValuesArray.max() || clusterFeatures.length;
				clusterDecoration.zIndex = clusterZIndex;
			}

			if( !(clusterUid in styleCache) ) {
				clusterDecoration.words = null;
				var styles = [
					/* Apply blending mode options before rendering data */
					new Style({
						renderer: function(coords, state) {
							state.context.globalCompositeOperation = layerConfig.style.blendingMode;
							state.context.canvas.style['mix-blend-mode'] = layerConfig.style.blendingMode;
							state.context.globalAlpha = layerConfig.style.drawingAlpha;
						}
					})
				];

				/* Create region name */
				if(!('regionName' in clusterDecoration)) {
					let regionId = cluster.get('regionId');
					let regionsDict = getMapRegions();

					if(ArcheoUtilities.isValid(regionsDict) && ArcheoUtilities.isValid(regionId) && regionId in regionsDict) {
						clusterDecoration.regionName = regionsDict[regionId].name;
					}
				}

				calculateOffsetVector(clusterDecoration, layerConfig, resolution);

				/* Calculate layere color */
				/*if(layerConfig.style.cardinalityByColor) {
					// Kolor nie powinien być zależny od rozmiaru; ???
					let featureColor = layerConfig.style.color;
					let distance = getFeatureWeight(clusterDecoration, layerConfig);
					layerColor = interpolateColor(featureColor, [255, 255, 255, alpha], distance);
				} else {
					layerColor = featureColor;
				}*/

				switch(layerType) {
					case 'point':
						styles = styles.concat( getPointStyle(layerConfig, cluster, resolution) );
						break;
					case 'piechart':
						styles = styles.concat( getPiechartStyle(layerConfig, cluster, resolution) );
						break;
					case 'tag':
						styles = styles.concat( getTagStyle(layerConfig, cluster, resolution) );
						break;
					case 'default':
					default:
						styles = styles.concat( new Style(null) );
				}

				styleCache[ clusterUid ] = styles;
			}

			var styles = styleCache[ clusterUid ];

			cluster.dispatchEvent('styleUpdated');

			return [
				...styles, 
				getClusterOriginLineStyle(layerConfig, cluster)
			];
		}
		else
			return new Style(null);
	};
}


function calculateOffsetVector(featureDecoration, layerConfig, resolution) {
	if( ArcheoUtilities.isValid(layerConfig.style.angle) ) {
		featureDecoration.offsetVector = [
			Math.sin(layerConfig.style.angle * Math.PI / 180),
			Math.cos(layerConfig.style.angle * Math.PI / 180)
		]
		.mul(layerConfig.style.positionOffsetRatio)
		.mul(resolution)
		;

		/*

		if(layerConfig.style.positionOffsetRelativeToggle)
			featureDecoration.offsetVector = featureDecoration.offsetVector.mul(layerConfig.style.positionOffsetRatio);
		else {

			featureDecoration.offsetVector = featureDecoration.offsetVector.add( 
				offsetVector.clone().mul() layerConfig.style.positionOffsetRatio / 10);
		}

		featureDecoration.offsetVector = featureDecoration.offsetVector.mul(resolution);*/
	}
	else
		featureDecoration.offsetVector = [0, 0];
}


function getClusterOriginLineStyle(layerConfig, cluster) {
	let clusterDecoration = cluster.get('decoration');

	var geometryFunc = function() {
		let offsetVector = clusterDecoration.offsetVector || [0,0];

        let clusterCoords = cluster.getGeometry().getCoordinates();

		let lineStart = clusterCoords;
		let lineEnd = cluster.get('originalPosition');

		lineStart = lineStart
			.add(offsetVector);

		return new LineString([
			lineStart,
			lineEnd
		]);
    };

	let alpha = layerConfig.style.drawingAlpha;

	let featureColor;
	let darkenFactor;
	if(layerConfig.style.colorToggle === true) {
		featureColor = tinycolor(clusterDecoration.featureColor);
		darkenFactor = 10;
	}
	else {
		featureColor = tinycolor(colors.palette_primary_color);
		darkenFactor = 0;
	}

	if(layerConfig.style.pointerToggle)
		return new FlowLine({
				geometry: geometryFunc,
				width: clusterDecoration.circleRadius * 0.6,
				width2: 1,
				//color: `rgba(240,240,240, ${clusterDecoration.alpha})`,
				color: featureColor.setAlpha(alpha * featureColor.getAlpha()).toString(),
				color2: featureColor.darken(darkenFactor).setAlpha(alpha * featureColor.getAlpha()).toString(),
				zIndex: -1
			});
	else
		return new Style(null);
}


function getFeatureSize(decoration, layerConfig) {
	let mapScaleFactor = ArcheoMap.getMapScaleFactor();
	
	var minSize = layerConfig.style.size[0] * mapScaleFactor;
	var maxSize = layerConfig.style.size[1] * mapScaleFactor;

	return ArcheoUtilities.limit(
		getFeatureWeight(decoration, layerConfig) * maxSize,
		minSize, maxSize
	);
}


function getFeatureWeight(decoration, layerConfig) {
	var weight;
	/*var weightGrowthFactor = transformWeightFactor( layerConfig.style.weightGrowthFactor );
	var weightScalingFactor = transformWeightFactor( layerConfig.style.weightScalingFactor );*/
	var weightGrowthFactor = layerConfig.style.weightGrowthFactor;
	var weightScalingFactor = layerConfig.style.weightScalingFactor;
	//var isTagType = layerConfig.type === 'tag';

	if( ArcheoUtilities.isValid( decoration ) ) {
		if(layerConfig.style.standardisationMethod === 'none')
			weight = decoration.count;
		else {
			let layer = getLayer(layerConfig.layerId);
			let clusters = layer.getSource().getFeatures();

			if(layerConfig.style.standardisationMethod === 'max') {
				let maxClusterCount = 0;
				clusters.forEach((c) => { maxClusterCount = Math.max(maxClusterCount, c.get('features').length)});
				weight = decoration.count / maxClusterCount;

			} else if(layerConfig.style.standardisationMethod === 'total') {
				let totalFeaturesCount = 0;
				clusters.forEach((c) => { totalFeaturesCount += c.get('features').length});
				weight = decoration.count / totalFeaturesCount;
			}
		}

		if(layerConfig.style.weightGrowth === 'polynomial')
			weight = (weight * weightScalingFactor) ** weightGrowthFactor;
		else if(layerConfig.style.weightGrowth === 'exponential')	
			weight = (weightGrowthFactor**(weight * weightScalingFactor) - 1) / (weightGrowthFactor - 1);
		else if(layerConfig.style.weightGrowth === 'none')
			weight = 1;
		else if(layerConfig.style.weightGrowth === 'linear')
			weight = weight * weightScalingFactor * weightGrowthFactor;
		else if(layerConfig.style.weightGrowth === 'logarithmic')
			weight = ArcheoUtilities.log( Math.max(2, weightGrowthFactor), weightScalingFactor * weight);
	}

	return ArcheoUtilities.limit(weight, .0, 1.);
}


function adjustOffsetVector(layerConfig, featureDecoration, pointSize) {
	if(layerConfig.style.positionOffsetRelativeToggle)
		featureDecoration.offsetVector = featureDecoration.offsetVector.mul(pointSize);
	else {
		//let offsetFactor = (layerConfig.style.size[1] - pointSize) / (layerConfig.style.size[1] - layerConfig.style.size[0]);
		let offsetVector = featureDecoration.offsetVector.clone();
		featureDecoration.offsetVector = featureDecoration.offsetVector
			.mul(layerConfig.style.size[1]/2)
			.add(offsetVector.mul( (pointSize / 2) ));
	}
}


export { 
	getLayerStyle,
	getFeatureSize,
	getFeatureWeight,
	adjustOffsetVector
};