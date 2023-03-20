const queriesData = {
	"RemainsAADR": {
		"selectionSet": [
			"download"
		]
	},
	"PersonAADR": {
		"selectionSet": [
			"download"
		]
	},
	"PersonEMPOP": {
		"selectionSet": [
			"download"
		]
	},
	"default": {
		"variablesDeclarations": {
			"$lang": "String"
		}
	}
};


const csvFileColumns = [
	'sample_id', 
	'sex', 
	'population_name', 
	'dating_from', 
	'dating_to', 
	'haplogroup_y', 
	'haplogroup_mt',
	'place_name',
	'is_archaeological_site',
	'latitude',
	'longitude'
];


function queryDownload(entityName, featuresIds, datasetName) {
	return new Promise((resolution, rejection) => {
		let entityQueriesData = ArcheoRequests.getEntityQueryData( queriesData, entityName );

		let filters = { 
			id_in: featuresIds
		};

		console.log("entityQueriesData 000");
		console.log(entityQueriesData);

		console.log("entityName 000");
		console.log(entityName);

		console.log("queriesData 000");
		console.log(queriesData);

		let query = ArcheoRequests.createGraphqlQuery(
			entityName, 
			entityQueriesData['selectionSet'],
			filters
			//entityQueriesData['variablesDeclarations'] //{'$lang': 'String'}
			);

		console.log('query');
		console.log(query);

		//queryDownload(query, fileType, successCallback,

		ArcheoRequests.queryGraphQL(query, (response) => {
			let filePart = response.data[ entityName ];

			resolution({filePart: filePart, datasetName: datasetName});
		});
	})
}


function initializeDownloadButtonEvents() {
	$('#download-button').on('click', function(event) {
		$('#download-button .label').text("Downloading...");

		var fileType = $('#download-filetype :checked').attr('value');
		
		let datasetsFeaturesToDownload = ArcheoCache.getTemporaryEntry('datasetsFeaturesToDownload');
		let datasetsIds = Object.keys(datasetsFeaturesToDownload);
		let promises = [];

		datasetsIds.forEach((datasetId) => {
			let entityName = ArcheoSession.get().datasets[ datasetId ].objectId;
			let datasetName = ArcheoSession.get().datasets[ datasetId ].name;
			let featuresIds = datasetsFeaturesToDownload[ datasetId ];

			promises.push(queryDownload(entityName, featuresIds, datasetName));
		})

		Promise.all(promises).then((datas) => {
			var fileContent = [];

			if(fileType === 'JSON') {
				datas.forEach((data) => {
					let filePart = data.filePart;
					let datasetName = data.datasetName;

					filePart.forEach((feature) => {
						if(ArcheoUtilities.isValid(feature.download) && !ArcheoUtilities.isEmpty(feature.download))
							fileContent.push({...feature.download, dataset_name: datasetName});
					})
				})

				ArcheoUtilities.saveJSON(fileContent, "data.json");
			} 
			else if(fileType === 'CSV') {
				fileContent = ['dataset_name\t' + csvFileColumns.join('\t')];

				datas.forEach((data) => {
					let filePart = data.filePart;
					let datasetName = data.datasetName;

					filePart.forEach((feature) => {
						var line = [datasetName];

						csvFileColumns.forEach((col) => {
							line.push( feature.download[col] )
						})

						fileContent.push( line.join('\t'));
					})
				})

				ArcheoUtilities.saveJSON(fileContent, "data.csv");
			}

			$('#download-button .label').text("Download");
            $("#download-modal").modal("hide");
		});

		//$('#query-builder-modal').modal('hide');
	});
}


export default initializeDownloadButtonEvents;