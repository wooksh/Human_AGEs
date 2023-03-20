import {
	appendLayerToLegend,
	getLegendSectionEl,
	updateLayersLegendVisibility
} from './utilities.js';

import tinygradient from 'tinygradient';


function onLayerAdded() {
	$('#legend-layers').on('layer-add', function(event, data) {
		let layer = ArcheoMap.getLayer( data.layerId );

        appendLayerToLegend(layer);
	});
}


function onLayerNameChanged() {
    $('#legend-layers').on('layer-name-change', function(event, data) {
		//let layer = ArcheoMap.getLayer( data.layerId );

		var $wrapper = getLegendSectionEl(data.layerId);
		var layerText = $wrapper.find('.legend-layer-text');

		layerText.text(data.value);
	});
}


function onLayerColorChanged() {
    $('#legend-layers').on('layer-color-change', function(event, data) {
		var $wrapper = getLegendSectionEl(data.layerId);
		var layerSymbol = $wrapper.find('.legend-layer-symbol');

		layerSymbol.css('background', 'none');
		layerSymbol.css('background-color', data.value);
	});
}


function onLayerGradientChanged() {
    $('#legend-layers').on('layer-gradient-change', function(event, data) {
		var $wrapper = getLegendSectionEl(data.layerId);
		var layerSymbol = $wrapper.find('.legend-layer-symbol');

		layerSymbol.css('background', tinygradient(data.value).css());

		let layer = ArcheoMap.getLayer( data.layerId );

		ArcheoMap.triggerLayerStyleFunction(layer);
	});
}


function onLayerVisibilityChanged() {
    $('#legend-layers').on('layer-visibility-change', function(event, data) {
		var $wrapper = getLegendSectionEl(data.layerId);
		var layerConfig = ArcheoSession.get().layers[ data.layerId ];

		if(data.value === false || layerConfig.style.colorToggle === false) {
			$wrapper.addClass('hidden');
			//$wrapper.css('display', 'none');
		}
		else {
			$wrapper.removeClass('hidden');
			//$wrapper.css('display', 'block');
		}

		updateLayersLegendVisibility();
	});
}


function sidePanelActivationFix() {
	$('#legend-wrapper').on('panel-activated', function(event, data) {
		$("#legend-header").simulate('drag');
	});
}


function initializeLegendEvents() {
    onLayerAdded();
	onLayerNameChanged();
	onLayerColorChanged();
	onLayerGradientChanged();
	onLayerVisibilityChanged();

	sidePanelActivationFix();
}


export {
    initializeLegendEvents
}