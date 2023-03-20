import Hover from 'ol-ext/interaction/Hover';
import { getUid } from 'ol/util';

import Point from 'ol/geom/Point';
import { getMapRegions } from '../archeo-map';
import { fetchAndAddRegionPolygon, getClusterConvexHull } from '../utilities';
import {layerFilter, deleteFeatureFromCache, createPiechartsLabels, removePiechartsLabels} from './utilities';
import 'ol-ext/interaction/Hover';


var highlitEvents = [];


function setHighlight(cluster, isHighlit) {
	deleteFeatureFromCache(cluster);
	cluster.get('decoration').isHighlit = isHighlit;
	cluster.changed();
}


function removePiechartsLabelsOnUnhover(cluster, settings) {
    removePiechartsLabels([cluster], settings.labelsLayer, 'hover');
}


function createPiechartsLabelsOnHover(cluster, settings) {
    //let selectedClustersDict = ArcheoCache.getTemporaryEntry('selectedFeatures');
    //let clusterUid = getUid(cluster);

    //if(! (clusterUid in selectedClustersDict))
    createPiechartsLabels([cluster], settings.labelsLayer, 'hover');
}


function setHighlitFlag(hover, settings) {

	if('layer' in settings) {
		hover.on("enter", function(e)  {
			if( highlitEvents.length > 0 ) {
				let lingeringCluster = highlitEvents.pop().feature;
				removePiechartsLabelsOnUnhover(lingeringCluster, settings);
			}

			highlitEvents.push(e);
            let cluster = e.feature;
			//let layerId = cluster.get('layerId');
			//let layerConfig = ArcheoSession.get().layers[layerId];

			setHighlight(cluster, true);

			//if(layerConfig.style.piechartLabelsAppearance === 'hover') {
			createPiechartsLabelsOnHover(cluster, settings);
			//}
		});

		hover.on("leave", function(e) {
            //let selectedClustersDict = ArcheoCache.getTemporaryEntry('selectedFeatures');

			if( highlitEvents.length > 0 ) {
                let cluster = highlitEvents.pop().feature;
				//let layerId = cluster.get('layerId');
				//let layerConfig = ArcheoSession.get().layers[layerId];

				setHighlight(cluster, false);

				//if(layerConfig.style.piechartLabelsAppearance === 'hover') {
                removePiechartsLabelsOnUnhover(cluster, settings);
				//}
			}
		});
	}
}


function clusterConvexHullOnHover(hover, settings) {
	if('layer' in settings) {
		hover.on("enter", async function(e)  {
			let clusteringConfig = ArcheoSession.get().clustering.features;

			let cluster = e.feature;
			let featuresMarksCache = {};

			settings.layer.getSource().clear();

			var features = cluster.get("features");

			let regionId = cluster.get('regionId');
			let regionsDict = getMapRegions();

			/* Display regions */
			if( regionsDict !== false && ArcheoUtilities.isValid(regionId) ) {
				if(ArcheoUtilities.isValid(regionId)) {
					let regionInfo = getMapRegions()[regionId];
	
					if( !ArcheoUtilities.isValid(regionInfo.polygon) ) {
						fetchAndAddRegionPolygon(regionId, settings.layer); //highlitRegionsIds);
					} else {
						settings.layer.getSource().addFeature( regionInfo.polygon );
					}

					for (var i=0, f; f = features[i]; i++) {
						let coordinates = f.getGeometry().getCoordinates();
						let hash = ArcheoUtilities.cantorsPairFunction(coordinates);

						if(!(hash in featuresMarksCache)) {
							settings.layer.getSource().addFeature(features[i]);
							featuresMarksCache[hash] = true;
	
						}
					}
				} 
 
			/* Else display convex hull */
			} else {
				//if(clusteringConfig.showRegions !== true) {
				getClusterConvexHull(cluster, true, settings.layer, featuresMarksCache);
				//}
			}
		});
		
		hover.on("leave", async function(e) {
			settings.layer.getSource().clear();
			/*let strategyConfig = ArcheoSession.get().clustering.features;
			let regionsDict = ArcheoMap.getMapRegions();
			
			let source = settings.layer.getSource();
		
			Array.from(highlitRegionsIds).forEach((regionId) => {
				let polygon = regionsDict[regionId].polygon;

				if(ArcheoUtilities.isValid(polygon) && source.hasFeature(polygon))
					settings.layer.getSource().removeFeature(polygon);

				highlitRegionsIds.delete(regionId);
			});
			*/
		});
	}
}


function initializeHoverEvents(hover, settings) {
    setHighlitFlag(hover, settings);
	clusterConvexHullOnHover(hover, settings);
}


function initializeHoverInteraction(settings) {
	let hover = new Hover({ 
		cursor: "pointer",
		layerFilter: layerFilter
	});

    initializeHoverEvents(hover, settings);

    return hover;
}


export default initializeHoverInteraction;