import defaultLayerStyle from './data/layer_default.js';
import colors from 'Views/mixins-sass/_colors.scss';



function registerSessionFunctions() {
    ArcheoSession.addDatasetWithId = function(datasetId, objectId = '', databaseName = '', entityName = '', queryString = '') {
        ArcheoSession.get().datasets[ datasetId ] = {
            name: datasetId,
            objectId: objectId,
            databaseName: databaseName,
            entityName: entityName,
            query: queryString,
            samplingRatio: 1
        };

        ArcheoSession.get().datasets._order.push(datasetId);
        ArcheoSession.get().datasets._counter += 1;

        return datasetId;
    };


    ArcheoSession.addDataset = function(objectId = '', databaseName = '', entityName = '', queryString = '') {
        let datasetsNumber = ArcheoSession.get().datasets._counter + 1 || 1; 
        let datasetId = `${objectId}_${datasetsNumber}`;

        addDatasetWithId(datasetId, objectId, databaseName, entityName, queryString);

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
        } else {
            attributesLegend = legend;
        }

        return attributesLegend;
    }


    ArcheoSession.getAdmixtureLegend = function(attributeId,
        getOnlyAttributes = false, ignoreSpecialAttributes = true) {

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
}


function initializeSessionState(entityFeature) {
    let session = ArcheoSession.get();

    /* Time filter */
    if(ArcheoUtilities.isValid(entityFeature.dating)) {
        session.filters.timeline.yearFrom = entityFeature.dating.year_start;
        session.filters.timeline.yearTo = entityFeature.dating.year_end;
    }
    session.filters.timeline.showPresent = true;
    session.filters.timeline.isActive = true;
    session.filters.timeline.showPropability = false;

    /* Regions options */
    session.clustering.features.useCentroids = false;
    session.clustering.features.showRegions = true;
    session.clustering.features.labelPosition = "region";

    /* Layer options */
    session.layers[layerId].style.color = colors.palette_secondary_color_darker;
}


export {
    registerSessionFunctions,
    initializeSessionState
};