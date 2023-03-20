import {
	initializeLayer,
	broadcastLayerCreation
} from './initialize-layer.js';


function initializeNewLayerButtonEvents() {
	let session = ArcheoSession.get();

	$('#new-layer-button').on('dataset-add dataset-remove', function(event) {
		let datasetsCount = session.datasets._counter;

		if( datasetsCount > 0 )
			$('#new-layer-button').removeAttr('disabled');
		else
			$('#new-layer-button').attr("disabled", true);
	});

	$('#new-layer-button').on('click', async function() {
		/* Disable loading screen on layer initialization */
		$('#new-layer-button').one('layer-initialization', () => {
			ArcheoUtilities.setButtonLoaded('#new-layer-button');
		});

		/* Enable loading screen on add layer click event */
		ArcheoUtilities.setButtonLoading('#new-layer-button').then(async () => {
			var layerId = ArcheoSession.addLayer();

			broadcastLayerCreation(layerId);

			initializeLayer(layerId);
		});
	});
}


export default initializeNewLayerButtonEvents;