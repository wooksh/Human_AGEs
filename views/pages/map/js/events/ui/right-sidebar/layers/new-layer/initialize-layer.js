import attributes from 'Pages/map/data/attributes.json';
import attributesTypes from 'Pages/map/data/attributesTypes.json';
import defaultGroups from 'Pages/map/data/groups.json';

import tinygradient from 'tinygradient';

import { 
	layerConfigSliderEventSetup, 
	layerColorToggleCheckboxEventSetup, 
	layerSettingSliderEventSetup,
	layerConfigSelectEventSetup,
	sizeSliderSettingSetup,
	layerConfigColorPickEventSetup,
	layerConfigGradientPickEventSetup,
	layerConfigRadiobuttonEventSetup,
	layerAngleEventSetup,
	layerConfigSpinnerEventSetup,
	layerConfigCheckboxEventSetup
} from './utilities';


import { 
	setPointSettings,
	setPiechartSettings,
	setHeatmapSettings,
	setTagSettings
} from './initialize-layer-types-settings.js';


import setComponentsSettings from './components/index.js';


function setLayerAccordion(newLayerElement, layerId) {
	/* Assign meta */
	newLayerElement.find('.layer-header > .header-text').html(
		ArcheoSession.get().layers[ layerId ].settings.title
	);

	/* Assign correct id to all accordions */
	newLayerElement.find(`[data-target="#layer-template-accordion"]`).attr('data-target', `#${layerId}-accordion`);
	newLayerElement.find('#layer-template-accordion').attr('id', `${layerId}-accordion`);
}


function setSettingsAccordion(newLayerElement, layerId) {
	/* Layer type accordion */
	newLayerElement.find(`[data-target="#layer-type-settings"]`).attr('data-target', `#${layerId}-accordion-type-settings`);
	newLayerElement.find('#layer-type-settings').attr('id', `${layerId}-accordion-type-settings`);

	/* Appearance accordion */
	newLayerElement.find(`[data-target="#layer-visibility-settings"]`).attr('data-target', `#${layerId}-accordion-layer-visibility-settings`);
	newLayerElement.find('#layer-visibility-settings').attr('id', `${layerId}-accordion-layer-visibility-settings`);

	/* Position accordion */
	newLayerElement.find(`[data-target="#features-position"]`).attr('data-target', `#${layerId}-accordion-features-position`);
	newLayerElement.find('#features-position').attr('id', `${layerId}-accordion-features-position`);

	/* Features size accordion */
	newLayerElement.find(`[data-target="#features-size"]`).attr('data-target', `#${layerId}-accordion-features-size`);
	newLayerElement.find('#features-size').attr('id', `${layerId}-accordion-features-size`);

	/* Layer weight accordion */
	newLayerElement.find(`[data-target="#layer-weight"]`).attr('data-target', `#${layerId}-accordion-layer-weight`);
	newLayerElement.find('#layer-weight').attr('id', `${layerId}-accordion-layer-weight`);

	/* Components accordion */
	newLayerElement.find(`[data-target="#values-settings"]`).attr('data-target', `#${layerId}-accordion-values-settings`);
	newLayerElement.find('#values-settings').attr('id', `${layerId}-accordion-values-settings`);
}


