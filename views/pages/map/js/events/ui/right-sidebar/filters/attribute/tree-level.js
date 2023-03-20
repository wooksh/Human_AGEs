import {promiseFitlerAttributesByTreeLevel} from '../../utilities.js';
import {resetFiltering} from './utilities.js';


function treeLevelFilteringEvents() {
    let $treeLevelSlider = $('#attribute-filtering-tree-level-slider');

    $('#attribute-filtering-tree-level-button').on('click', function() {
		let treeLevelFrom = $treeLevelSlider.data("from");
		let treeLevelTo = $treeLevelSlider.data("to");

        let filteringConfig = ArcheoCache.getTemporaryEntry('attributeFiltering');

        if( ArcheoUtilities.isValid(filteringConfig) ) {
            let attributeId = filteringConfig.attributeId;
            let attributeType = filteringConfig.attributeType;

            if(attributeType === 'tree') {
                let legend = ArcheoSession.getAttributeLegend(attributeId);
                let attributesValuesIds = Object.keys(ArcheoSession.getAttributeLegend(attributeId, true));

                /* Update session */
                ArcheoSession.get().filters.attributes.configs[attributeId].treeLevel = [treeLevelFrom, treeLevelTo];

                if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
                    let allAttributes = MapUtilities.getAttributesDict();
                    let attributeEntity = allAttributes[attributeId].entity;

                    promiseFitlerAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevelFrom, treeLevelTo)
                        .then(function(values) {
                            /* Reset the filtering */
                            resetFiltering(true, false);

                            /* Apply filtering for values in-between the level range */
                            for(var i = 0; i < values.length; ++i) {
                                let valueName = values[i].name;

                                if(valueName in legend)
                                    legend[valueName].filtered = false;
                            }

                            ArcheoEvents.broadcast('filter-attribute-change', null, {
                                attributeId: attributeId,
                                attributeType: attributeType
                            });
                        });
                }
            }
        }
    });
}


export default treeLevelFilteringEvents;