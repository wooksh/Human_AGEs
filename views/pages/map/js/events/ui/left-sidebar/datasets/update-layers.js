
function updateLayersOnDatasetChange() {
    $('html').on('dataset-update dataset-remove dataset-add', '.layer', function(event, data) {
		if(event.target === event.currentTarget) { // This assures that the code executes only for .layer object and not its children
			var $layer = $(event.target);
			var layerId = $layer.attr('id');

			if(  !ArcheoUtilities.isValid(data.layerId) || data.layerId === layerId ) {			
				var $obj = $layer.find('select.select-layer-dataset');

				let datasetIds = ArcheoSession.get().datasets._order || [];

				let datasetDict = {};

				let layersSelectedDatasetId = ArcheoSession.get().layers[layerId].datasetId;
				let doesLayerSelectedDatasetStillExist = false;

				datasetIds.forEach( (datasetId) => {

					let dataset =  ArcheoSession.get().datasets[ datasetId ];
					
					if(ArcheoUtilities.isValid(dataset)) {
						datasetDict[datasetId] = {
							name: dataset.name
							//subtext: entityTitle // i could change it to years range and features count
						};

						if(datasetId === layersSelectedDatasetId) {
							datasetDict[datasetId].selected = true;
							doesLayerSelectedDatasetStillExist = true;
						}
					}
				});

				ArcheoUI.setSelectpicker( $obj, datasetDict, true, true );

				if( !doesLayerSelectedDatasetStillExist )
					$obj.trigger('changed.bs.select');
			}
		}
    });
}



function initializeDatasetEvents() {
    updateLayersOnDatasetChange();
}


export default initializeDatasetEvents;