function setGeneralSettingsEvents(elementsDict, layerId) {
	/* Change layer name */
	elementsDict.layerNameTextbox.on('change', function(event) {
		var $textbox = $(event.target);
		var newLayerName = $textbox.val();

		if( ArcheoUtilities.isValidNonEmptyString(newLayerName) ) {
			//ArcheoSession.get().layers[ layerId ].settings.title = newLayerName;

			elementsDict.layerHeaderTextElement.html( newLayerName );

			ArcheoEvents.broadcast('layer-name-change', null, {
				layerId: layerId,
				value: newLayerName
			});

			ArcheoEvents.broadcast('layer-setting-change', null, {
				layerId: layerId,
				setting: 'title',
				value: newLayerName
			});

			$textbox.trigger('blur');
		} else {
			let oldLayerName = ArcheoSession.get().layers[ layerId ].settings.title;
			$textbox.val(oldLayerName);
		}
	});

	/* Change layer type */
	elementsDict.layerTypeSelect.on('changed.bs.select', function (event) {
		var $select = $(event.target);
		let layerType = $select.val();
		let layerTypeName = $select.find(':selected').text();
		let layerConfig = ArcheoSession.get().layers[layerId];

		ArcheoSession.get().layers[ layerId ].type = layerType;

		/* Show layer type settings */
		elementsDict.layerElement.find('.type-settings').addClass('d-none');
		elementsDict.layerElement.find(`.${layerType}-settings`).removeClass('d-none');

		/* Change type settings header text */
		let $layerSettings = elementsDict.layerElement.find(`.layer-type-settings`);
		if(ArcheoUtilities.isValidNonEmptyString(layerTypeName)) {
			$layerSettings.find(`.header-text`).text(`${layerTypeName} settings`);
			$layerSettings.removeClass('hidden');
		} else
			$layerSettings.addClass('hidden');

		if( layerType === 'heatmap' ) {
			/* Weight appearance */
			elementsDict.layerElement.find('.weight-appearance-wrapper').hide();
			/* Color toggle */
			elementsDict.layerElement.find('.layer-color-toggle-wrapper').hide();
			elementsDict.layerElement.find('.layer-name-toggle-wrapper').hide();
			/* Show proper color settings */
			elementsDict.layerElement.find('.layer-color-input').hide();
			elementsDict.layerElement.find('.layer-color-pointer-options').hide();

			elementsDict.layerElement.find('.gradient-input-wrapper').show();//('d-none');
			/* Change to type's default blending mode */
			elementsDict.layerElement.find('.select-layer-blending-mode').selectpicker('val', 'screen');
			/* Hide Postion and Size setting, as they are unapplicable to the heatmap */
			elementsDict.layerElement.find('.features-position-settings').hide();
			elementsDict.layerElement.find('.features-size-settings').hide();
		} else {
			/* Weight appearance */
			elementsDict.layerElement.find('.weight-appearance-wrapper').show();
			/* Color toggle */
			elementsDict.layerElement.find('.layer-color-toggle-wrapper').show();
			elementsDict.layerElement.find('.layer-name-toggle-wrapper').show();
			/* Show proper color settings */
			elementsDict.layerElement.find('.gradient-input-wrapper').hide();
			elementsDict.layerElement.find('.layer-color-input').show();
			elementsDict.layerElement.find('.layer-color-pointer-options').show();

			/* Change to type's default blending mode */
			elementsDict.layerElement.find('.select-layer-blending-mode').selectpicker('val', 'normal');
			/* Show Postion and Size setting */
			elementsDict.layerElement.find('.features-position-settings').show();
			elementsDict.layerElement.find('.features-size-settings').show();
		}

		ArcheoEvents.broadcast('layer-type-change', null, {
			layerId: layerId,
			value: layerType
		});
	});

	/* Change layer attribute */
	const attributeChangeEventFunction = function(event, data) {
		let $select = $(event.target);

		let attributeId = $select.val();
		let attributeType = $select.find(':selected').attr('type');

		let layerConfig = ArcheoSession.get().layers[layerId];

		let datasetId;
		if(event.type === 'layer-dataset-change') {
			attributeId = layerConfig.attributeId;
			attributeType = layerConfig.attributeType;
			datasetId = data.datasetId;

			if(data.layerId !== layerId)
				return;

			if( elementsDict.attributeTypeSelect.is(event.target) ) {
				if(!(attributeType in attributesTypes) || !(attributeId in attributesTypes[attributeType]))
					return;
			}
			else if( elementsDict.attributeSelect.is(event.target) ) {
				if(attributeType in attributesTypes && attributeId in attributesTypes[attributeType])
					return;
			}
		}
		else {
			datasetId = ArcheoSession.get().layers[ layerId ].datasetId;
		}

		//alert(`attributeId 0 ${attributeId} attributeType 0 ${attributeType}`);
		if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {

			if( ArcheoUtilities.isValidNonEmptyString(datasetId) ) {
				let params = {
					layerId: layerId,
					attributeId: attributeId,
					attributeType: attributeType,
					datasetId: datasetId,
					eventType: event.type
				}; 

				ArcheoRequests.incorporateAttributes(params).then((isSuccess) => {
					if(isSuccess === true) {
						ArcheoEvents.broadcast('attribute-fetched', null, {
							datasetId: datasetId,
							layerId: layerId
						});
					}

					$select.trigger('update-ui', params);
				});
			}
		}
		else {
			if( elementsDict.attributeSelect.is(event.target) ) {
				let layer = ArcheoMap.getLayer( layerId );

				ArcheoMap.setLayerConfig(layer, {
					attributeId: attributeId,
					attributeType: attributeType
				});
		
				ArcheoMap.refreshLayer(layerId);
			}
		}
	};

	const updateUI = async function (event, data) {
		if(data.layerId === layerId) {
			let layerConfig = ArcheoSession.get().layers[layerId];

			var $select = $(event.target);
			let attributeId = $select.val();
			let attributeType = $select.find(':selected').attr('type');

			let doesFilterChangeConcernsThisLayer = data.attributeId === attributeId;

			if(doesFilterChangeConcernsThisLayer === true) {
				let typesWrapper = $select.parent().next();
				let params = {layerId: layerId, eventType: data.eventType};

				if(attributeId in attributesTypes) {
					typesWrapper.removeClass('d-none');					
					
					//ArcheoUI.setSelectpicker( elementsDict.attributeSelect, attributeType, false );
					ArcheoUI.setSelectpicker( elementsDict.attributeTypeSelect, attributesTypes[attributeType], true );

					return;
				}
				else {
					typesWrapper.addClass('d-none');
				}

				if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
					let attributeType = $select.find(`option[value=${attributeId}]`).attr("type") || 'value';
					let attributeTitle = $select.find(`option[value=${attributeId}]`).text();
			
					params = {
						...params,
						attributeId: attributeId,
						attributeName: attributeTitle,
						attributeType: attributeType
					};

					if(attributeType === "admixture")
						elementsDict.layerElement.find('.piechart-label-percent').hide();
					else
						elementsDict.layerElement.find('.piechart-label-percent').show();
				}

				//if(data.eventType !== 'layer-initialization' && data.eventType !== 'layer-dataset-change') {
				if(data.eventType !== 'layer-dataset-change') {
					/* Reset filtering on new attribute select */
					layerConfig.style.componentValues.data = "selectAll";
					ArcheoEvents.broadcast('layer-attribute-change', null, params);
				} else {
					elementsDict.layerElement.find('select.select-value').trigger('layer-initialization', params);
					ArcheoMap.getMapSources()[data.datasetId].changed();
				}
			}
		}
	}

	/* Change layer attribute */
	//elementsDict.attributeSelect.on('changed.bs.select update layer-initialization', attributeChangeEventFunction);
	elementsDict.attributeSelect.on('changed.bs.select update layer-dataset-change', attributeChangeEventFunction);
	elementsDict.attributeSelect.on('update-ui dataset-remove', updateUI);

	/* Change layer attribute type if available */
	//elementsDict.attributeTypeSelect.on('changed.bs.select update layer-initialization', attributeChangeEventFunction);
	elementsDict.attributeTypeSelect.on('changed.bs.select update layer-dataset-change', attributeChangeEventFunction);
	elementsDict.attributeTypeSelect.on('update-ui dataset-remove', updateUI);

	/* Change dataset */
	elementsDict.datasetSelect.on('changed.bs.select layer-initialization', function (event, data) {
		if(event.type === 'layer-initialization' && layerId !== data.layerId)
			return;

		let layerConfig = ArcheoMap.getLayerConfigById(layerId);

		var $select = $(event.target);

		let datasetId;
		if(event.type === "layer-initialization") {
			datasetId = layerConfig.datasetId;
		}
		else {
			datasetId = $select.val();
			ArcheoSession.get().layers[ layerId ].datasetId = datasetId;
		}

		ArcheoEvents.broadcast('layer-dataset-change', null, {
			layerId: layerId,
			datasetId: datasetId
		});

		if( ArcheoUtilities.isValidNonEmptyString(datasetId) ) {
			let dataset = ArcheoSession.get().datasets[ datasetId ];
			let isDatasetCustom = dataset.isCustom;

			console.log("VIS dataset dataset");
			console.log(dataset);

			let attributeId = layerConfig.attributeId;
			let attributeType = layerConfig.attributeType;
			
			if( ! ArcheoUtilities.isValid(isDatasetCustom)) {
				let objectId = dataset.objectId;

				if(event.type === "layer-initialization") {
					/* Attribute which has subtypes */
					if(attributeType in attributesTypes && attributeId in attributesTypes[attributeType]) {
						ArcheoUI.setSelectpicker( elementsDict.attributeSelect, attributes[objectId], true );
						ArcheoUI.setSelectpicker( elementsDict.attributeTypeSelect, attributesTypes[attributeType], true );

						ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeType);
						ArcheoUI.setSelectValue(elementsDict.attributeTypeSelect, attributeId);

						let typesWrapper = elementsDict.attributeTypeSelect.parent().parent();
						typesWrapper.removeClass('d-none');
					} 
					/* Normal attribute */
					else {
						ArcheoUI.setSelectpicker( elementsDict.attributeSelect, attributes[objectId], true );
						ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
					}
				}
				else {
					ArcheoUI.setSelectpicker( elementsDict.attributeSelect, attributes[objectId], true );
					ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
				}
			}
			else {
				ArcheoUI.setSelectpicker( elementsDict.attributeSelect, dataset.attributesDict, true );
				ArcheoUI.setSelectValueNoEvent(elementsDict.attributeSelect, attributeId);
			}
		}
		else {
			ArcheoUI.setSelectpicker( elementsDict.attributeSelect, {}, true );
		}
	});
}


function setGeneralSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Layer name textbox */
	var layerHeaderTextElement = newLayerElement.find('.layer-header > .header-text');

	var layerNameTextboxId = layerId + '_layer-name-textbox';
	var layerNameTextbox = newLayerElement.find('#layer-name-textbox');
	layerNameTextbox.attr('id', layerNameTextboxId);

	// Initialize
	layerNameTextbox.val(ArcheoSession.get().layers[ layerId ].settings.title );

	/* Layer dataset select */
	var datasetSelectId = layerId + '_select-layer-dataset';
	var $datasetSelect = newLayerElement.find('#select-layer-dataset');
	$datasetSelect.attr('id', datasetSelectId);
	let $datasetSelectpicker = $datasetSelect.selectpicker();

	/* Layer attribute select */ 
	var attributeSelectId = layerId + '_select-attribute';
	var $attributeSelect = newLayerElement.find('#select-attribute');
	$attributeSelect.attr('id', attributeSelectId);
	$attributeSelect.selectpicker();

	/* Layer attribute type select */ 
	var attributeTypeSelectId = layerId + '_select-attribute-type';
	var $attributeTypeSelect = newLayerElement.find('#select-attribute-type');
	$attributeTypeSelect.attr('id', attributeTypeSelectId);
	$attributeTypeSelect.selectpicker();

	/* Layer type select */
	var layerTypeSelectId = layerId + '_select-layer-type';
	var $layerTypeSelect = newLayerElement.find('#select-layer-type');
	$layerTypeSelect.attr('id', layerTypeSelectId);
	$layerTypeSelect.selectpicker();

	let elements = {
		'layerElement': newLayerElement,
		'layerHeaderTextElement': layerHeaderTextElement,
		'layerNameTextbox': layerNameTextbox,
		'layerTypeSelect': $layerTypeSelect,
		'attributeSelect': $attributeSelect,
		'attributeTypeSelect': $attributeTypeSelect,
		'datasetSelect': $datasetSelect
	};

	setGeneralSettingsEvents(elements, layerId);

	/* Initialize layer type selectpicker */
	$layerTypeSelect.selectpicker('val', layerConfig.type);
	//$attributeSelect.selectpicker('val', layerConfig.attributeId);

	/* Initialize dataset and attribute selectpicker by triggering dataset change event */
	ArcheoEvents.broadcast('dataset-update', null, {layerId: layerId});
	//$datasetSelectpicker.selectpicker('val', layerConfig.datasetId);
	//ArcheoUI.setSelectValueNoEvent($datasetSelectpicker, layerConfig.datasetId);


	return elements;
}


