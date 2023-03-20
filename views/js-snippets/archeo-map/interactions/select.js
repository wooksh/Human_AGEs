import {Select} from 'ol/interaction';
import { getMapLayers } from '../archeo-map';
import {layerFilter, deleteFeatureFromCache, createPiechartsLabels, removePiechartsLabels} from './utilities';
import { getUid } from 'ol/util';
import {doubleClick, click, singleClick} from 'ol/events/condition';


function setSelected(cluster, labelsLayer, isSelected, handleLabels = true) {
	let layerId = cluster.get('layerId');
	let clusterUid = getUid(cluster);
    let selectedClustersDict = ArcheoCache.getTemporaryEntry('selectedFeatures');

	if(ArcheoUtilities.isValid(layerId))
		deleteFeatureFromCache(cluster);

        cluster.get('decoration').isSelected = isSelected;

		if(isSelected === false) {
			delete selectedClustersDict[ clusterUid ];
			if(handleLabels)
				removePiechartsLabels([cluster], labelsLayer, 'select');
		}
		else {
			selectedClustersDict[ clusterUid ] = cluster;
			if(handleLabels)
				createPiechartsLabels([cluster], labelsLayer, 'select');
		}

	cluster.changed();
}

// singleclick
//  constructor(type, selected, deselected, mapBrowserEvent) {
function updateSelectedFeaturesIds(select, settings) {
	select.on("select", function(e) {
		if(e.mapBrowserEvent.type === 'singleclick') {
			/* Update selected clusters appearance */
			setSelectedFlag(settings.layer, e.selected, e.deselected, true);

			/* Reload hovered labels on cluster select */
			removePiechartsLabels(e.selected, settings.layer, 'hover');
			createPiechartsLabels(e.selected, settings.layer, 'hover');
		}

	});
}


function setSelectedFlag(labelsLayer, selected = [], deselected = [], handleLabels = true) {

	selected.forEach((cluster) => {
        //let clusterUid = getUid(cluster);

		setSelected(cluster, labelsLayer, true, handleLabels);

        /*if( ! (clusterUid in selectedClustersDict) ) {
            setSelected(cluster, labelsLayer, true, handleLabels);
			createPiechartsLabels(selected, layer, 'select'); 
        }*/
	});

	deselected.forEach((cluster) => {
		setSelected(cluster, labelsLayer, false, handleLabels);
	});
}


function initializeSelectEvents(select, settings) {
    updateSelectedFeaturesIds(select, settings);
}


function initializeSelectInteraction(settings) {
	let select = new Select({
        cursor: "pointer",
        layers: layerFilter,
        style: null,
		condition: function (mapBrowserEvent) {
			return singleClick(mapBrowserEvent);
			
        }
    });

    initializeSelectEvents(select, settings);

    return select;
}


export default initializeSelectInteraction;
export { setSelectedFlag, setSelected };