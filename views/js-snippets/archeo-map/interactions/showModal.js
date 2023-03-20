import {Select} from 'ol/interaction';
import {layerFilter} from './utilities';
import {doubleClick} from 'ol/events/condition';
import {setSelectedFlag} from './select';


function initializeSelectEvents(showModalInteraction, selectInteraction, settings) {
  showModalInteraction.on("select", function(e) {
    selectInteraction.dispatchEvent(e);

    setSelectedFlag(settings.layer, e.selected, [], true);

    settings.selectInteraction.features_.array_.push(...e.selected);
    settings.selectInteraction.features_.values_.length = settings.selectInteraction.features_.array_.length;

    let selectedClustersDict = ArcheoCache.getTemporaryEntry('selectedFeatures');
    let selectedClusters = Object.values(selectedClustersDict);

    ArcheoEvents.broadcast('map-modal', null, {
      clusters: selectedClusters,
      interactionEvent: e
    });

    showModalInteraction.getFeatures().clear();
    ArcheoCache.setTemporaryEntry('selectedFeatures', {});
  });
}


function initializeShowModalInteraction(selectInteraction, settings) {
	let showModalInteraction = new Select({
        cursor: "pointer",
        layers: layerFilter,
        style: null,
        condition: function (mapBrowserEvent) {
            return doubleClick(mapBrowserEvent);
        }
    });

    initializeSelectEvents(showModalInteraction, selectInteraction, settings);

    return showModalInteraction;
}


export default initializeShowModalInteraction;