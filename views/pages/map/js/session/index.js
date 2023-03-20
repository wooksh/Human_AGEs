import defaultLayerStyle from './data/layer_default.js';

import { 
	initializeLayer
} from '../events/ui/right-sidebar/layers/new-layer/initialize-layer.js';


function registerSessionFunctions() {
    ArcheoSession.addDataset = function(objectId, databaseName, entityName, queryString) {
        let datasetsNumber = ArcheoSession.get().datasets._counter + 1 || 1; 
        let datasetId = `${objectId}_${datasetsNumber}`;

        ArcheoSession.get().datasets[ datasetId ] = {
            name: databaseName.capitalize() + " #" + datasetsNumber,
            objectId: objectId,
            databaseName: databaseName,
            entityName: entityName,
            query: queryString,
            samplingRatio: 1,
            isCustom: false
        };

        ArcheoSession.get().datasets._order.push(datasetId);
        ArcheoSession.get().datasets._counter += 1;

        return datasetId;
    };


    ArcheoSession.addCustomDataset = function(fileName) {
        if( !ArcheoUtilities.isNumber(ArcheoSession.get().datasets._counter) )
            ArcheoSession.get().datasets._counter = 0;

        let datasetsNumber = ArcheoSession.get().datasets._counter + 1 || 1; 
        let datasetId = `${fileName}_${datasetsNumber}`;

        ArcheoSession.get().datasets[ datasetId ] = {
            name: fileName.capitalize() + " #" + datasetsNumber,
            attributesDict: {}, // Key (attribute name): value (attribute type)
            samplingRatio: 1,
            isCustom: true
        };

        ArcheoSession.get().datasets._order.push(datasetId);
        ArcheoSession.get().datasets._counter += 1;

        return datasetId;
    };


    ArcheoSession.removeDatasets = function(datasetId = null) {
        if(datasetId === null) {
            let datasetIds = ArcheoSession.get().datasets._order.clone();

            datasetIds.forEach((datasetId) => {
                ArcheoSession.removeDatasets(datasetId);
            })
        }
        else {
            delete ArcheoSession.get().datasets[datasetId];

            ArcheoSession.get().datasets._order.removeEl(datasetId);
        }
    }


    ArcheoSession.getDefaultLayerStyle = function() {
        return ArcheoUtilities.deepCloneObject( defaultLayerStyle );
    }


    ArcheoSession.addLayer = function(layerId = null) {
        var layerNumber = ArcheoSession.get().layers._counter + 1 || 1;
        var zIndex = ArcheoMap.getLayerZIndex(layerNumber);

        if( layerId === null )
            layerId = 'layer_' + layerNumber;

        ArcheoSession.get().layers[layerId] = {
            layerId: layerId,
            type: '',
            datasetId: '',
            attributeId: '',
            attributeName: '',
            attributeType: '',
            //attributeValue: '',
            style: ArcheoSession.getDefaultLayerStyle(),
            settings: {
                zIndex: zIndex,
                opacity: 1.0,
                visible: true,
                title: "Layer #" + layerNumber
            }
        };

        ArcheoCache.getTemporaryEntry('styleCache')[layerId] = {};
        ArcheoCache.getTemporaryEntry('canvasCache')[layerId] = {};
        ArcheoCache.getTemporaryEntry('featuresClusters')[layerId] = {};

        /* Create cache entry for layer clusters */
        ArcheoCache.setSessionEntry(layerId, {}, 'object');
        // Since clusters are features as well, they could be parsed as geojson, excluding their features
    
        ArcheoSession.get().layers._order.push(layerId);
        ArcheoSession.get().layers._counter += 1;
    
        return layerId;
    }


    ArcheoSession.cloneLayer = function(layerId) {
        var clonedLayerConfig = ArcheoSession.get().layers[layerId];

        let layers = ArcheoSession.get().layers;
        var newLayerId = layerId + '_copy_' + layers._counter;

        layers[newLayerId] = ArcheoUtilities.deepCloneObject(clonedLayerConfig);
        layers[newLayerId].settings.title += ' (copy)';
        layers[newLayerId].layerId = newLayerId;

        ArcheoCache.getTemporaryEntry('styleCache')[newLayerId] = {};
        ArcheoCache.getTemporaryEntry('featuresClusters')[newLayerId] = {};

        ArcheoCache.setSessionEntry(newLayerId, {}, 'object');

        layers._order.push(newLayerId);
        layers._counter += 1;

        MapUtilities.broadcastLayerCreation(newLayerId);
        initializeLayer(newLayerId);

        return newLayerId;
    }


    ArcheoSession.removeLayers = function(layerId = null) {
        if(layerId === null) {
            let layerIds = ArcheoSession.get().layers._order.clone();

            layerIds.forEach((layerId) => {
                ArcheoSession.removeLayers(layerId);
            })
        }
        else {
            delete ArcheoSession.get().layers[layerId];

            ArcheoSession.get().layers._order.removeEl(layerId);
        }
    }


    ArcheoSession.getAttributeLegend = function(attributeId, 
        getOnlyAttributes = false, includeGroupingInfo = false, ignoreSpecialAttributes = false) {
        
        let legend = ArcheoSession.get().legend.attributes;
        let attributesNames = Object.keys( ArcheoCache.getAttributeCache(attributeId) );

        if( !(attributeId in legend) )
			legend[attributeId] = {
                '_groups': []
            };

        legend = legend[attributeId];
        let attributesLegend = {};

        if(getOnlyAttributes) {
            for(let i = 0; i < attributesNames.length; ++i) {
                let attributeName = attributesNames[i];
                let entryName = attributeName;

                /* Ignore special attributes */
                if(ArcheoUtilities.isValid(legend[attributeName])) {
                    if( ! ArcheoUtilities.isValid(legend[attributeName].special) ) {
                        if(includeGroupingInfo) {
                            let groupName = legend[attributeName].group;
                            if(ArcheoUtilities.isValid(groupName)) {
                                entryName = groupName;
                                //attributesLegend[groupName] = legend[groupName];
                            }
                        } 
                    }

                    if(ignoreSpecialAttributes) {
                        if( ! ArcheoUtilities.isValid(legend[attributeName].special) )
                            attributesLegend[entryName] = legend[entryName];
                    } else
                        attributesLegend[entryName] = legend[entryName];
                }
            }
        } else {
            attributesLegend = legend;
        }

        return attributesLegend;
    }


    ArcheoSession.getAdmixtureLegend = function(attributeId,
        getOnlyAttributes = false, ignoreSpecialAttributes = true, includeGroupingInfo = false) {

        let legend = ArcheoSession.get().legend.attributes;

        if( !(attributeId in legend) )
			legend[attributeId] = {
                '_groups': [],
                '_order': []
            };

        legend = legend[attributeId];
        let attributesLegend = {};

        if(getOnlyAttributes) {
            for(let i = 0; i < legend._order.length; ++i) {
                let entryName = legend._order[i];

                /* Ignore special attributes */
                if( ! ArcheoUtilities.isValid(legend[entryName].special) ) {
                    if(includeGroupingInfo) {
                        let groupName = legend[entryName].group;
                        if(ArcheoUtilities.isValid(groupName)) {
                            entryName = groupName;
                            //attributesLegend[groupName] = legend[groupName];
                        }
                    } 
                }

                /*if(ignoreSpecialAttributes) {
                    if( ! ArcheoUtilities.isValid(legend[attributeName].special) )
                        attributesLegend[entryName] = legend[entryName];
                } else
                    attributesLegend[entryName] = legend[entryName];*/

                attributesLegend[entryName] = legend[entryName];
            }
        } else {
            attributesLegend = legend;
        }

        if(ignoreSpecialAttributes === false) {
            if('OTHER' in legend)
                attributesLegend.OTHER = legend.OTHER;
            if('MISSING' in legend)
                attributesLegend.MISSING = legend.MISSING;
        }
        else {
            /*if('OTHER' in legend)
                delete attributesLegend.OTHER;
            if('MISSING' in legend)
                delete attributesLegend.MISSING;*/
        }

        return attributesLegend;
    }



    ArcheoSession.getAttributeGroupsList = function(attributeId) {
        let legend = ArcheoSession.get().legend.attributes;

        if( !(attributeId in legend) )
			legend[attributeId] = {
                '_groups': []
            };

        return legend[attributeId]._groups;
    };


    ArcheoSession.getAttributeGroupsLegend = function(attributeId) {
        let legend = ArcheoSession.get().legend.attributes;

        if( !(attributeId in legend) )
			legend[attributeId] = {
                '_groups': []
            };

        legend = legend[attributeId];
        let groupsKeys = legend._groups;
        let groupsLegend = {};

        groupsKeys.forEach((key) => {
            groupsLegend[key] = legend[key];
        });

        return groupsLegend;
    }


    ArcheoSession.getRegionLegend = function(regionTypeId, getOnlyRegions = false) {
        let legend = ArcheoSession.get().legend.regions;

        if( !(regionTypeId in legend) )
			legend[regionTypeId] = {
                '_groups': []
            };

        legend = legend[regionTypeId];

        if(getOnlyRegions)
            legend = ArcheoUtilities.filterObject(legend, ([key]) => !key.startsWith('_'));

        return legend;
    }


    ArcheoSession.load = function(sessionId) {
        let newSession = ArcheoCache.getSession(sessionId);

        if(ArcheoUtilities.isValid(newSession)) {
            let doLoadLayers = ArcheoUtilities.isValid(newSession.layers);
            let doLoadDatasets = ArcheoUtilities.isValid(newSession.datasets);

            let oldSession = ArcheoSession.get();

            /* Remove old datasets and layers if they are about to be overwritten */
            if(doLoadDatasets) {
                if(ArcheoUtilities.isValid(oldSession.datasets)) {
                    let oldDatasetsIds = ArcheoSession.get().datasets._order.clone();
                    MapUtilities.removeDatasets(oldDatasetsIds);
                }
            }

            if(doLoadLayers) {
                if(ArcheoUtilities.isValid(oldSession.layers)) {
                    let oldLayersIds = ArcheoSession.get().layers._order.clone();
                    MapUtilities.removeLayers(oldLayersIds);
                }
            }

            /* Load up new session */
            ArcheoCache.loadSession(newSession);
            
            if(doLoadDatasets) {
                let newDatasetsIds = newSession.datasets._order;

                MapUtilities.loadDatasets(newDatasetsIds).then(() => {
                    if(doLoadLayers) {
                        let newLayersIds = newSession.layers._order;

                        MapUtilities.loadLayers(newLayersIds).then(() => {
                            ArcheoEvents.broadcast('session-load');
                        });
                    }
                });
            }
            else if(doLoadLayers) {
                let newLayersIds = newSession.layers._order;

                MapUtilities.loadLayers( newLayersIds ).then(() => {
                    ArcheoEvents.broadcast('session-load');
                });
            }
            else {
                ArcheoEvents.broadcast('session-load');
            }

            return sessionId;
        }
        else {
            return false;
        }
    }


    // "baseLayers": {} add baseLayer?: name, id?, color, isVisible, config {} // e.g. for basemap
    // nie, zrobię to na sztywno, ale bedzie w configu
}


export {
    registerSessionFunctions
};