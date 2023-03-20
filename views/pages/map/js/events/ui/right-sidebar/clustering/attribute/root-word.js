import {addGroupToLegend, resetClustering} from './utilities.js';


function initializeRootWordClusteringEvents() {
    let $rootWordButton = $('#attribute-clustering-root-word-input-button');
    
    $rootWordButton.on('click', function() {

        let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;
		let legend = ArcheoSession.getAttributeLegend(attributeId);

        //let $selectValues = $('#select-attribute-cluster-browser');
        //let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

        let attributesValuesIds = Object.keys(ArcheoSession.getAttributeLegend(attributeId, true, false, true));
        /* Reset clustering */
        resetClustering(false);

        let groupSet = new Set([]);

        let $rootWordSpinner = $('#attribute-clustering-root-word-input');
        let rootWordLength = parseInt($rootWordSpinner.val())
    
        attributesValuesIds.forEach((value) => {
            let groupName = value.substring(0, rootWordLength);

            if( ArcheoUtilities.isValidNonEmptyString(groupName) ) {
                groupSet.add(groupName);
    
                // Create new legend entry for the group, if it does not exists already //
                addGroupToLegend(legend, groupName);
    
                // Assign attributes to the group //
                if(value !== groupName && value in legend)
                    legend[value].group = groupName;
            }
        });
    
        //$groupMessageText.text(`Added ${attributesValuesCount} attribute's values to ${groupsCount} groups.`);

        ArcheoEvents.broadcast('clustering-attribute-change', null, {
            attributeId: attributeId,
            attributeType: attributeType
        });
    });
}


export default initializeRootWordClusteringEvents;