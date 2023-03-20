import { 
    promiseGetDescendantsAttributes,
    promiseGetAncestorsAttributes 
} from '../../../utilities.js';


function ancestorSelectEvents(elementsDic, layerId) {
    let $ancestorSearchInput = elementsDic.ancestorsInput;
    let $ancestorSearchButton = elementsDic.ancestorsButt;
    let $selectValues = elementsDic.browser;

    $ancestorSearchButton.on('click', function() {
        let treeIndex = $ancestorSearchInput.attr('searched-value');
        let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map( (el) => $(el).val() );

        let layerConfig = ArcheoSession.get().layers[layerId];
        let attributeId = layerConfig.attributeId;
        let attributeType = layerConfig.attributeType;

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


function descendantsSelectEvents(elementsDic, layerId) {
    let $descendantsSearchInput = elementsDic.descendantsInput;
    let $descendantsSearchButton = elementsDic.descendantsButton;
    let $selectValues = elementsDic.browser;

    $descendantsSearchButton.on('click', function() {
        let treeIndex = $descendantsSearchInput.attr('searched-value');
        let attributesValuesIds = $selectValues.find('option:not(.hidden)').get().map( (el) => $(el).val() );

        let layerConfig = ArcheoSession.get().layers[layerId];
        let attributeId = layerConfig.attributeId;
        let attributeType = layerConfig.attributeType;

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


function treeSelectEvents(elementsDic, layerId) {
    ancestorSelectEvents(elementsDic, layerId);
    descendantsSelectEvents(elementsDic, layerId);
}


export {
    treeSelectEvents    
};