function setVisibilitySettingsEvents(elementsDict, layerId) {
	/* Change visibility setting */
	elementsDict.layerVisibilityButt.on('click', function(event) {
		/* The button status will be changed only after click event, thus negation */
		var isToggled = ! $(event.target).hasClass('active'); // negation applied on purpose

		ArcheoEvents.broadcast(['layer-setting-change', 'layer-visibility-change'], null, {
			layerId: layerId,
			setting: 'visible',
			value: isToggled
		});

		ArcheoMap.triggerLayerStyleFunction();
	});

	/* Change opacity setting */
	layerConfigSliderEventSetup(elementsDict.opacitySlider, layerId, null, 'drawingAlpha', 'onFinish');

	/* Change blending mode */
	layerConfigSelectEventSetup(elementsDict.layerBlendingModeSelect, layerId, null, 'blendingMode');

	/* Change color */
	layerConfigColorPickEventSetup(elementsDict.layerColorInput, layerId, /* notLayerType */ 'heatmap', 'move');

	/* Toggle layer name */
	layerConfigCheckboxEventSetup(elementsDict.layerNameToggleCheckbox, layerId, null, 'layerNameToggle');

	/* Toggle color */
	layerColorToggleCheckboxEventSetup(elementsDict.layerColorToggleCheckbox, layerId, null, 'colorToggle');
	// layer-visibility-change
	// ArcheoMap.triggerLayerStyleFunction( ArcheoMap.getRegionsLayer() );

	/* Toggle color */
	layerColorToggleCheckboxEventSetup(elementsDict.layerPointerToggleCheckbox, layerId, null, 'pointerToggle');
	
	/* Change gradient */
	layerConfigGradientPickEventSetup(elementsDict.gradientInput, layerId, 'heatmap');
}


function setVisibilitySettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Visibility button */
	let layerVisibilityButt = newLayerElement.find('#visibility');
	layerVisibilityButt.attr('id', `${layerId}_visibility`);
	layerVisibilityButt.next().attr('for', `${layerId}_visibility`);

	// Initialize
	ArcheoUI.toggleCheckbox(layerVisibilityButt, layerConfig.settings.visible);

	/* Opacity slider */
	var opacitySliderId = layerId + '_layer-opacity';
	var $opacitySlider = newLayerElement.find('#layer-opacity');

	$opacitySlider.attr('name', opacitySliderId);
	$opacitySlider.attr('id', opacitySliderId);

	var opacitySliderObj = ArcheoUI.initializeSlider($opacitySlider, {
		min: .0,
		max: 1.,
		from: layerConfig.style.drawingAlpha,
		step: 0.01,
		type: 'single',
		prettify: (val) => { return Math.round(val * 100) + '%'; },
	});

	var layerNumber = ArcheoSession.get().layers._counter - 1;

	/* Toggle layer name */
	var layerNameToggleCheckboxId = layerId + '_layer-name-toggle';
	var $layerNameToggleCheckbox = newLayerElement.find('#layer-name-toggle');

	$layerNameToggleCheckbox.attr('name', layerNameToggleCheckboxId);
	$layerNameToggleCheckbox.attr('id', layerNameToggleCheckboxId);

	if( layerConfig.style.layerNameToggle )
		$layerNameToggleCheckbox.addClass('active');
	else
		$layerNameToggleCheckbox.removeClass('active');

	/* Body Color */
	var layerColorInputId = layerId + '_layer-color-input';
	var $layerColorInput = newLayerElement.find('#layer-color-input');
	$layerColorInput.attr('id', layerColorInputId);

	if( ArcheoUtilities.isValidNonEmptyString(layerConfig.style.color) )
		ArcheoUI.initializeColorInput($layerColorInput, {
			color: layerConfig.style.color,
			palette: 'layer'
		}, layerNumber);
	else
		ArcheoUI.initializeColorInput($layerColorInput, {palette: 'layer'}, layerNumber);

	/* Body Toggle color */
	var layerColorToggleCheckboxId = layerId + '_layer-color-toggle';
	var $layerColorToggleCheckbox = newLayerElement.find('#layer-color-toggle');

	$layerColorToggleCheckbox.attr('name', layerColorToggleCheckboxId);
	$layerColorToggleCheckbox.attr('id', layerColorToggleCheckboxId);

	if( layerConfig.style.colorToggle )
		$layerColorToggleCheckbox.addClass('active');
	else
		$layerColorToggleCheckbox.removeClass('active');

	/* Pointer Toggle */
	var layerPointerToggleCheckboxId = layerId + '_layer-pointer-toggle';
	var $layerPointerToggleCheckbox = newLayerElement.find('#layer-pointer-toggle');

	$layerPointerToggleCheckbox.attr('name', layerPointerToggleCheckboxId);
	$layerPointerToggleCheckbox.attr('id', layerPointerToggleCheckboxId);

	if( layerConfig.style.pointerToggle )
		$layerPointerToggleCheckbox.addClass('active');
	else
		$layerPointerToggleCheckbox.removeClass('active');

	/* Gradient */
	var layerGradientInputId = layerId + '_layer-gradient-input';
	var $layerGradientInput = newLayerElement.find('#layer-gradient-input');
	$layerGradientInput.attr('id', layerGradientInputId);

	var gradientInputObj = ArcheoUI.initializeGradientInput($layerGradientInput);

	/* Decide whether show single color or gradient options */
	/*if( ArcheoUtilities.isArray(layerConfig.style.color) ) {
		$layerColorInput.addClass('d-none');
		$layerGradientInput.parent().removeClass('d-none');
	} else {
		$layerColorInput.removeClass('d-none');
		$layerGradientInput.parent().addClass('d-none');
	}*/

	/* Layer type select */
	var layerBlendingModeSelectId = layerId + '_select-layer-blending-mode';
	var $layerBlendingModeSelect = newLayerElement.find('#select-layer-blending-mode');
	$layerBlendingModeSelect.attr('id', layerBlendingModeSelectId);
	$layerBlendingModeSelect.selectpicker();
	$layerBlendingModeSelect.selectpicker('val', layerConfig.style.blendingMode);


	setVisibilitySettingsEvents({
		'layerElement': newLayerElement,
		'opacitySlider': opacitySliderObj,
		'layerBlendingModeSelect': $layerBlendingModeSelect,
		'layerColorInput': $layerColorInput,
		'gradientInput': gradientInputObj,
		'layerVisibilityButt': layerVisibilityButt,
		'layerColorToggleCheckbox': $layerColorToggleCheckbox,
		'layerPointerToggleCheckbox': $layerPointerToggleCheckbox,

		'layerNameToggleCheckbox': $layerNameToggleCheckbox
	}, layerId);

	// Initialize
	$layerColorToggleCheckbox.trigger('update');

	// Initialize gradient
	var newGradient;
	if(ArcheoUtilities.isValid(layerConfig.style.gradient))
		newGradient = ArcheoUI.setGradientValue(gradientInputObj, layerConfig.style.gradient, layerNumber);
	else 
		newGradient = ArcheoUI.setGradientValue(gradientInputObj, null, layerNumber);

	/* Save default color to the session */
	//layerConfig.style.gradient = newGradient;
}


function setSizeSettingsEvents(elementsDict, layerId) {
	/* Change size setting */
	layerConfigSliderEventSetup(elementsDict.sizeSlider, layerId, null, 'size', 'onFinish');
	//layerSettingSliderEventSetup(elementsDict.sizeSlider, layerId, null, 'radius', 'onFinish');

	/* Change font size setting */
	layerConfigSliderEventSetup(elementsDict.fontSlider, layerId, null, 'fontSizeRatio', 'onFinish');
}


function setSizeSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Layer size slider */
	var sizeSliderId = layerId + '_features-size-slider';
	var $sizeSlider = newLayerElement.find('#features-size-slider');

	$sizeSlider.attr('name', sizeSliderId);
	$sizeSlider.attr('id', sizeSliderId);

	var sizeSliderObj = sizeSliderSettingSetup($sizeSlider, {
		from: layerConfig.style.size[0],
		to: layerConfig.style.size[1],
		min: 4,
		max: 100,
		type: 'double'
	});

	/* Font size slider */
	var fontSliderId = layerId + '_font-size-slider';
	var $fontSlider = newLayerElement.find('#font-size-slider');

	$fontSlider.attr('name', fontSliderId);
	$fontSlider.attr('id', fontSliderId);

	var fontSliderObj = sizeSliderSettingSetup($fontSlider, {
		from: layerConfig.style.fontSizeRatio,
		step: 0.01,
		min: 0,
		max: 3,
		type: 'single',
		postfix: ''
	});

	setSizeSettingsEvents({
		'sizeSlider': sizeSliderObj,
		'fontSlider': fontSliderObj
	}, layerId);
}



