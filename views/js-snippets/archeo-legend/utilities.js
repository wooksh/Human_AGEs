function isValueInLegend(attributeId, valueName) {
	let contentSelector = getAttributeSectionEl(attributeId);
	return contentSelector.find(`.attribute-legend span:textEquals(${ valueName })`).length > 0;
}


function getAttributeSectionEl(attributeId) {
	return $(`#legend-attributes .attribute-section-wrapper[attribute-id="${attributeId}"]`);
}


function isThereLegendSection(attributeId) {
	return getAttributeSectionEl(attributeId).length > 0;
}


function getLegendSectionEl(layerId) {
	return $(`#legend-layers .layer-legend[layer-id="${layerId}"]`);
}


function getLegendRegionSectionEl(regionId) {
	return $(`#legend-regions .region-legend[region-id="${regionId}"]`);
}


function isThereLayerLegendSection(layerId) {
	return getLegendSectionEl(layerId).length > 0;
}


function initializeAttributionsSections(selector, attributes, attributesTypes = {}) {
	var datasetsKeys = Object.keys( attributes );
	datasetsKeys.sort();

	let attributesDict = {}

	console.log(`initializeAttributionsSections attributes`);
	console.log(attributes);

	/* Gather all possible attributes names */
	datasetsKeys.forEach((datasetKey) => {
		let attributesKeys = Object.keys( attributes[ datasetKey ] );
		attributesKeys.sort();

		attributesKeys.forEach((attributeKey) => {
			if( !ArcheoUtilities.isStringUndefined(attributeKey) ) {
				if( attributes[ datasetKey ][ attributeKey ].isOptgroup === true ) {
					let optionsKeys = Object.keys( attributes[ datasetKey ][ attributeKey ].options );
					optionsKeys.forEach((optionKey) => {
						let attributeName = attributes[ datasetKey ][ attributeKey ].options[ optionKey ].name;

						if(optionKey in attributesTypes) {
							initializeAttributionsSections(selector, {temp: attributesTypes[optionKey]}, {});
							return;
						} else
							attributesDict[optionKey] = { 
								name: attributeName,
								id: optionKey
							}
					});
				} 
				else {
					let attributeName = attributes[ datasetKey ][ attributeKey ].name;

					if(attributeKey in attributesTypes) {
						initializeAttributionsSections(selector, {temp: attributesTypes[attributeKey]}, {});
						return;
					} else
						attributesDict[attributeKey] = {
							name: attributeName,
							id: attributeKey
						};
				}
			}
		})
	});

	/* Create section for each attribute */
	Object.keys(attributesDict).forEach((attributeKey) => {
		let attributeInfo = attributesDict[ attributeKey ];
		ArcheoLegend.generateLegendAttributeSection( attributeInfo );
	});
}


function attachAttributeTitleHTML(attributeName, wrapper) {
	$('<span/>', {
		class: 'badge badge-primary',
		text: 'attribute' // should be got from lang dict
	}).appendTo(wrapper);

	$('<span/>', {
		text: attributeName
	}).appendTo(wrapper);
}


async function appendLayerToLegend(layer) {
	var style = ArcheoMap.getLayerStyle(layer);
	var layerName = layer.get('name');
	var color = style.color;
	var layerId = layer.get('layerId');

	var legendRecord = $('<div/>', {
		class: "layer-legend",
		'layer-id': layerId
	});

	legendRecord = legendRecord.append(
		$('<div/>', {
			class: `legend-layer-symbol`,
			style: `background-color: ${color};`
		}), $('<span/>', {
			class: `legend-layer-text`
		}).text(layerName)
	);

	let contentSelector = $('#legend-layers');

	legendRecord.appendTo(contentSelector);
}


function showSection(section) {
	section.removeClass('hidden');
}


function updateLayersLegendVisibility() {
	if( $("#legend-layers .layer-legend:not(.hidden)").length === 0 )
		$("#legend-layers").addClass('hidden');
	else
		$("#legend-layers").removeClass('hidden');
}


const regionPatternDict = {
	hatch: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAIElEQVQYV2NkYGD4D8Qg0AjEDVA2MgUSq2ccVUjf4AEAQUIeAbk0Ra4AAAAASUVORK5CYII=",
	coal: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABBElEQVQ4T6WUsQ6BMRSF/ZMnkFjsQryFhI2BxGoTkzfAG0gkwjsYbMyewGTAYGYhRgPnJLdyNa0qNzkpbe93T9s/N0n9Fw9Jv2JcQKPEw8tgfgI1A/U2hAjswr0uYENghPoKeuvoBOOKQBM/A7UrXf1nYB6UltxZ4YPDLNbGUBc6u87tcqDhRSupiv9LgRE6t6GxRxoA0FcQAt/cxgJXAFQsVzz6y20scIvkG7SHDjLy9w7yfod1LPLyp65LD83ZDtNSlcAytA4BQo+iL/2EzSWI49ehHebEHV2aoEM6vXuIbAg96GjWNZCLNUfiDHMdD5Ddho/BBjHknthXtrmmfXGeLttPSpYwgWNjx2UAAAAASUVORK5CYII=",
	dot: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAASElEQVQYV2NkIBIwEqmOgWyFDkAb5kNtSQTSB2A2opv4ACghD5UEsRVxKfwAlOCHSj4E0gq4FIKsXgCVTMBnNc5AINvXOE0EAFbnCAsdaT7eAAAAAElFTkSuQmCC",
	crosses: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAATklEQVQYV2NkIAAYofLuQHonmlo3IH8XTAFI7j8Qg/jMQPwTiFlAgsgKYIr+wiTRFcB0gmi4RhgDxVgk6+AqnYCC+9Ac6Qzk70V3A4anAagTCwllfzl6AAAAAElFTkSuQmCC",
	woven: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAdUlEQVQoU2NkIB4wApX+AxHEAGagot9AzISswR0osBOLbpAakGIWkBy6Df+xiLkBxXbBDMLmJGya4Bbj8gNOTfg8jVUToVDC0ISsAcR2RfYg1OEommAaQOH8ExZ0WILWGSi2FxasIE1/QZFCTAyCFOMNRnRDAExgEAyjuf9ZAAAAAElFTkSuQmCC"
}


export {
	isValueInLegend,
	getAttributeSectionEl,
	isThereLegendSection,
	attachAttributeTitleHTML,
	showSection,
	isThereLayerLegendSection,
	appendLayerToLegend,
	initializeAttributionsSections,
	getLegendSectionEl,
	getLegendRegionSectionEl,
	updateLayersLegendVisibility,
	regionPatternDict
};