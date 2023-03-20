function initializeQueryFiltersButtonEvents() {
	$('#query-filters-button').on('query-builder-update selected-dataset-update', function(event) {

		let $button = $(event.target);

		let rulesCount = $('#query-builder').find('.rule-value-container').not(':empty').length;
		$button.find('.items-count').text(rulesCount);
	});

	$('#query-filters-button').trigger('selected-entity-update');
}


export default initializeQueryFiltersButtonEvents;