function setPositionSettingsEvents(elementsDict, layerId) {
	/* Change feature angle setting */
	layerAngleEventSetup(elementsDict.anglepicker, layerId, null, 'angle');

	/* Change feature offset setting */
	layerConfigSliderEventSetup(elementsDict.offsetSlider, layerId, null, 'positionOffsetRatio', 'onFinish');

	/* Change feature offset relative toggle */
	layerConfigCheckboxEventSetup(elementsDict.offsetRelativeCheckbox, layerId, null, 'positionOffsetRelativeToggle');
}


function setPositionSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Layer size slider */
	var anglepickerId = layerId + '_anglepicker';
	var $anglepicker = newLayerElement.find('#anglepicker');

	$anglepicker.attr('name', anglepickerId);
	$anglepicker.attr('id', anglepickerId);

	/* Initialize it with value */
	if( layerConfig.style.angle === '' ) {
		let layerNumber = ArcheoSession.get().layers._counter - 1;
		layerConfig.style.angle = layerNumber * 45;
	}

	var anglepickerObj = $anglepicker.anglePicker({	
		flat: true
		, value: layerConfig.style.angle
		, enableCenter: true
		, centerSize: 20
		, size: 75
		, handleSize: 15
		, handleType: "default"
		, snap: 1
		, showValue: true
		, start: -90
		, showValueAlwaysEnabled: true
	});

	/* Relative offset toggle */
	var offsetRelativeCheckboxId = layerId + '_feature-offset-relative-toggle';
	var $offsetRelativeCheckbox = newLayerElement.find('#feature-offset-relative-toggle');

	$offsetRelativeCheckbox.attr('name', offsetRelativeCheckboxId);
	$offsetRelativeCheckbox.attr('id', offsetRelativeCheckboxId);

	if( layerConfig.style.positionOffsetRelativeToggle )
		$offsetRelativeCheckbox.addClass('active');
	else
		$offsetRelativeCheckbox.removeClass('active');

	/* Font size slider */
	var offsetSliderId = layerId + '_feature-offset-slider';
	var $offsetSlider = newLayerElement.find('#feature-offset-slider');

	$offsetSlider.attr('name', offsetSliderId);
	$offsetSlider.attr('id', offsetSliderId);

	var offsetSliderObj = sizeSliderSettingSetup($offsetSlider, {
		from: layerConfig.style.positionOffsetRatio,
		step: 0.05,
		min: -10,
		max: 10,
		type: 'single',
		postfix: ''
	});

	setPositionSettingsEvents({
		'anglepicker': anglepickerObj,
		'offsetSlider': offsetSliderObj,
		'offsetRelativeCheckbox': $offsetRelativeCheckbox
	}, layerId);
}



function setWeightSettingsEvents(elementsDict, layerId) {
	/* Change min weight scaling factor for logarithmic weight function */
	$(elementsDict.weightGrowthSelect).on('changed.bs.select', function (event) {
		let weightFunction = $(event.target).val();

		if(weightFunction === "logarithmic") {
			elementsDict.growthFactorSpinner.spinner( "option", "min", 2 );
		}
		else {
			elementsDict.growthFactorSpinner.spinner( "option", "min", 0 );
		}

		return true;
	});

	/* Change size setting */
	layerConfigSpinnerEventSetup(elementsDict.scalingFactorSpinner, layerId, null, 'weightScalingFactor');
	layerConfigSpinnerEventSetup(elementsDict.growthFactorSpinner, layerId, null, 'weightGrowthFactor');

	layerConfigSelectEventSetup(elementsDict.weightGrowthSelect, layerId, null, 'weightGrowth');
	layerConfigSelectEventSetup(elementsDict.standMethodSelect, layerId, null, 'standardisationMethod');

	layerConfigRadiobuttonEventSetup(elementsDict.displayRadiobutton, layerId, null, 'valueDisplay');

	layerConfigCheckboxEventSetup(elementsDict.weightValueCheckbox, layerId, null, 'cardinalityByValue');
	layerConfigCheckboxEventSetup(elementsDict.weightSizeCheckbox, layerId, null, 'cardinalityBySize');
	layerConfigCheckboxEventSetup(elementsDict.weightColorCheckbox, layerId, null, 'cardinalityByColor');


}


function setWeightSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Weight appearance */
	/* Cardinality by value setting */
	var weightValueCheckboxId = layerId + '_weight-by-value';
	var $weightValueCheckbox = newLayerElement.find('#weight-by-value');

	$weightValueCheckbox.attr('name', weightValueCheckboxId);
	$weightValueCheckbox.attr('id', weightValueCheckboxId);

	ArcheoUI.toggleCheckbox($weightValueCheckbox, layerConfig.style.cardinalityByValue);

	/* Cardinality by size setting */
	var weightSizeCheckboxId = layerId + '_weight-by-size';
	var $weightSizeCheckbox = newLayerElement.find('#weight-by-size');

	$weightSizeCheckbox.attr('name', weightSizeCheckboxId);
	$weightSizeCheckbox.attr('id', weightSizeCheckboxId);

	ArcheoUI.toggleCheckbox($weightSizeCheckbox, layerConfig.style.cardinalityBySize);

	/* Cardinality by color setting */
	var weightColorCheckboxId = layerId + '_weight-by-color';
	var $weightColorCheckbox = newLayerElement.find('#weight-by-color');

	$weightColorCheckbox.attr('name', weightColorCheckboxId);
	$weightColorCheckbox.attr('id', weightColorCheckboxId);

	ArcheoUI.toggleCheckbox($weightColorCheckbox, layerConfig.style.cardinalityByColor);

	/* Weight display mode */
	var displayRadiobuttonId = layerId + '_weight-value-display';
	var $displayRadiobutton = newLayerElement.find('#weight-value-display');
	$displayRadiobutton.attr('name', displayRadiobuttonId);
	$displayRadiobutton.attr('id', displayRadiobuttonId);
	$displayRadiobutton.find('input').attr('name', displayRadiobuttonId);
	$displayRadiobutton.find(`input[value=${layerConfig.style.valueDisplay}]`).click();

	/* Weight scaling factor slider */
	var scalingFactorSpinnerId = layerId + '_weight-scaling-factor';
	var $scalingFactorSpinner = newLayerElement.find('#weight-scaling-factor');

	$scalingFactorSpinner.attr('name', scalingFactorSpinnerId);
	$scalingFactorSpinner.attr('id', scalingFactorSpinnerId);

	$scalingFactorSpinner.spinner({
		culture: window.getLang(),
		min: 0,
		max: 100.0,
		numberFormat: "n",
		step: 0.00001
	});

	$scalingFactorSpinner.val( layerConfig.style.weightScalingFactor );
	$scalingFactorSpinner.attr('last-value', layerConfig.style.weightScalingFactor );

	/* Weight growth factor slider */
	var growthFactorSpinnerId = layerId + '_weight-growth-factor';
	var $growthFactorSpinner = newLayerElement.find('#weight-growth-factor');

	$growthFactorSpinner.attr('name', growthFactorSpinnerId);
	$growthFactorSpinner.attr('id', growthFactorSpinnerId);

	$growthFactorSpinner.spinner({
		culture: window.getLang(),
		min: 0,
		max: 100.0,
		numberFormat: "n",
		step: 0.00001
	});

	$growthFactorSpinner.val( layerConfig.style.weightGrowthFactor );
	$growthFactorSpinner.attr('last-value', layerConfig.style.weightGrowthFactor );

	/* Weight growth select */
	var standMethodSelectId = layerId + '_select-stand-method';
	var $standMethodSelect = newLayerElement.find('#select-stand-method');
	$standMethodSelect.attr('id', standMethodSelectId);
	$standMethodSelect.selectpicker();
	$standMethodSelect.selectpicker('val', layerConfig.style.standardisationMethod);

	/* Weight growth select */
	var weightGrowthSelectId = layerId + '_select-weight-growth';
	var $weightGrowthSelect = newLayerElement.find('#select-weight-growth');
	$weightGrowthSelect.attr('id', weightGrowthSelectId);
	$weightGrowthSelect.selectpicker();
	$weightGrowthSelect.selectpicker('val', layerConfig.style.weightGrowth);

	setWeightSettingsEvents({
		'weightValueCheckbox': $weightValueCheckbox,
		'weightSizeCheckbox': $weightSizeCheckbox,
		'weightColorCheckbox': $weightColorCheckbox,
		'scalingFactorSpinner': $scalingFactorSpinner,
		'growthFactorSpinner': $growthFactorSpinner,
		'weightGrowthSelect': $weightGrowthSelect,
		'standMethodSelect': $standMethodSelect,
		'displayRadiobutton': $displayRadiobutton
	}, layerId);
}


function setLayerTypeSettings(newLayerElement, layerId) {
	setPointSettings(newLayerElement, layerId);
	setPiechartSettings(newLayerElement, layerId);
	setHeatmapSettings(newLayerElement, layerId);
	setTagSettings(newLayerElement, layerId);
}


function setCloneEvents(elementsDict, layerId) {
	/* Values select */
	elementsDict.cloneButton.on('click', function (event) {
		ArcheoUtilities.setButtonLoading(elementsDict.cloneButton).then(() => {
			$('.clone-button').one('layer-initialization', () => {
				ArcheoUtilities.setButtonLoaded(elementsDict.cloneButton);
			});

			var $button = $(event.target);
			ArcheoSession.cloneLayer(layerId);
		});
	});
}


