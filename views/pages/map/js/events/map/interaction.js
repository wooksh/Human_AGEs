import { createMapModal } from 'Views/mixins-pug/map-modal/script.js';


function redrawMapOnWindowSize(map, timeInterval = 300) {
	$(window).resize( function() {
		setTimeout( function() {  
			map.updateSize();
		}, timeInterval);
	});
}


function updateSessionOnMove(map) {
	map.on('moveend', function(event) {
		let view = map.getView();
		let position = ArcheoMap.getCoordinatesProjectedToData( view.getCenter() );
		let zoom = view.getZoom();

		ArcheoSession.get().map.position = position;
		ArcheoSession.get().map.zoom = zoom; 
	});
}


function clearMapOnZoom(map) {
	/* Fix for persisting piechart labels on zoom level changes */
	map.getView().on('change:resolution', (event) => {
		ArcheoMap.clearPiechartLabels();
	});
}


function mapFeatureModal(map) {
	$('#map').on('map-modal', function(event, data) {
		let $modalTemplate = $(`#features-map-modal-template`);
		createMapModal($modalTemplate, data.clusters, data.interactionEvent);
	});
}


function initializeInteractionEvents() {
	var map = ArcheoMap.getMap();

	redrawMapOnWindowSize(map);
	updateSessionOnMove(map);
	clearMapOnZoom(map);
	mapFeatureModal(map);
}



export default initializeInteractionEvents;