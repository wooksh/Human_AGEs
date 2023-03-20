import registerMapUtilities from "../../../../../../utilities";


function getMapFeatures(queryString) {
	return new Promise((resolution, rejection) => {
		ArcheoRequests.queryAPI(queryString, (data, errorMessage) => {
			if(ArcheoUtilities.isValid(data)) {
				/* Reset query error text */
				$('#query-call-error-text').text('');	

				let features = ArcheoMap.createFeatures( 
					data,
					ArcheoSession.get().map.dataProjection, 
					ArcheoSession.get().map.mapProjection
				);
			
				resolution(features);
			}
			else {
				rejection(errorMessage);
			}
		}); //, {lang: 'en'});
	});
}


function initializeDownloadButton(newDatasetElement, datasetId) {
	/* Visibility button */
	let downloadButt = newDatasetElement.find('#file_download');
	downloadButt.attr('id', `${datasetId}_file_download`);
	downloadButt.next().attr('for', `${datasetId}_file_download`);
	
	downloadButt.on('click', function(event) {
		var datasetName = ArcheoSession.get().datasets[ datasetId ].name;
		var objectsIds = [];
		let datasetsFeaturesToDownload = ArcheoCache.getTemporaryEntry('datasetsFeaturesToDownload');

		var features = ArcheoCache.getDataset(datasetId);
		features = ArcheoMap.readFeaturesAsGeoJSON( features );

		features.forEach((feature) => {
			objectsIds.push( feature.get('properties').id );
		});

		datasetsFeaturesToDownload[ datasetId ] = objectsIds;

		
		$('#downloadTitle').text(`Download dataset ${datasetName} features`);
		$('#download-modal').modal('show');
	});
}


function setNameTextBoxEvents(elementsDict, datasetId, datasetInfo) {
	/* Change layer name */
	elementsDict.nameTextbox.on('change', function(event) {
		var $textbox = $(event.target);
		var newDatasetName = $textbox.val();

		if( ArcheoUtilities.isValidNonEmptyString(newDatasetName) ) {
			ArcheoSession.get().datasets[ datasetId ].name = newDatasetName;

			elementsDict.headerText.html( newDatasetName );

			ArcheoEvents.broadcast("dataset-update", '#dataset-template');

			$textbox.trigger('blur');
		} else {
			let oldLayerName = datasetInfo.name;
			$textbox.val(oldLayerName);
		}
	});
}


function initializeNameTextbox(newDatasetElement, datasetId, datasetInfo) {
	let $header = newDatasetElement.find('.accordion-header .header-text');
	$header.html(datasetInfo.name);

	let $name = newDatasetElement.find('#dataset-name-textbox');
	$name.attr('id', `${datasetId}_dataset-name-textbox`);
    $name.val( datasetInfo.name );

	let elements = {
		'newDatasetElement': newDatasetElement,
		'nameTextbox': $name,
		'headerText': $header
	};

	setNameTextBoxEvents(elements, datasetId, datasetInfo);
}


function initializeMetadata(newDatasetElement, datasetId, datasetInfo) {
    let $dating = newDatasetElement.find('#dataset-dating');
	$dating.attr('id', `${datasetId}_dataset-dating`);
    if( ArcheoUtilities.isValid(datasetInfo.dating) )
        $dating.html( 
			ArcheoUtilities.getFormattedYear( datasetInfo.dating[0] ) + 
			' &mdash; ' + 
			ArcheoUtilities.getFormattedYear( datasetInfo.dating[1] )
			);
    else
        $dating.html( 'Present data' );

    let $size = newDatasetElement.find('#dataset-size');
	$size.attr('id', `${datasetId}_dataset-size`);

	if(datasetInfo.samplingRatio < 1) {
		let sampledFeaturesCount = Math.ceil(datasetInfo.size * datasetInfo.samplingRatio);
		$size.html(`${sampledFeaturesCount} of ${datasetInfo.size}`);
	} 
	else
    	$size.html( datasetInfo.size );

		

	// Math.ceil(array.length * ratio)

    let $objectType = newDatasetElement.find('#dataset-object-type');
	$objectType.attr('id', `${datasetId}_dataset-object-type`);
    $objectType.html( datasetInfo.entityName );

    let $database = newDatasetElement.find('#dataset-database');
	$database.attr('id', `${datasetId}_dataset-database`);
    $database.html( datasetInfo.databaseName );
}


