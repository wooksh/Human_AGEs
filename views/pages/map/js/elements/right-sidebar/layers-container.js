function initializeLayersContainer() {
	$('#layers-container').sortable({
		placeholder: "sortable-placeholder",
		handle: ".handle",
		delay: 250,
		opacity: 0.7
	});

	$('#layer-trash').droppable({
      accept: "#layers-container > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
		let $layer = ui.draggable;
		let layerId = $layer.prop('id');

		MapUtilities.removeLayers(layerId);
      }
    });
}


export default initializeLayersContainer;