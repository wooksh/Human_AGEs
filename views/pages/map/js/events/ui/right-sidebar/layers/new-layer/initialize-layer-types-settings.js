import { 
	layerConfigSliderEventSetup, 
	layerConfigCheckboxEventSetup, 
	layerSettingSliderEventSetup, 
	sizeSliderSettingSetup,
	layerConfigRadiobuttonEventSetup
} from './utilities';


function setPointSettingsEvents(elementsDict, layerId) {
	/* Appearance */
	layerConfigCheckboxEventSetup(elementsDict.bodyToggleCheckbox, layerId, 'point', 'bodyToggle');
	layerConfigSliderEventSetup(elementsDict.outlineSlider, layerId, 'point', 'outlineSizeRatio', 'onFinish');
	layerConfigSliderEventSetup(elementsDict.fillSlider, layerId, 'point', 'backgroundSizeRatio', 'onFinish');
}


function setPointSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Body toggle */
	var bodyToggleCheckboxId = layerId + '_point-appearance-body';
	var $bodyToggleCheckbox = newLayerElement.find('#point-appearance-body');

	$bodyToggleCheckbox.attr('name', bodyToggleCheckboxId);
	$bodyToggleCheckbox.attr('id', bodyToggleCheckboxId);

	ArcheoUI.toggleCheckbox($bodyToggleCheckbox, layerConfig.style.bodyToggle);

	// Outline
	var outlineSliderId = layerId + '_point-appearance-outline-size';
	var $outlineSlider = newLayerElement.find('#point-appearance-outline-size');

	$outlineSlider.attr('name', outlineSliderId);
	$outlineSlider.attr('id', outlineSliderId);

	var outlineSliderObj = ArcheoUI.initializeSlider($outlineSlider, {
		min: 0,
		max: 6.,
		from: layerConfig.style.outlineSizeRatio,
		step: 0.01,
		type: 'single',
		extra_classes: 'point-appearance-outline-size'
	});

	// Fill
	var fillSliderId = layerId + '_point-appearance-body-size';
	var $fillSlider = newLayerElement.find('#point-appearance-body-size');

	$fillSlider.attr('name', fillSliderId);
	$fillSlider.attr('id', fillSliderId);

	var fillSliderObj = ArcheoUI.initializeSlider($fillSlider, {
		min: 0,
		max: 6.,
		from: layerConfig.style.backgroundSizeRatio, // get from session
		step: 0.01,
		type: 'single',
		extra_classes: 'point-appearance-body-size'
	});

	setPointSettingsEvents({
		'bodyToggleCheckbox': $bodyToggleCheckbox,
		'outlineSlider': outlineSliderObj,
		'fillSlider': fillSliderObj
	}, layerId);
}


function setPiechartSettingsEvents(elementsDict, layerId) {
	layerConfigRadiobuttonEventSetup(elementsDict.labelAppearanceRadiobutton, layerId, 'piechart', 'piechartLabelsAppearance', true);
	layerConfigCheckboxEventSetup(elementsDict.labelCountDataCheckbox, layerId, 'piechart', 'piechartLabelsShowCountData', true);
	layerConfigCheckboxEventSetup(elementsDict.labelPercentCheckbox, layerId, 'piechart', 'piechartLabelsShowPercent', true);
	layerConfigSliderEventSetup(elementsDict.labelSizeSlider, layerId, 'piechart', 'piechartLabelsSizeRatio', 'onFinish', true);
	layerConfigSliderEventSetup(elementsDict.labelOffsetSlider, layerId, 'piechart', 'piechartLabelsOffsetRatio', 'onFinish', true);
}


function setPiechartSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Labels appearance options */
	var labelAppearanceRadiobuttonId = layerId + '_piechart-label-appearance';
	var $labelAppearanceRadiobutton = newLayerElement.find('#piechart-label-appearance');
	$labelAppearanceRadiobutton.attr('name', labelAppearanceRadiobuttonId);
	$labelAppearanceRadiobutton.attr('id', labelAppearanceRadiobuttonId);
	$labelAppearanceRadiobutton.find('input').attr('name', labelAppearanceRadiobuttonId);
	$labelAppearanceRadiobutton.find(`input[value=${layerConfig.style.piechartLabelsAppearance}]`).click();

	/* Labels show count data */
	var labelCountDataCheckboxId = layerId + '_piechart-label-count-toggle';
	var $labelCountDataCheckbox = newLayerElement.find('#piechart-label-count-toggle');

	$labelCountDataCheckbox.attr('name', labelCountDataCheckboxId);
	$labelCountDataCheckbox.attr('id', labelCountDataCheckboxId);

	if(!ArcheoUtilities.isValid(layerConfig.style.piechartLabelsShowCountData))
		layerConfig.style.piechartLabelsShowCountData = true;

	ArcheoUI.toggleCheckbox($labelCountDataCheckbox, layerConfig.style.piechartLabelsShowCountData);

	/* Labels percetanges */
	var labelPercentCheckboxId = layerId + '_piechart-label-percent';
	var $labelPercentCheckbox = newLayerElement.find('#piechart-label-percent');

	$labelPercentCheckbox.attr('name', labelPercentCheckboxId);
	$labelPercentCheckbox.attr('id', labelPercentCheckboxId);

	ArcheoUI.toggleCheckbox($labelPercentCheckbox, layerConfig.style.piechartLabelsShowPercent);

	/* Labels size ratio */
	var labelSizeSliderId = layerId + '_piechart-label-size';
	var $labelSizeSlider = newLayerElement.find('#piechart-label-size');

	$labelSizeSlider.attr('name', labelSizeSliderId);
	$labelSizeSlider.attr('id', labelSizeSliderId);

	var labelSizeSliderObj = ArcheoUI.initializeSlider($labelSizeSlider, {
		min: 0,
		max: 3,
		from: layerConfig.style.piechartLabelsSizeRatio,
		step: 0.01,
		type: 'single',
		//extra_classes: 'piechart-label-size'
	});

	/* Labels offset ratio */
	var labelOffsetSliderId = layerId + '_piechart-label-offset';
	var $labelOffsetSlider = newLayerElement.find('#piechart-label-offset');

	$labelOffsetSlider.attr('name', labelOffsetSliderId);
	$labelOffsetSlider.attr('id', labelOffsetSliderId);

	var labelOffsetSliderObj = ArcheoUI.initializeSlider($labelOffsetSlider, {
		min: 0,
		max: 5,
		from: layerConfig.style.piechartLabelsOffsetRatio,
		step: 0.01,
		type: 'single',
		//extra_classes: 'piechart-others-slider',
	});

	setPiechartSettingsEvents({
		'labelAppearanceRadiobutton': $labelAppearanceRadiobutton,
		'labelPercentCheckbox': $labelPercentCheckbox,
		'labelSizeSlider': labelSizeSliderObj,
		'labelOffsetSlider': labelOffsetSliderObj,
		'labelCountDataCheckbox': $labelCountDataCheckbox
	}, layerId);
}


function setHeatmapSettingsEvents(elementsDict, layerId) {
	layerSettingSliderEventSetup(elementsDict.radiusSlider, layerId, 'heatmap', 'radius')
	layerSettingSliderEventSetup(elementsDict.blurSlider, layerId, 'heatmap', 'blur')
}


function setHeatmapSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Heatmap radius */
	var radiusSliderId = layerId + '_heatmap-radius';
	var $radiusSlider = newLayerElement.find('#heatmap-radius');

	$radiusSlider.attr('name', radiusSliderId);
	$radiusSlider.attr('id', radiusSliderId);

	var radiusSliderObj = sizeSliderSettingSetup($radiusSlider, {
		from: layerConfig.settings.radius,
		min: 1,
		max: 1000
	});

	/* Heatmap blur setting */
	var blurSliderId = layerId + '_heatmap-blur';
	var $blurSlider = newLayerElement.find('#heatmap-blur');

	$blurSlider.attr('name', blurSliderId);
	$blurSlider.attr('id', blurSliderId);

	var blurSliderObj = sizeSliderSettingSetup($blurSlider, {
		from: layerConfig.settings.blur,
		min: 1,
		max: 1000
	});

	setHeatmapSettingsEvents({
		'blurSlider': blurSliderObj,
		'radiusSlider': radiusSliderObj
	}, layerId);

	/* Initialize blur size */
	// It is initialized inside layerChange function
}


