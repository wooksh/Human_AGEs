function initializeDatasetsContainer() {
	//initializeAppearanceDatasetEvents();

	$('#datasets-container').sortable({
		placeholder: "sortable-placeholder",
		handle: ".handle",
		delay: 250,
		opacity: 0.7
	});

	$('#dataset-trash').droppable({
      accept: "#datasets-container > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
		let $dataset = ui.draggable;
		let datasetId = $dataset.prop('id');

		MapUtilities.removeDatasets(datasetId);
      }
    });
	
}


export default initializeDatasetsContainer;