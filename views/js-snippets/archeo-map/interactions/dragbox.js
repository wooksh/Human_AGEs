import {shiftKeyOnly} from 'ol/events/condition';
import {DragBox} from 'ol/interaction';
import {setSelectedFlag, setSelected} from './select';


function selectFeaturesWithinBox(dragBox, select, settings) {
    dragBox.on('boxend', function () {
        let selectedFeatures = select.getFeatures();

        const extent = dragBox.getGeometry().getExtent();

        let featuresLayers = ArcheoMap.getMapLayers();
        let layersIds = Object.keys(featuresLayers);

        layersIds.forEach((layerId) => {
            let layer = featuresLayers[ layerId ];
            let layerType = ArcheoSession.get().layers[ layerId ].type;

            if(layerType !== 'heatmap') {
                let clusterSource = layer.getSource();
                let featuresInExtend = clusterSource.getFeaturesInExtent(extent);

                featuresInExtend.forEach((feature) => {
                    selectedFeatures.push(feature);
                })

                setSelectedFlag(settings.layer,
                    featuresInExtend, [], false
                );
            }
        });
      });
}


function resetSelection(dragBox, select, settings) {
    dragBox.on('boxstart', function (e) {
        let selectedFeatures = select.getFeatures();

        /* Remove features from temporary cache */
        ArcheoCache.setTemporaryEntry('selectedFeatures', {});

        /* Reset clusters decorations */
        selectedFeatures.forEach((cluster) => {
            setSelected(cluster, settings.layer, false);
        });
        
        /* Remove features from select interaction cache */
        selectedFeatures.clear();

        /* Clear labels layer */
        settings.layer.getSource().clear();
    });
}


function initializeDragBoxEvents(dragBox, select, settings) {
    selectFeaturesWithinBox(dragBox, select, settings);
    //resetSelection(dragBox, select, settings);
}


function initializeDragBoxInteraction(select, settings) {
    const dragBox = new DragBox({
        condition: shiftKeyOnly,
    });

    initializeDragBoxEvents(dragBox, select, settings);

    return dragBox;
}


export default initializeDragBoxInteraction;