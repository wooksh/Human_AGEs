function submitQueryBuilderFiltersEvent() {
	$('#submit-rules').on('click', function() {
		let $builder = $('#query-builder');
		let rulesObj = $builder.queryBuilder('getGraphQL');
		
		if( ArcheoUtilities.isValid( rulesObj ) &&
			$builder.queryBuilder('validate') === true ) {

			let filtersJSON = JSON.stringify(rulesObj, null, 1);
			$('#query-call-textarea').val( filtersJSON );
			$('#query-builder-modal').modal('hide');

			ArcheoEvents.broadcast('query-builder-update', '#submit-rules')
		}
	});
}


export default submitQueryBuilderFiltersEvent;