function setSmallQuantitiesEvents(elementsDict, layerId) {
	layerConfigSliderEventSetup(elementsDict.othersSlider, layerId, null, 'otherRatio', 'onFinish', true);
	layerConfigSliderEventSetup(elementsDict.othersCountSlider, layerId, null, 'otherCount', 'onFinish', true);
}


function setSmallQuantitiesSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Group others slider setting */
	var othersSliderId = layerId + '_others-slider';
	var $othersSlider = newLayerElement.find('#others-slider');

	$othersSlider.attr('name', othersSliderId);
	$othersSlider.attr('id', othersSliderId);

	var othersSliderObj = ArcheoUI.initializeSlider($othersSlider, {
		min: .0,
		max: 1.,
		from: layerConfig.style.otherRatio,
		step: 0.01,
		type: 'single',
		extra_classes: 'others-slider',
		prettify: (val) => { return Math.round(val * 100) + '%'; }
	});

	/* Group others slider setting */
	var othersCountSliderId = layerId + '_others-count-slider';
	var $othersCountSlider = newLayerElement.find('#others-count-slider');

	$othersCountSlider.attr('name', othersCountSliderId);
	$othersCountSlider.attr('id', othersCountSliderId);

	var othersCountSliderObj = ArcheoUI.initializeSlider($othersCountSlider, {
		min: 0,
		max: 100,
		from: layerConfig.style.otherCount,
		step: 1,
		type: 'single',
		extra_classes: 'others-slider',
		prettify: (val) => val 
	});

	setSmallQuantitiesEvents({
		"othersSlider": othersSliderObj,
		"othersCountSlider": othersCountSliderObj,
	}, layerId);
}


function setCloneSettings(newLayerElement, layerId) {
	var $cloneButton = newLayerElement.find('.clone-button');

	setCloneEvents({
		'cloneButton': $cloneButton
	}, layerId);
}


function initalizeClustering(newLayerElement, layerId) {
	newLayerElement.on('layer-initialization', function(event, data) {
		if(data.layerId === layerId) {
			ArcheoEvents.broadcast('cluster-setting-change', null, {
				layerId: layerId,
				setting: 'distance'
			});
			
			ArcheoEvents.broadcast('cluster-setting-change', null, {
				layerId: layerId,
				setting: 'range'
			});
		}
	})
}


function initializeTooltips(newLayerElement, layerId) {
	newLayerElement.find('.archeo-tooltip').each(function() {
        let tooltipId = $(this).attr('tooltip-id');
        let text = window.dictionary.tooltips[tooltipId];

        tippy(this, {
            content: text,
            interactive: true,
            appendTo: () => document.body
        });
    });
}


function createLayerElement(layerId, hideLayer) {
	return new Promise((resolution, rejection) => {
		let newLayerElement = $(`#layer-template`).clone();
		newLayerElement.addClass('layer');
	
		if(hideLayer) {
			newLayerElement.find('.layer-header').addClass('collapsed');
			newLayerElement.children('.collapse').removeClass('show');
		}
	
		/* Assign new dataset id */
		newLayerElement.attr('id', layerId);
		newLayerElement.appendTo('#layers-container');
	
		setCloneSettings(newLayerElement, layerId);
		let el = setGeneralSettings(newLayerElement, layerId);
	
		setComponentsSettings(newLayerElement, layerId);
	
		setVisibilitySettings(newLayerElement, layerId);
	
		let layerConfig = ArcheoSession.get().layers[layerId];
		el.layerTypeSelect.selectpicker('val', layerConfig.type);
	
		setLayerTypeSettings(newLayerElement, layerId);
		setPositionSettings(newLayerElement, layerId);
		setSizeSettings(newLayerElement, layerId);
		setWeightSettings(newLayerElement, layerId);
		setSmallQuantitiesSettings(newLayerElement, layerId);
	
		setLayerAccordion(newLayerElement, layerId);
		setSettingsAccordion(newLayerElement, layerId);
	
		initalizeClustering(newLayerElement, layerId);

		initializeTooltips(newLayerElement, layerId);
	
		newLayerElement.css('display', 'block');

		resolution(newLayerElement);
	});
}


function initializeLayer(layerId) {	
	return new Promise((resolution, rejection) => {
		var hideLayer = Object.keys( ArcheoMap.getMapLayers() ).length > 0;
		createLayerElement(layerId, hideLayer).then(() => {
			/* Initialize filter values */
			ArcheoEvents.broadcast('layer-initialization', null, {
				layerId: layerId
			});

			resolution();
		});
	});
}


function broadcastLayerCreation(layerId, delayTime = null) {
	return ArcheoEvents.broadcast('layer-add', '#new-layer-button', {
		layerId: layerId,
		settings: ArcheoSession.get().layers[layerId].settings
	}, delayTime);
}



export {
	initializeLayer,
	broadcastLayerCreation
}; 