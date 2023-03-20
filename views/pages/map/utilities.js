import { initializeLayer } from 'Pages/map/js/events/ui/right-sidebar/layers/new-layer/initialize-layer.js'

import { 
    broadcastDatasetCreation,
    fetchNewDataset 
} from 'Pages/map/js/events/ui/left-sidebar/datasets/new-dataset/initialize-dataset.js'

import { broadcastLayerCreation } from 'Pages/map/js/events/ui/right-sidebar/layers/new-layer/initialize-layer.js'

import attributes from 'Pages/map/data/attributes.json';

import {
    loadAllData
} from './js/events/map/utilities';


function registerMapUtilities() {
	window.MapUtilities = {};

    /* Imported functions */
    MapUtilities.initializeLayer = initializeLayer;
    MapUtilities.broadcastDatasetCreation = broadcastDatasetCreation;
    MapUtilities.broadcastLayerCreation = broadcastLayerCreation;
    MapUtilities.fetchNewDataset = fetchNewDataset;
    MapUtilities.loadAllData = loadAllData;


    MapUtilities.removeLayers = function(layersIds) {
        if( !(ArcheoUtilities.isArray(layersIds)) )
            layersIds = [layersIds];
    
        layersIds.forEach((layerId) => {
            /* Remove layer from map */
            ArcheoMap.removeLayer(layerId);
    
            /* Remove layer from cache */
            ArcheoCache.removeLayer(layerId);

            /* Remove layer from legend */
            ArcheoLegend.removeLayer(layerId);
    
            /* Remove layer from interface */
            $(`#${layerId}`).remove();

            /* Remove layer from session */
            ArcheoSession.removeLayers(layerId)
        });
    }
    
    
    MapUtilities.removeDatasets = function(datasetIds) {
        if( !(ArcheoUtilities.isArray(datasetIds)) )
            datasetIds = [datasetIds];

        datasetIds.forEach((datasetId) => {
            /* Remove dataset from interface */
            $(`#${datasetId}`).remove();

            /* Remove dataset from session */
            ArcheoSession.removeDatasets(datasetId);
            //ArcheoEvents.broadcast("dataset-update", '#dataset-template', {datasetId: datasetId});
            ArcheoEvents.broadcast("dataset-remove", null, {datasetId: datasetId});
    
            /* Remove dataset from cache */
            ArcheoCache.removeDataset(datasetId);
        });
    }


    MapUtilities.loadDatasets = function(datasetsIds) {
        return new Promise(function(resolution, rejection) {
            // Create datasets
            let promises = [];
    
            if( datasetsIds.length > 0 ) {
                datasetsIds.forEach( function(datasetId) {
                    promises.push( new Promise(async function (resolution, rejection) {
                        MapUtilities.fetchNewDataset(datasetId)
                        .then(() => {
                            MapUtilities.broadcastDatasetCreation(datasetId);
                            resolution(true);
                        })  
                        .catch(() => {
                            resolution(false);
                        });
                    }) );
                });
            }
    
            Promise.all(promises).then((results) => {
                resolution();
            })
        });
    }
    
    
    MapUtilities.loadLayers = function(layersIds) {
        return new Promise((resolution, rejection) => {
            // Create datasets
            let layersPromises = [];

            if( layersIds.length > 0 ) {
                layersIds.forEach( async function(layerId, index) {
                    /* Fill lacking layer style data with default layer template. This prevents session version incompatibility with website version */
                    let currentLayerStyle = ArcheoSession.get().layers[layerId].style;
                    let filledLayerStyle = ArcheoUtilities.deepExtend(
                        ArcheoSession.getDefaultLayerStyle(), 
                        currentLayerStyle
                        );

                    ArcheoSession.get().layers[layerId].style = filledLayerStyle;

                    MapUtilities.broadcastLayerCreation(layerId);
                    layersPromises.push( initializeLayer(layerId) );
                });
            }
    
            Promise.all(layersPromises).then(() => {
                resolution(true);
            });
        });
    }


    MapUtilities.getAttributesDict = function() {    
        let allAttributes = {};
        let attributesKeys = Object.keys( attributes );

        for(var i = 0; i < attributesKeys.length; ++i) {
            var objectId = attributesKeys[i];
            allAttributes = ArcheoUtilities.deepExtend(allAttributes, attributes[objectId]);
        }

        return allAttributes;
    }
}


export default registerMapUtilities;