function initializeDatasetSelectEvents() {
	$('#select-query-dataset').on('changed.bs.select update', function (event) {
		let $obj = $(event.target).find(':selected');

		let datasetName = $obj.text();
		let datasetId = $obj.val();
		let entity = $obj.attr('entity');
		let database = $obj.attr('database');

		ArcheoEvents.broadcast('selected-dataset-update', '#select-query-dataset', {
			datasetName: datasetName,
			datasetId: datasetId,
			entity: entity,
			database: database
		});

		let queryTemplate = {
			'database': database,
			'objects': entity.toLowerCase(),
			'filters': {},
			'lang': document.documentElement.lang
		};

		$('#query-call-textarea').val( JSON.stringify(queryTemplate, null, 1) );
	});

    /* Trigger it once for default filters query */
    $('#select-query-dataset').trigger('update');
}


export default initializeDatasetSelectEvents;
