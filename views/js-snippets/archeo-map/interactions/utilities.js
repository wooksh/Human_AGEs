import { getUid } from 'ol/util';
import { getMapLayers } from '../archeo-map';
import { getPiechartLabelsFeatures } from '../appearance/piechartLabels';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


function deleteFeatureFromCache(cluster) {
	let layerId = cluster.get('layerId'); 

	let styleCache = ArcheoCache.getTemporaryEntry('styleCache');
	if(layerId in styleCache)
		delete styleCache[layerId][ getUid(cluster) ];

	let canvasCache = ArcheoCache.getTemporaryEntry('canvasCache');
	if(layerId in canvasCache)
		delete canvasCache[layerId][ getUid(cluster) ];
}


function layerFilter(layer) {
	var config = ArcheoMap.getLayerConfig(layer);
	return ArcheoUtilities.isValid( 
		config
	) 
	&& (
		config.type === 'point'
		|| config.type === 'piechart'
		|| config.type === 'tag'
	);
}


function draggableLayerFilter(layer) {
	return layerFilter(layer) || layer.className_ === 'vectorDraggable'
}


function createPiechartsLabels(selected, labelsLayer, labelAppearanceMode = null) {
	selected.forEach((cluster) => {
		let layerId = cluster.get('layerId');
		let layerConfig = ArcheoSession.get().layers[layerId];

		if(layerConfig.style.piechartLabelsAppearance === labelAppearanceMode || labelAppearanceMode === null) {
			cluster.once('styleUpdated', () => {
				let layerId = cluster.get('layerId');
				let clusterLayer = getMapLayers()[layerId];
		
				if( ArcheoUtilities.isValid(clusterLayer) ) {
					let layerType = ArcheoMap.getLayerConfigById(layerId).type;
		
					if(layerType === 'piechart') {
						let labelsFeatures = getPiechartLabelsFeatures(cluster);

						if( ArcheoUtilities.isValid( cluster.get('labels') ) ) {
							// Fix for not dissapearing labels //
							removePiechartsLabels([cluster], labelsLayer, labelAppearanceMode);
						}

						cluster.set('labels', []);
						let clusterLabels = cluster.get('labels');

						labelsFeatures.forEach((label) => {
							if(! labelsLayer.getSource().hasFeature(label)) {
								labelsLayer.getSource().addFeature( label );
								clusterLabels.push( label );
							}
						});
						
					}
				}
			});
		}
	})
}


function removePiechartsLabels(deselected, labelsLayer, labelAppearanceMode = null) { 
	deselected.forEach((cluster) => {
		let layerId = cluster.get('layerId');
		
		if(layerId in ArcheoSession.get().layers && layerId in getMapLayers()) {
			let clusterLayer = getMapLayers()[layerId];
			let layerConfig = ArcheoSession.get().layers[layerId];

			if(layerConfig.style.piechartLabelsAppearance === labelAppearanceMode || labelAppearanceMode === null) {
				if( ArcheoUtilities.isValid(clusterLayer) ) {
					let layerType = ArcheoMap.getLayerConfigById(layerId).type;

					if(layerType == 'piechart') {
						if( ArcheoUtilities.isValid( cluster.get('labels') ) ) {
							let clusterLabels = cluster.get('labels');

							clusterLabels.forEach((label) => {
								if(labelsLayer.getSource().hasFeature(label))
									labelsLayer.getSource().removeFeature(label);
							});

							cluster.unset('labels');
						}
					}
				}
			}
		}
	})
}





export {
    layerFilter, 
    draggableLayerFilter, 
    deleteFeatureFromCache, 
    createPiechartsLabels, 
    removePiechartsLabels
};