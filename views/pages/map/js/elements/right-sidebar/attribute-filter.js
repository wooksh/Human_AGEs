import attributes from 'Pages/map/data/attributes.json';


function initializeAttributeSelect() {
    let $selectAttribute = $('#select-filter-attribute');

    let allAttributes = MapUtilities.getAttributesDict();

    ArcheoUI.setSelectpicker( $selectAttribute, allAttributes, true );

    let $attributes = $selectAttribute.find('option:not([value=""])');
    let availableAttributes = [];

    $.each($attributes, function(index, el) { 
        availableAttributes.push({
            id: $(el).attr('value'),
            type: $(el).attr('type'),
            name: $(el).text()
        });
    });
}


function initializeFilteringByTreeLevelSlider() {
    var $rangeSlider = $('#attribute-filtering-tree-level-slider');

	return ArcheoUI.initializeSlider($rangeSlider, {
		min: 0,
		max: 10,
		from: 1,
        to: 10,
		step: 1,
		type: 'double',
        drag_interval: true,
        //postfix: ' level',
	});
}


function initializeAttributeFilter() {
    initializeAttributeSelect();
    initializeFilteringByTreeLevelSlider();
}


export default initializeAttributeFilter;