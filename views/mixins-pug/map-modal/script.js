import getAttributesTable from 'Pages/map/data/attributesTable';
import { createDatasetTableToModal } from './utilities.js';


async function addDataToModal(clusters, newModalElement, tableParams = {}) {
    //let $modalContent = newModalElement.find('.map-modal-content .mCSB_container');
    let $modalContent = newModalElement.find('.map-modal-content');
    
    let baseUrl = `/${window.lang}/entity`;
  
    let datasetsIds = [];
    let datasetFeatures = {};
    let datasetAttributes = {};

    let attributesTable = getAttributesTable();
  
    clusters.forEach((cluster, clusterIndex) => {
  
      let features = cluster.values_.features;
      let layerId = cluster.values_.layerId;
      let datasetId = ArcheoSession.get().layers[ layerId ].datasetId;
      let dataset = ArcheoSession.get().datasets[ datasetId ];
      let objectId = dataset.objectId;
  
      if( ! datasetsIds.has(datasetId) ) {
        datasetsIds.push(datasetId); 

        datasetFeatures[datasetId] = {}; //[];

        datasetAttributes[datasetId] = {};
      }
  
      /* Get all possible columns */
      if(dataset.isCustom) {
        datasetAttributes[datasetId] = ArcheoUtilities.deepCloneObject( dataset.attributesDict );
        datasetAttributes[datasetId]._order = Object.keys(dataset.attributesDict);
      } else
        datasetAttributes[datasetId] = ArcheoUtilities.deepCloneObject( attributesTable[objectId]) ;
  
      /* Set visibility for attributes visualized at the moment on the map */
      let layerAttributeId = ArcheoSession.get().layers[ layerId ].attributeId;
      let layerAttributeType = ArcheoSession.get().layers[ layerId ].attributeType;

      if(layerAttributeId in datasetAttributes[datasetId])
        datasetAttributes[datasetId][layerAttributeId].visible = true;
      
      for(var i = 0; i < features.length; ++i) {
        let feature = features[i];
        datasetFeatures[datasetId][feature.id_] = feature;
      }
    });
  
    let modalCount = ArcheoCache.getTemporaryEntry('features-modals-count');
  
    datasetsIds.forEach((datasetId) => {
      createDatasetTableToModal( $modalContent, modalCount, datasetId, 
        Object.values(datasetFeatures[datasetId]), 
        datasetAttributes[datasetId],
        tableParams
        ).then((newDatasetElement) => {
          if(datasetsIds.length == 1)
            newDatasetElement.find('.accordion-header').trigger('click');
        });
    });
  
    ArcheoCache.incrementTemporaryEntry('features-modals-count', 1);
}
  
  
function showFeaturesModal(clusters, newModalElement, interactionEvent = null, tableParams = {}) {
    addDataToModal(clusters, newModalElement, tableParams);
  
    /*if(ArcheoUtilities.isValid(event)) {
      newModalElement.dialog("option", "position", { my: "left top", at: "left top", of: event });
    }*/
    // content-wrapper
    if( newModalElement.dialog("isOpen") === false ) {
      newModalElement.dialog("open");
      newModalElement.removeClass('hidden');
    }
}


function createMapModal($modalTemplate, clusters, interactionEvent = null, tableParams = {}) {
    /* Create new modal object */
    let newModalElement = $modalTemplate.clone();
    newModalElement.removeAttr('id');

    newModalElement.dialog({
        appendTo: "#map-wrapper",
        position: { my: "center top", at: "center top", of: $("#map") },
        autoOpen: false,
        width: parseInt(window.innerWidth * 0.5),
        height: parseInt(window.innerHeight * 0.7),
        show: { effect: "fade", duration: 500 },
        hide: { effect: "fade", duration: 500 }
    });

    showFeaturesModal(clusters, newModalElement, interactionEvent, tableParams)
}


export { createMapModal };