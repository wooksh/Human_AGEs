import { 
    promiseGetDescendantsAttributes,
    promiseGetAncestorsAttributes 
} from '../../utilities.js';


function ancestorSelectEvents() {
    let $ancestorSearchInput = $('#attribute-filtering-ancestors');
    let $ancestorSearchButton = $('#attribute-filtering-ancestors-button');
    let $selectValues = $('#select-attribute-filter-browser');

    $ancestorSearchButton.on('click', function() {
        let treeIndex = $ancestorSearchInput.attr('searched-value');
        let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map( (el) => $(el).val() );

        let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeFiltering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;

        let allAttributes = MapUtilities.getAttributesDict();
        let attributeEntity = allAttributes[attributeId].entity;
        
        promiseGetAncestorsAttributes(attributeEntity, attributesValuesIds, treeIndex)
            .then(function(ancestors) {
                ancestors.forEach((ancestor) => {
                    $selectValues.find(`option:not(.hidden)[value="${ancestor.name}"]`).prop('selected', true);
                });
            });
    });
}


function descendantsSelectEvents() {
    let $descendantsSearchInput = $('#attribute-filtering-descendants');
    let $descendantsSearchButton = $('#attribute-filtering-descendants-button');
    let $selectValues = $('#select-attribute-filter-browser');

    $descendantsSearchButton.on('click', function() {
        let treeIndex = $descendantsSearchInput.attr('searched-value');
        let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map( (el) => $(el).val() );

        let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeFiltering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;

        let allAttributes = MapUtilities.getAttributesDict();
        let attributeEntity = allAttributes[attributeId].entity;

        promiseGetDescendantsAttributes(attributeEntity, attributesValuesIds, treeIndex)
            .then(function(descendants) {
                descendants.forEach((descendant) => {
                    $selectValues.find(`option:not(.hidden)[value="${descendant.name}"]`).prop('selected', true);
                });
            });
    });
}


function treeSelectEvents() {
    ancestorSelectEvents();
    descendantsSelectEvents();
}


export {
    treeSelectEvents    
};