function initializeSessionsContainer() {
	//initializeAppearanceDatasetEvents();

	$('#sessions-container').sortable({
		placeholder: "sortable-placeholder",
		handle: ".handle",
		delay: 250,
		opacity: 0.7
	});

	$('#sessions-trash').droppable({
      accept: "#sessions-container > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
		let $session = ui.draggable;
		let sessionId = $session.prop('id');

		/* Remove layer from cache */
		ArcheoCache.removeSession(sessionId);

		/* Remove layer from interface */
		$session.remove();
      }
    });
	
}


export default initializeSessionsContainer;