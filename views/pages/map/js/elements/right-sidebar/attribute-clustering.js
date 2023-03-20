import attributes from 'Pages/map/data/attributes.json';


function initializeClusteringAttributeSelect() {
    let $selectAttribute = $('#select-cluster-attribute');

    let allAttributes = MapUtilities.getAttributesDict();

    ArcheoUI.setSelectpicker( $selectAttribute, allAttributes, true );
}


function initializeClusteringByTreeLevelSlider() {
    var $rangeSlider = $('#attribute-clustering-tree-level-slider');

	return ArcheoUI.initializeSlider($rangeSlider, {
		min: 0,
		max: 10,
		from: 10,
		step: 1,
		type: 'single',
		//postfix: ' level'
	});
}


function initializeClusteringByRootWordSpinner() {
	let $wordRootSpinner = $('#attribute-clustering-root-word-input');

	return $wordRootSpinner.spinner({
		culture: window.getLang(),
		min: 1,
		max: 100,

		numberFormat: "n",
		step: 1
	});
}


function initializeAttributeClustering() {
    initializeClusteringAttributeSelect();
    initializeClusteringByTreeLevelSlider();
	initializeClusteringByRootWordSpinner();
}


export default initializeAttributeClustering;