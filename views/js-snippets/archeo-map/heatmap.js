import Heatmap from 'ol/layer/Heatmap';

import { updateClusterDecoration } from './cluster';
import { getLayer } from './layer';
import { getFeatureWeight } from './appearance/appearance-utilities';


function getHeatmapDefaultSettings(layerId, mapSelector) {
	var layerConfig = ArcheoMap.getLayerConfigById(layerId);

	return {
		opacity: layerConfig.style.drawingAlpha,
		radius: layerConfig.settings.radius,
		blur: layerConfig.settings.blur,
		weight: function(cluster) {
			var weight = .0;
			var layer = getLayer(layerId, mapSelector);

			/* Apply visibility options */
			layer.renderer_.helper.canvas_.style['mix-blend-mode'] = layerConfig.style.blendingMode;

			/* I should solve it in different way */
			layer.set('opacity', layerConfig.style.drawingAlpha, false);
			
			if( ArcheoUtilities.isValid(layer) ) {
				/* Potentialy heavy computing */
				var decoration = updateClusterDecoration(layer, cluster);
				var alpha = decoration.timeColor[3];

				weight = getFeatureWeight(decoration, layerConfig) * alpha;
			}

			return weight;
		}
	};
}


function createHeatmap(layerId, clusterSource, params, mapSelector) {
	var heatmapLayer = new Heatmap ({
		layerId: layerId,
		source: clusterSource,
		zIndex: params.zIndex,
		name: params.title,
		opacity: params.opacity,
		visible: params.visible,
		...getHeatmapDefaultSettings(layerId, mapSelector),
		className: layerId + " ol-layer"
	}); 

	return heatmapLayer;
}


export { createHeatmap };