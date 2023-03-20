import {
	isValueInLegend,
	getAttributeSectionEl,
	isThereLegendSection,
	isThereLayerLegendSection,
	attachAttributeTitleHTML,
	showSection,
	initializeAttributionsSections,
	getLegendSectionEl,
	getLegendRegionSectionEl,
	regionPatternDict,
	updateLayersLegendVisibility
} from './utilities.js';


import {
	initializeLegendEvents
} from './events.js';


var valueCache = { attributes: {}, regions: {}};


async function clearLegend() {
	// Hide sections //
	let sections = $(`#legend-content .attribute-section-wrapper`);
	sections.addClass('hidden');
	
	// Clear attributes sections content //
	let contents = sections.find('.attribute-section-content');
	contents.empty();
	valueCache.attributes = {};

	// Clear regions sections //
	$('#legend-regions').addClass('hidden');
	let regions = $('#legend-regions .region-legend');
	regions.remove();
	valueCache.regions = {};
}


async function appendRecordToLegend(attributeId, valueName, colorString) {
	if( !(attributeId in valueCache.attributes) )
		valueCache.attributes[ attributeId ] = {};

	let attributeCache = valueCache.attributes[ attributeId ];

	if( !(valueName in attributeCache) ) {

		var legendRecord = $('<div/>', {
			class: "attribute-legend"
		});
		
		legendRecord = legendRecord.append(
			$('<div/>', {
				class: `legend-symbol point attribute`,
				style: `background-color: ${colorString};`
			}), $('<span/>', {class: 'legend-text'}).text(valueName)
		);

		let legendSelector = getAttributeSectionEl(attributeId);
		showSection(legendSelector);

		let contentSelector = legendSelector.find('.attribute-section-content');
			
		legendRecord.appendTo(contentSelector);

		attributeCache[valueName] = true;
	}
}


async function appendRegionToLegend(regionName, regionType) {
	if( !(regionType in valueCache.regions) )
		valueCache.regions[ regionType ] = {};

	let regionsCache = valueCache.regions[ regionType ];

	if( !(regionName in regionsCache) ) {
		regionsCache[regionName] = true;

		let regionsTypeLegend = ArcheoSession.get().legend.regions[regionType];

		if(regionName in regionsTypeLegend) {

			/* Show hidden legend section */
			$('#legend-regions').removeClass('hidden');

			let regionStyle = regionsTypeLegend[regionName];

			//var style = ArcheoMap.getLayerStyle(layer);
			var visibleRegionName = regionStyle.name;
			var patternColor = tinycolor(regionStyle.color.pattern).toRgb();
			var backgroundColor = regionStyle.color.background;

			if( ArcheoUtilities.isValid(regionStyle.pattern) ) {
				var patternName = regionStyle.pattern.type;
				var patternImage = regionPatternDict[ patternName ];

				ArcheoUtilities.changeColorOfBase64PNG(patternImage, [patternColor.r, patternColor.g, patternColor.b, patternColor.a || 1.0])
				.then((colorPatternImage) => {
					var legendRecord = $('<div/>', {
						class: "region-legend",
						'region-type': regionType
					});
		
					legendRecord = legendRecord.append(
						$('<div/>', {
							class: `legend-symbol region`,
							style: `background-color: ${backgroundColor}; background-image: url("${colorPatternImage}");`
						}),
						$('<span/>', {
							class: `legend-text`
						}).text(visibleRegionName)
					);
		
					let contentSelector = $('#legend-regions');
					legendRecord.appendTo(contentSelector);
				});
			}
			else {
				var legendRecord = $('<div/>', {
					class: "region-legend",
					'region-type': regionType
				});
	
				legendRecord = legendRecord.append(
					$('<div/>', {
						class: `legend-symbol region`,
						style: `background-color: ${backgroundColor};");`
					}),
					$('<span/>', {
						class: `legend-text`
					}).text(visibleRegionName)
				);
	
				let contentSelector = $('#legend-regions');
				legendRecord.appendTo(contentSelector);
			}
		}
	}
}


/* Create hidden section */
function generateLegendAttributeSection(attributeInfo) {
	let contentSelectorWithMCSB = $(`#legend-attributes .mCSB_container`);
	let contentSelector = contentSelectorWithMCSB.length > 0 ? contentSelectorWithMCSB : $(`#legend-attributes`);

	if( !isThereLegendSection(attributeInfo.id) ) {
		let newSectionWrapper = $('<div/>', {
			class: 'attribute-section-wrapper hidden',
			'attribute-id': attributeInfo.id
		});

		var headerWrapper = $('<h6/>', {
			class: 'section-header'
		}).appendTo(newSectionWrapper);

		attachAttributeTitleHTML(attributeInfo.name, headerWrapper);

		$('<div/>', {
			class: 'attribute-section-content'
		}).appendTo(newSectionWrapper);

		// populate a section
		newSectionWrapper.appendTo(contentSelector);

		return newSectionWrapper;
	}
}


function initialize(attributes, attributesTypes) {
	var $legendWrapper = $("#legend-wrapper");
	var $legendContent = $("#legend-content");
	var $legendContentWrapper = $('#legend-content-wrapper');

	/*$legendWrapper.draggable({ 
		containment: "#legend-panel", 
		scroll: false,
		//handle: '#legend-header',
		start: function( event, ui ) {
			$legendWrapper.css('right', 'unset');
			return true;
		},
		stop: function( event, ui ) {
			return true;
		},
		//snap: '#legend-panel'
	});*/

    //$("#legend-content").mCustomScrollbar({
    $legendContent.mCustomScrollbar({
        theme: "minimal",
        scrollInertia: 100,
        axis: 'yx'
	});

	$legendContentWrapper.resizable({
		//containment: "#top-controls-wrapper", //"#legend-panel",
		//minHeight: $("#top-controls-wrapper").width('min-height'),
      	//minWidth: $legendContentWrapper.css('min-width'),
		handles: 'w, s, sw',
		resize: function( event, ui ) {
			$legendContentWrapper.css('left', 0);
			let width = ui.size.width + 'px';
			//let height = ui.size.height + 'px';

			$('#legend-header').css('width', width);

			$legendContentWrapper.css('max-height', $("#top-controls-container").height());

			/*$legendContent.css('width', width);
			$legendContent.css('height', height);

			$legendContent.find('.mCSB_container').css('width', width);*/
		}
	});

	initializeAttributionsSections("#legend-content", attributes, attributesTypes);

	initializeLegendEvents();
}


function removeLayer(layerId) {
	getLegendSectionEl(layerId).remove();

	updateLayersLegendVisibility();

	// Update attributes legend //
	ArcheoMap.triggerLayerStyleFunction();
}


function sortLayers(orderedIds) {
	let $layersContainer = $("#legend-layers");
	let $layers = $layersContainer.find('.layer-legend');

	let $sortedLayers = $layers.sort(function(lhs, rhs){
		let leftLayerOrder = orderedIds.indexOf( $(lhs).attr('layer-id') );
		let rightLayerOrder = orderedIds.indexOf( $(rhs).attr('layer-id') );

		return leftLayerOrder - rightLayerOrder;
	});

	$layersContainer.append($sortedLayers);
}


export {
	clearLegend,
	appendRecordToLegend,
	generateLegendAttributeSection,
	initialize,
	removeLayer,
	appendRegionToLegend,
	sortLayers,
	initializeAttributionsSections
};