function setQueryTextboxEvents(elementsDict, datasetId, datasetInfo) {
	/* Change layer name */
	elementsDict.copyButt.on('click', function(event) {
		ArcheoUI.copyToClipboard(elementsDict.queryTextbox, 'JSON');

		let $label = elementsDict.copyButt.find('.label');
		$label.text('Copied');

		setTimeout(function() {
			$label.text('Copy');
		}, 1000);
	});
}


function initializeQueryTextbox(newDatasetElement, datasetId, datasetInfo) {
	let $query = newDatasetElement.find('#dataset-query-textarea');
	$query.attr('id', `${datasetId}_dataset-query-textarea`);
    $query.val( 
		JSON.stringify(
			JSON.parse(datasetInfo.query),
			null, 1
		)
	);

	let $copyButt = newDatasetElement.find('#dataset-copy-query');
	$copyButt.attr('id', `${datasetId}_dataset-copy-query`);

	let elements = {
		'newDatasetElement': newDatasetElement,
		'queryTextbox': $query,
		'copyButt': $copyButt
	};

	setQueryTextboxEvents(elements, datasetId, datasetInfo);
}


function initializeSamplingEvents(elements, datasetId, datasetInfo) {
	/* Sampling slider events */
	var eventFunction = async function(data) {
		ArcheoSession.get().datasets[ datasetId ].samplingRatio = data.from / 100;
	};
	let updateDict = {};

	updateDict.onFinish = eventFunction;
	updateDict.onUpdate = eventFunction;

	elements.samplingSizeSlider.update(updateDict);

	/* Sampling button events */
	elements.sampleButton.on('click', function() {
		let samplingRatio = ArcheoSession.get().datasets[datasetId].samplingRatio;

		let sampledFeatures = MapUtilities.loadAllData(datasetId, samplingRatio);

		ArcheoEvents.broadcast('dataset-sampled', null, {datasetId: datasetId});

		let featuresCount = ArcheoSession.get().datasets[datasetId].size;
		let sampledFeaturesCount = sampledFeatures.length;
		
		if(samplingRatio < 1.0) {
			/* Update sampling message */
			elements.samplingMessageText.text(`Sampled ${sampledFeaturesCount} of ${featuresCount} features`);

			/* Update features count info */
			$(`#${datasetId}_dataset-size`).text(`${sampledFeaturesCount} of ${featuresCount}`)
		}
		else {
			elements.samplingMessageText.text('');

			$(`#${datasetId}_dataset-size`).text(featuresCount)
		}
	});

	/* Shuffling button events */
	elements.shuffleButton.on('click', function() {
		let samplingRatio = ArcheoSession.get().datasets[datasetId].samplingRatio;

		ArcheoEvents.broadcast('dataset-shuffled', null, {datasetId: datasetId});
		MapUtilities.loadAllData(datasetId, samplingRatio, true);
	});
}


