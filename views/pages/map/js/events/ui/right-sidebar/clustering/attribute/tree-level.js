import {promiseGetAttributesByTreeLevel} from '../../utilities.js';
import {addGroupToLegend, resetClustering} from './utilities.js';


function treeLevelClusteringEvents() {
    let $treeLevelSlider = $('#attribute-clustering-tree-level-slider');

    $('#attribute-clustering-tree-level-button').on('click', function() {
        let treeLevel = $treeLevelSlider.data("from");

        let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;
        let legend = ArcheoSession.getAttributeLegend(attributeId);
        let attributesValuesIds = Object.keys(ArcheoSession.getAttributeLegend(attributeId, true, false, true));

        /* Reset clustering */
        resetClustering(false);

        if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
            let allAttributes = MapUtilities.getAttributesDict();
            let attributeEntity = allAttributes[attributeId].entity;

            let groupNamePrefix = $("#attribute-clustering-prefix").val();

            promiseGetAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevel)
                .then(function(ancestors) { 
                    for(var i = 0; i < ancestors.length; ++i) {
                        let valueName = ancestors[i].name;
                        let groupName = groupNamePrefix + ancestors[i].group;

                        // Create new legend entry for the group, if it does not exists already //
                        addGroupToLegend(legend, groupName);

                        // Assign attributes to the group //
                        if(valueName !== groupName && valueName in legend)
                            legend[valueName].group = groupName;
                    }

                    ArcheoEvents.broadcast('clustering-attribute-change', null, {
                        attributeId: attributeId,
                        attributeType: attributeType
                    });
                });
        }
    });
}


export default treeLevelClusteringEvents;