import { broadcastDatasetCreation, fetchNewDataset } from './initialize-dataset';


import entityDictionary from 'Pages/map/data/entityDictionary.json';


function terminateQueryOnError(errorMessage) {
	$('#query-call-error-text').text(errorMessage);
	ArcheoUtilities.setButtonLoaded('#query');
}

function terminateQueryOnWarning(errorMessage) {
	$('#query-call-warning-text').text(errorMessage);
	ArcheoUtilities.setButtonLoaded('#query');
}


function initializeQueryButtonEvents() {
    $('#query').on('click', async function() {
		$('#query').one('dataset-add', () => {
			ArcheoUtilities.setButtonLoaded('#query');
		});

		/* Get query object */
		let queryString = $('#query-call-textarea').val();
		let queryObject;

		try {
			queryObject = JSON.parse(queryString);
		} catch(e) {
			terminateQueryOnError('Provided query is not a valid JSON string.');
			return;
		}

		/* Fetch dataset */
		ArcheoUtilities.setButtonLoading('#query').then(async function() {
			$('#query-call-error-text').text('');
			$('#query-call-warning-text').text('');

			var entityName = queryObject.objects;
			var databaseName = queryObject.database;
			var objectId;
			
			if(databaseName in entityDictionary) {
				if(entityName in entityDictionary[databaseName]) {
					objectId = entityDictionary[ databaseName ][ entityName ];
				} else {
					terminateQueryOnError('Query entity name is invalid.');
					return;
				}
			} else {
				terminateQueryOnError('Query database name is invalid.');
				return;
			}

			let datasetId = ArcheoSession.addDataset(
				objectId, 
				databaseName,
				entityName,
				queryString
			);

			fetchNewDataset(datasetId)
			.then(() => {
				broadcastDatasetCreation(datasetId);
			})
			.catch((errorMessage) => {
				if(errorMessage.status === "error")
					terminateQueryOnError(errorMessage.text);
				else if(errorMessage.status === "warning")
					terminateQueryOnWarning(errorMessage.text);
				
				if(ArcheoUtilities.isValid(errorMessage.details))
					console.error(`Database message details:\n${errorMessage.details}`);

				ArcheoSession.removeDatasets(datasetId);
			});	
		});
    })
}


export default initializeQueryButtonEvents;