import initializeDatasetEvents from './dataset.js';
import initializeInteractionEvents from './interaction.js';
import initializeLayersEvents from './layer.js';
import initializeClusteringEvents from './clustering.js';
import initializeAttributesEvents from './attributes.js';
import initializeFilterEvents from './filters.js';
import initializeToolboxEvents from './toolbox.js';
import initializePhotoModalEvents from './photo-modal.js';


function initializeMapEvents() {
    initializeDatasetEvents();
    initializeInteractionEvents();
    initializeLayersEvents();
    initializeClusteringEvents();
    initializeAttributesEvents();
    initializeFilterEvents();
    initializeToolboxEvents();
    initializePhotoModalEvents();

    $('#map').on('session-load', function(event, data) {
        let mapInfo = ArcheoSession.get().map;

        ArcheoMap.setView({
            projection: mapInfo.mapProjection,
            center: mapInfo.position,
            zoom: mapInfo.zoom
        });
    });

    /* Reload style and clustering */
    $('#map').on('session-load', function(event, data) {
        ArcheoMap.triggerLayerStyleFunction();
        ArcheoMap.triggerClusterFilters();
    });
}


export default initializeMapEvents;