function setTagSettingsEvents(elementsDict, layerId) {
	/* Appearance */
	layerConfigCheckboxEventSetup(elementsDict.dotsCheckbox, layerId, 'tag', 'showFullStop');

	layerConfigSliderEventSetup(elementsDict.outlineSlider, layerId, 'tag', 'outlineSizeRatio', 'onFinish');
	layerConfigSliderEventSetup(elementsDict.fillSlider, layerId, 'tag', 'backgroundSizeRatio', 'onFinish');
	layerConfigSliderEventSetup(elementsDict.paddingSlider, layerId, 'tag', 'padding', 'onFinish');
	layerConfigSliderEventSetup(elementsDict.seedSlider, layerId, 'tag', 'seed', 'onFinish');

	layerConfigRadiobuttonEventSetup(elementsDict.strategyRadiobutton, layerId, 'tag', 'strategy');
}


function setTagSettings(newLayerElement, layerId) {
	let layerConfig = ArcheoMap.getLayerConfigById(layerId);

	/* Tag appearance elements */
	// Dots
	var dotsCheckboxId = layerId + '_tag-appearance-dots';
	var $dotsCheckbox = newLayerElement.find('#tag-appearance-dots');

	$dotsCheckbox.attr('name', dotsCheckboxId);
	$dotsCheckbox.attr('id', dotsCheckboxId);

	ArcheoUI.toggleCheckbox($dotsCheckbox, layerConfig.style.showFullStop);

	// Outline
	var outlineSliderId = layerId + '_tag-appearance-outline-size';
	var $outlineSlider = newLayerElement.find('#tag-appearance-outline-size');

	$outlineSlider.attr('name', outlineSliderId);
	$outlineSlider.attr('id', outlineSliderId);

	var outlineSliderObj = ArcheoUI.initializeSlider($outlineSlider, {
		min: 0,
		max: 6.,
		from: layerConfig.style.outlineSizeRatio,
		step: 0.01,
		type: 'single',
		extra_classes: 'tag-appearance-outline-size'
	});

	// Fill
	var fillSliderId = layerId + '_tag-appearance-fill-size';
	var $fillSlider = newLayerElement.find('#tag-appearance-fill-size');

	$fillSlider.attr('name', fillSliderId);
	$fillSlider.attr('id', fillSliderId);

	var fillSliderObj = ArcheoUI.initializeSlider($fillSlider, {
		min: 0,
		max: 6.,
		from: layerConfig.style.backgroundSizeRatio, // get from session
		step: 0.01,
		type: 'single',
		extra_classes: 'tag-appearance-fill-size'
	});

	// Padding
	var paddingSliderId = layerId + '_tag-appearance-padding';
	var $paddingSlider = newLayerElement.find('#tag-appearance-padding');

	$paddingSlider.attr('name', paddingSliderId);
	$paddingSlider.attr('id', paddingSliderId);

	var paddingSliderObj = ArcheoUI.initializeSlider($paddingSlider, {
		min: .01,
		max: 0.6,
		from: layerConfig.style.padding, // get from session
		step: .01,
		type: 'single',
		extra_classes: 'tag-appearance-padding'
	});

	// Seed
	var seedSliderId = layerId + '_tag-appearance-seed';
	var $seedSlider = newLayerElement.find('#tag-appearance-seed');

	$seedSlider.attr('name', seedSliderId);
	$seedSlider.attr('id', seedSliderId);

	var seedSliderObj = ArcheoUI.initializeSlider($seedSlider, {
		min: .01,
		max: 3,
		from: layerConfig.style.seed, // get from session
		step: .01,
		type: 'single',
		extra_classes: 'tag-appearance-seed'
	});

	// Placement strategy
	var strategyRadiobuttonId = layerId + '_tag-appearance-strategy';
	var $strategyRadiobutton = newLayerElement.find('#tag-appearance-strategy');
	$strategyRadiobutton.attr('name', strategyRadiobuttonId);
	$strategyRadiobutton.attr('id', strategyRadiobuttonId);
	$strategyRadiobutton.find('input').attr('name', strategyRadiobuttonId);
	$strategyRadiobutton.find(`input[value=${layerConfig.style.strategy}]`).click();

	setTagSettingsEvents({
		'dotsCheckbox': $dotsCheckbox,
		'outlineSlider': outlineSliderObj,
		'fillSlider': fillSliderObj,
		'paddingSlider': paddingSliderObj,
		'seedSlider': seedSliderObj,
		'strategyRadiobutton': $strategyRadiobutton
	}, layerId);
}


export {
	setPointSettings,
	setPiechartSettings,
	setHeatmapSettings,
	setTagSettings
};