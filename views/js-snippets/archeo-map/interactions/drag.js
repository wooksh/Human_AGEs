import {Translate} from 'ol/interaction';
import { getMapLayers } from '../archeo-map';
import Point from 'ol/geom/Point';
import {draggableLayerFilter} from './utilities';


function updatePiechartsLabelsPosition(translate, settings) {
	translate.on("translating", function(e) {

		e.features.forEach((cluster) => {
			let layerId = cluster.get('layerId');
			let clusterLayer = getMapLayers()[layerId];

			if( ArcheoUtilities.isValid(clusterLayer) ) {
				let layerType = ArcheoMap.getLayerConfigById(layerId).type;

				if(layerType == 'piechart') {
					var labels = cluster.get('labels');
					if( ArcheoUtilities.isValid(labels) ) {
						labels.forEach((label) => {
							//let offset = label.get('decoration').offset;

							var coordinates = cluster.getGeometry().getCoordinates();
							var offset = label.get('decoration').offsetVector;
							var position = label.get('decoration').position;

							coordinates = [
								coordinates[0] - offset[0],// - position[0],
								coordinates[1] - offset[1]// - position[1]

								//coordinates[0] + offset[0],
								//coordinates[1] + offset[1]
							];

							label.setGeometry( new Point(coordinates) );
							label.get('decoration').clusterCoords = coordinates;
						});
					}
				}
			}
		});
	});

	translate.on("translateend", (e) => {
		e.features.forEach((cluster) => {
			if( cluster.get('type') === 'piechartLabel' ) {

				let currentCoords = e.coordinate; //cluster.getGeometry().getCoordinates();
				let clusterCoords = cluster.get('decoration').clusterCoords;
				let position = cluster.get('decoration').position;

				cluster.get('decoration').offsetVector = [
					clusterCoords[0],
					clusterCoords[1]
				];
			}
		});
	});
}


function initializeDragEvents(translate, settings) {
    updatePiechartsLabelsPosition(translate, settings);
}


function initializeDragInteraction(settings) {
	let translate = new Translate({
        cursor: "pointer",
        layers: draggableLayerFilter,
        //features: highlitEvents
    });

    initializeDragEvents(translate, settings);

    return translate;
}


export default initializeDragInteraction;
