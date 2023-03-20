function createDataset(datasetId, data) {
    ArcheoSession.addDatasetWithId(datasetId, window.entityDbName, '', window.entityType, '');

    let features = ArcheoMap.createFeatures( 
        data,
        ArcheoSession.get().map.dataProjection, 
        ArcheoSession.get().map.mapProjection
    );

    let dating = ArcheoUtilities.getDatasetDating(features);
    let geojsonFeatures = ArcheoMap.parseFeaturesToGeoJSON(features);
    ArcheoCache.addDataset(datasetId, geojsonFeatures);

    ArcheoSession.get().datasets[ datasetId ].dating = dating;
    ArcheoSession.get().datasets[ datasetId ].size = features.length;
    ArcheoSession.get().datasets[ datasetId ].isPresent = !ArcheoUtilities.isValid(dating);

    if(features.length === 1) {
        ArcheoSession.get().datasets[datasetId].name = features[0].get('properties').id;
    }

    ArcheoMap.addSource(datasetId);
    ArcheoMap.setDataSourceFeatures(datasetId, features);

    return datasetId;
}


function createLayer(layerId = null) {
    if(layerId === null)
        layerId = ArcheoSession.addLayer();

    ArcheoMap.addLayer(layerId, {
        declutter: true,
        title: window.entityName,
        ...ArcheoSession.get().layers[layerId].settings
    });

    return layerId;
}


function setLayerDataset(layerId, datasetId) {
    ArcheoSession.get().layers[layerId].datasetId = datasetId;
    ArcheoMap.setLayerDataSource(layerId, datasetId);
}


function setLayerAttribute(layerId, attributeParams) {
    /* Update session */
    ArcheoSession.get().layers[layerId].attributeId = attributeParams.attributeId || '';
    ArcheoSession.get().layers[layerId].attributeName = attributeParams.attributeName || '';
    ArcheoSession.get().layers[layerId].attributeType = attributeParams.attributeType || '';
    ArcheoSession.get().layers[layerId].type = attributeParams.layerType || 'tag';

    let legend = ArcheoSession.getAttributeLegend(attributeParams.attributeId);

    /* Update legend */
    if(!('MISSING' in legend))
        legend['MISSING'] = { filtered: false, name: 'MISSING', special: true };
    if(!('OTHER' in legend))
        legend['OTHER'] = { filtered: false, name: 'OTHER', special: true };
        
    let datasetId = ArcheoSession.get().layers[layerId].datasetId;
    let features = ArcheoMap.getDataSourceFeatures(datasetId);

    for(let i = 0; i < features.length; ++i) {
        ArcheoMap.setupFeatureAttributesData(features[i], layerId);

        let featureValue = features[i].get('decoration')[layerId].attributeValue;

	    // Register attribute value in legend
        if( !(featureValue in legend) ) {
            legend[ featureValue ] = { 
                name: featureValue,
                filtered: false,
                color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
                group: null
            };
        }
    }


    // Update map //
    let layer = ArcheoMap.getLayer(layerId);

    ArcheoMap.triggerClusterFilters(layer);
	ArcheoMap.triggerLayerStyleFunction(layer);
}


export {
    createDataset,
    createLayer,
    setLayerDataset,
    setLayerAttribute
}