function initializeSampling(newDatasetElement, datasetId, datasetInfo) {
	let datasetConfig = ArcheoSession.get().datasets[datasetId];

	/* Labels size ratio */
	var samplingSizeSliderId = datasetId + '_dataset-sample-size-slider';
	var $samplingSizeSlider = newDatasetElement.find('#dataset-sample-size-slider');

	$samplingSizeSlider.attr('name', samplingSizeSliderId);
	$samplingSizeSlider.attr('id', samplingSizeSliderId);

	var samplingSizeSliderObj = ArcheoUI.initializeSlider($samplingSizeSlider, {
		min: 0,
		max: 100,
		from: datasetConfig.samplingRatio * 100,
		step: 0.1,
		type: 'single',
		postfix: '%',
		extra_classes: 'dataset-sample-size-slider'
	});

	/* Sample button */
	var $sampleButton = newDatasetElement.find('.sample-button');
	var $samplingMessageText = newDatasetElement.find('.sampling-message-text');

	/* Shuffle button */
	var $shuffleButton = newDatasetElement.find('.shuffle-button');

	let elements = {
		'newDatasetElement': newDatasetElement,
		'sampleButton': $sampleButton,
		'shuffleButton': $shuffleButton,
		'samplingMessageText': $samplingMessageText,
		'samplingSizeSlider': samplingSizeSliderObj
	};

	initializeSamplingEvents(elements, datasetId, datasetInfo);
}


function initializeTooltips(newDatasetElement, datasetId) {
	newDatasetElement.find('.archeo-tooltip').each(function() {
        let tooltipId = $(this).attr('tooltip-id');
        let text = window.dictionary.tooltips[tooltipId];

        tippy(this, {
            content: text,
            interactive: true,
            appendTo: () => document.body
        });
    });
}


function createDatasetElement(datasetId) {
	return new Promise((resolution, rejection) => {

		let newDatasetElement = $(`#dataset-template`).clone();
		/* Assign new dataset id */
		newDatasetElement.attr('id', datasetId);
		newDatasetElement.find('.accordion-header').attr('data-target', `#${datasetId}-accordion`);
		newDatasetElement.find('.collapse').attr('id', `${datasetId}-accordion`);

		/* Initialize elements */
		initializeDownloadButton(newDatasetElement, datasetId);

		let datasetInfo = ArcheoSession.get().datasets[ datasetId ];

		initializeNameTextbox(newDatasetElement, datasetId, datasetInfo);
		initializeMetadata(newDatasetElement, datasetId, datasetInfo);
		initializeQueryTextbox(newDatasetElement, datasetId, datasetInfo);
		initializeSampling(newDatasetElement, datasetId, datasetInfo);

		initializeTooltips(newDatasetElement, datasetId);

		newDatasetElement.appendTo('#datasets-container');
		newDatasetElement.css('display', 'block');

		resolution(true);
	})
}


function fetchNewDataset(datasetId) {
	return new Promise((resolution, rejection) => {
		let queryString = ArcheoSession.get().datasets[ datasetId ].query;

		getMapFeatures(queryString)
		.then((features) => {

			if( ArcheoUtilities.isValid(features) ) {
				if(features.length > 0) {
					let dating = ArcheoUtilities.getDatasetDating(features);
			
					/* Save to the cache loaded features */
					let geojsonFeatures = ArcheoMap.parseFeaturesToGeoJSON(features);
			
					ArcheoCache.addDataset(datasetId, geojsonFeatures);
			
					ArcheoSession.get().datasets[ datasetId ].dating = dating;
					ArcheoSession.get().datasets[ datasetId ].size = features.length;
					ArcheoSession.get().datasets[ datasetId ].isPresent = !ArcheoUtilities.isValid(dating);
			
					resolution(true);
				}
				else {
					rejection({text: "Dataset has not been loaded as no data match given query.", details: null, status: "warning"});
				}
			}
			else {
				rejection({text: "Dataset has not been loaded due to database connection error.", details: null, status: "error"});
			}
		})
		.catch((errorMessage) => {	
			rejection({text: "Dataset has not been loaded due to database connection error. Check browser console for details.", details: errorMessage, "status": "error"});
		});

	});
}


function broadcastDatasetCreation(datasetId) {
	createDatasetElement(datasetId).then((result) => {
		if(result === true) {
			ArcheoEvents.broadcast("dataset-add", null, {
				datasetId: datasetId
			});
		}
	});

	/*ArcheoEvents.broadcast("dataset-update", '#layer-template', {
		datasetId: datasetId
	});*/
}


export {
	broadcastDatasetCreation,
	fetchNewDataset,
	initializeSamplingEvents,
	initializeTooltips
}