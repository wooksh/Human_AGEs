import { 
    initializeSamplingEvents,
    initializeTooltips
} from '../datasets/new-dataset/initialize-dataset';


import {
	initializeUserAttributeLegend
} from './utilities';


const visualizationRestrictedAttributes = {
	"sample_id": true,
	"latitude": true,
	"longitude": true,
	"projection": true,
	"dating_from": true,
	"dating_to": true,
	"place_name": true,

	"regions_cultural": true,
	"divisions_political": true,
	"divisions_geographical": true,
	"regions_geographical": true,
	"divisions_cultural": true,
	"regions_political": true,
	"dataset_name": true
};


function setNameTextBoxEvents(elementsDict, datasetId, datasetInfo) {
	/* Change layer name */
	elementsDict.nameTextbox.on('change', function(event) {
		var $textbox = $(event.target);
		var newDatasetName = $textbox.val();

		if( ArcheoUtilities.isValidNonEmptyString(newDatasetName) ) {
			ArcheoSession.get().datasets[ datasetId ].name = newDatasetName;

			elementsDict.headerText.html( newDatasetName );

			ArcheoEvents.broadcast("dataset-update", '#user-dataset-template');

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

	let $name = newDatasetElement.find('#user-dataset-name-textbox');
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
    let $dating = newDatasetElement.find('#user-dataset-dating');
	$dating.attr('id', `${datasetId}_dataset-dating`);
    if( ArcheoUtilities.isValid(datasetInfo.dating) )
        $dating.html( 
			ArcheoUtilities.getFormattedYear( datasetInfo.dating[0] ) + 
			' &mdash; ' + 
			ArcheoUtilities.getFormattedYear( datasetInfo.dating[1] )
			);
    else
        $dating.html( 'Present data' );

    let $size = newDatasetElement.find('#user-dataset-size');
	$size.attr('id', `${datasetId}_dataset-size`);

	if(datasetInfo.samplingRatio < 1) {
		let sampledFeaturesCount = Math.ceil(datasetInfo.size * datasetInfo.samplingRatio);
		$size.html(`${sampledFeaturesCount} of ${datasetInfo.size}`);
	} 
	else
    	$size.html( datasetInfo.size );
}


function initializeSampling(newDatasetElement, datasetId, datasetInfo) {
	let datasetConfig = ArcheoSession.get().datasets[datasetId];

	/* Labels size ratio */
	var samplingSizeSliderId = datasetId + '_user-dataset-sample-size-slider';
	var $samplingSizeSlider = newDatasetElement.find('#user-dataset-sample-size-slider');

	$samplingSizeSlider.attr('name', samplingSizeSliderId);
	$samplingSizeSlider.attr('id', samplingSizeSliderId);

	var samplingSizeSliderObj = ArcheoUI.initializeSlider($samplingSizeSlider, {
		min: 0,
		max: 100,
		from: datasetConfig.samplingRatio * 100,
		step: 0.1,
		type: 'single',
		postfix: '%',
		extra_classes: 'user-dataset-sample-size-slider'
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


function createUserDatasetElement(datasetId) {
	return new Promise((resolution, rejection) => {

		let newDatasetElement = $(`#user-dataset-template`).clone();
		/* Assign new dataset id */
		newDatasetElement.attr('id', datasetId);
		newDatasetElement.find('.accordion-header').attr('data-target', `#${datasetId}-accordion`);
		newDatasetElement.find('.collapse').attr('id', `${datasetId}-accordion`);

		/* Initialize elements */
		let datasetInfo = ArcheoSession.get().datasets[ datasetId ];

		initializeNameTextbox(newDatasetElement, datasetId, datasetInfo);
		initializeMetadata(newDatasetElement, datasetId, datasetInfo);
		initializeSampling(newDatasetElement, datasetId, datasetInfo);
		initializeTooltips(newDatasetElement, datasetId);

		newDatasetElement.appendTo('#datasets-container');
		newDatasetElement.css('display', 'block');

		resolution(true);
	})
}


function userInputEvents() {
    $('#load-user-data').on('click', function(event) {
        $('#user-data-load-input').trigger('click');
    });


    $('#user-data-load-input').on('change', function(event) {
        ArcheoUtilities.setButtonLoading('#load-user-data');

        let input = event.target;
        let file = input.files[0];
        let features = [];
        let data = [];

        let extension = file.name.split(".").getLast().toLowerCase();
        let fileName = file.name.split(".").getFirst();

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = function (evt) {                
                if(extension == "json") {
                    data = JSON.parse( evt.target.result );
                }
                else if(extension == "csv") {
                    //let rows = evt.target.result.split("\n");
                    data = ArcheoUtilities.csvToJSON(evt.target.result);
                }

                features = ArcheoMap.createUserFeatures( 
                    data,
                    ArcheoSession.get().map.mapProjection
                );

                if(ArcheoUtilities.isValid(features) && features.length > 0) {
                    let datasetId = ArcheoSession.addCustomDataset(fileName);

                    let dating = ArcheoUtilities.getDatasetDating(features);
			
					/* Save to the cache loaded features */
					let geojsonFeatures = ArcheoMap.parseFeaturesToGeoJSON(features);
					ArcheoCache.addDataset(datasetId, geojsonFeatures);
			
					ArcheoSession.get().datasets[ datasetId ].dating = dating;
					ArcheoSession.get().datasets[ datasetId ].size = features.length;
					ArcheoSession.get().datasets[ datasetId ].isPresent = !ArcheoUtilities.isValid(dating);
					let attributesDict = {}

					console.log(`BEFORE!!!`);
					console.log(`data!!!`);
					console.log(data);

                    Object.keys(data[0]).forEach((attributeName) => {
						let attributeId = attributeName.split('-')[0];

						console.log(`POP!!! attributeName ${attributeName} attributeId ${attributeId}`);
						if(!(attributeName in visualizationRestrictedAttributes)) {
							attributesDict[attributeId] = {
								"name": attributeName.split('-')[0].split('_').join(' ').capitalize(),
								"entity": attributeId,
								"type": attributeName.split('-')[1] || undefined,
								"visible": true
							}

							initializeUserAttributeLegend(attributeName, features);
						}
                    });
					ArcheoSession.get().datasets[ datasetId ].attributesDict = attributesDict;

					ArcheoLegend.initializeAttributionsSections("#legend-content", {"custom": attributesDict});

                    broadcastUserDatasetCreation(datasetId);

					/* Expand clustering and filtering options to the custom attributes */
					let allAttributes = MapUtilities.getAttributesDict();
					let newSelectAttributesDict = {...attributesDict, ...allAttributes};
					ArcheoUI.setSelectpicker( $('#select-cluster-attribute'), newSelectAttributesDict, true );
					ArcheoUI.setSelectpicker( $('#select-filter-attribute'), newSelectAttributesDict, true );
                }

                //rejection({text: "Dataset has not been loaded due to database connection error.", details: null, status: "error"});
    
                //let sessionId = ArcheoCache.addSession(importedSession);
                //if(sessionId !== false) {
                //    initializeSessionModal('import-session', sessionId);
                //
                //    $('#user-data-load-error-text').html("");
                //} else
                //    $('#user-data-load-error-text').html("Couldn't import the dataset. Propably the imported file is corrupted. Please make sure, that you are using valid file format and attribute names.");
            
                ArcheoUtilities.setButtonLoaded('#load-user-data');
            }

            reader.onerror = function (evt) {
                alert("Unfortunately, you can't import the file, because your browser does not support FileAPI. Please update your browser to the newest version.");
            }
        }
    });
}


function broadcastUserDatasetCreation(datasetId) {
	createUserDatasetElement(datasetId).then((result) => {
		if(result === true) {
			ArcheoEvents.broadcast("dataset-add", null, {
				datasetId: datasetId
			});
		}
	});
}


export default userInputEvents;