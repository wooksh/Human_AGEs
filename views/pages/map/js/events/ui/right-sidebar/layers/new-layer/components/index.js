import attributes from 'Pages/map/data/attributes.json';
import attributesTypes from 'Pages/map/data/attributesTypes.json';
import defaultGroups from 'Pages/map/data/groups.json';

import {
	initializeTreeSearch
} from '../../../utilities.js';

import { treeSelectEvents } from './tree-select.js';

import { 
	toggleTreeSearch, resetTreeSearch, resetFiltering
} from './utilities.js';

import { getDataSourceAttributeValues } from '../utilities';


function initializeAttributesSelectButtons(elementsDict) {
    let $selectAllButt = elementsDict.selectAllButt;
    let $unselectAllButt = elementsDict.unselectAllButt;

    let $selectValues = elementsDict.browser;

	let filterButtonFunction = function(doSelect) {
		return function(event) {
			let $selectedOptions = $selectValues.find('option:not(.hidden)');

			if(doSelect) {
				$selectedOptions.prop('selected', true);
			} else {
				$selectedOptions.prop('selected', false);
			}
		}
	}

    $selectAllButt.on('click', filterButtonFunction(true));
	$unselectAllButt.on('click', filterButtonFunction(false));

	let $selectInvert = elementsDict.invertButt;

	$selectInvert.on('click', function() {
		let $allOptions = $selectValues.find('option:not(.hidden:selected)');
		let $selectedOptions = $selectValues.find('option:not(.hidden):selected');

		$allOptions.prop('selected', true);
		$selectedOptions.prop('selected', false);
	});
}


function initializeAttriutesFilterButtons(elementsDict) {
    let $filterAllButt = elementsDict.filterButt;
    let $unfilterAllButt = elementsDict.unfilterButt;

    let $selectValues = elementsDict.browser;

	let filterButtonFunction = function(doFilterOut) {
		return function(event) {
			let $selectedOptions = $selectValues.find('option:selected:not(.hidden)');
			let attributeId = $selectValues.attr('attributeId');
			let attributeType = $selectValues.attr('attributeType');
			let legend = ArcheoSession.getAttributeLegend(attributeId);
	
			if(doFilterOut)
				$selectedOptions.addClass('filtered');
			else
				$selectedOptions.removeClass('filtered');

			/*$selectedOptions.each((index) => {
				let value = $($selectedOptions[index]).val();
				legend[value].filtered = doFilterOut;
			});*/
	
			/* Force update of the components data */
			elementsDict.browser.trigger('update');
		}
	}

    $filterAllButt.on('click', filterButtonFunction(false));

	$unfilterAllButt.on('click', filterButtonFunction(true));
}


function initializeUseRegexEvent(elementsDict) {
	let $attributeRegexCheckbox = elementsDict.searchRegex;
	let $attributeSearch = elementsDict.search;

	$attributeRegexCheckbox.on('click', function(event) {
		let value = ! $attributeRegexCheckbox.hasClass('active'); // negation applied intentionally

		if(value) {
			$attributeSearch.attr('placeholder', "Filter attributes by regex...");
			$attributeSearch.attr('regex', "");
			$attributeSearch.val('');
		}
		else {
			$attributeSearch.attr('placeholder', "Filter attributes...");
			$attributeSearch.removeAttr('regex');
			$attributeSearch.val('');
		}
	});
}



function browserFilteringEvents(elementsDict) {
	/*elementsDict.valuesSelect.on('changed.bs.select', function (event, data) {
		let layerConfig = ArcheoSession.get().layers[layerId];

		var $select = $(event.target);
		var values = $select.selectpicker().val();

		let allPossibleAttributesCount = getDataAttributesIds(elementsDict.valuesSelect).length;

		let attributeId;
		var attributeType;
		if(event.type === 'layer-attribute-change') {
			attributeId =  data.attributeId;
			attributeType = data.attributeType;
		} else {
			attributeId = layerConfig.attributeId; 
			attributeType = layerConfig.attributeType;
		}
		
		ArcheoEvents.broadcast('layer-value-change', null, {
			layerId: layerId,
			values: values,
			dataAttributesCount: allPossibleAttributesCount,
			attributeId: attributeId,
			attributeType: attributeType	
		});
	});*/
}



function initializeFilteringEvents(elementsDict, layerId) {
	let filteringFunction = function($selectValues) {
		return function(event) {
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

			let layerConfig = ArcheoSession.get().layers[layerId];
			let attributeId = layerConfig.attributeId;
			let attributeType = layerConfig.attributeType;

			//let legend = ArcheoSession.getAttributeLegend(attributeId);
	
			let selectedCount = $selectedOptions.length;
			let filteredCount = $selectedOptions.filter('.filtered').length;

	
			if((filteredCount / selectedCount) >= 0.5) {
				$selectedOptions.removeClass('filtered');
			}
			else {
				$selectedOptions.addClass('filtered');
			}

			let allOptions = $selectValues.find('option:not(.filtered)');

			let values = $.map(allOptions, (el) => $(el).val());
			let allPossibleAttributesCount = getDataAttributesIds(elementsDict.browser).length;

			ArcheoEvents.broadcast('layer-value-change', null, {
				layerId: layerId,
				values: values,
				dataAttributesCount: allPossibleAttributesCount,
				attributeId: attributeId,
				attributeType: attributeType	
			});
		};
	}

	let $selectAttributeValues = elementsDict.browser;
	$selectAttributeValues.on('dblclick update', filteringFunction( $selectAttributeValues ));
}


function initializeSearchEvents(elementsDict) {
	let searchEventFunction = function($selectValues) {
		return function(event) {
			let $search = $(event.target);
			let searchValue = $(event.target).val();
			let doUseRegex = ArcheoUtilities.isValid( $search.attr('regex') );

			$selectValues.find('option').filter( async function(index) {
				let $this = $(this);
				let optionValue = $this.val();
				let isMatched;

				try {
					if(doUseRegex)
						isMatched = optionValue.match( new RegExp(`${searchValue}`) );
					else
						isMatched = optionValue.match( new RegExp(`^${ArcheoUtilities.escapeRegex( searchValue )}`) );
				}
				catch(error) {
					isMatched = false;
				}

				if(!isMatched)
					$this.addClass('hidden');
				else
					$this.removeClass('hidden');
			});
		}
	}

	let $selectAttributesValues = elementsDict.browser;
	let $attributesSearch = elementsDict.search;

	$attributesSearch.on('input', searchEventFunction(
		$selectAttributesValues
	));
}


function getDataAttributesIds($browser) {
	return $.map($browser.find('optgroup[label="Data attributes"] option'), (el) => {
	//return $.map($browser.find('option'), (el) => {
		return $(el).attr('value')
	});
}


function componentUIUpdateEvents(elementsDict, layerId) {
	let $ancestorSearchInput = elementsDict.ancestorsInput;
    let $descendantsSearchInput = elementsDict.descendantsInput;
	
	elementsDict.browser.on('layer-attribute-change filter-attribute-change clustering-attribute-change layer-initialization', function(event, data) {
		if(event.type === 'layer-initialization' && layerId !== data.layerId)
			return;
		
		let layerConfig = ArcheoSession.get().layers[layerId];

		var attributeId;
		var attributeType;
		if(event.type === 'layer-attribute-change') {
			attributeId =  data.attributeId;
			attributeType = data.attributeType;
		} else {
			attributeId = layerConfig.attributeId; 
			attributeType = layerConfig.attributeType;
		}
	
		let datasetId = layerConfig.datasetId;
		var attributesDict = ArcheoUtilities.deepCloneObject(defaultGroups);
	
		let doesFilterChangeConcernsThisLayer = 
			(event.type === 'filter-attribute-change' || event.type === 'clustering-attribute-change') && data.attributeId === attributeId;

		if(ArcheoUtilities.isValidNonEmptyString(datasetId)) {
			if( data.layerId === layerId || doesFilterChangeConcernsThisLayer === true ) {
				// Reset value //
				if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
					/* Update UI */
					if(event.type === 'layer-attribute-change' || event.type === 'layer-initialization') {
						resetTreeSearch(elementsDict);
						initializeTreeSearch($ancestorSearchInput, attributeId);
						initializeTreeSearch($descendantsSearchInput, attributeId);
	
						toggleTreeSearch(elementsDict, attributeType);
					}

					/* Populate select UI */
					let attributeLegend = ArcheoSession.getAttributeLegend(attributeId);
					var attributeValues = getDataSourceAttributeValues(datasetId, layerId, attributeId, attributeType);

					attributeValues.forEach(function(value) {
						//if(value in attributeLegend && attributeLegend[value].filtered === false)
						attributesDict.attributes.options[value] = {
							name: value,
							filtered: true // By default every value is filtered out
						}
					});
	
					/* Apply proper filtering according to session info */
					let componentValues = layerConfig.style.componentValues;
					var selected;

					let commonAttributesDict = attributesDict.attributes.options;
	
					if( event.type === 'layer-initialization' ) {
						if(componentValues.data === 'selectAll') {
							Object.keys(commonAttributesDict).forEach((value) => {
								commonAttributesDict[value].filtered = false;
							});
						} else {
							Object.keys(componentValues.data).forEach((value) => {
								if(value in commonAttributesDict)
									commonAttributesDict[value].filtered = false;
							})
						}
	
						ArcheoMap.refreshLayer(data.layerId);
					}
					else if( event.type === 'layer-attribute-change' ) {
						Object.keys(commonAttributesDict).forEach((value) => {
							commonAttributesDict[value].filtered = false;
						});
					}
					else if(event.type === 'filter-attribute-change' || 
							event.type === 'clustering-attribute-change'
						) {
						if(componentValues.data === 'selectAll') {
							Object.keys(commonAttributesDict).forEach((value) => {
								commonAttributesDict[value].filtered = false;
							});
						} else {
							Object.keys(componentValues.data).forEach((value) => {
								if(value in commonAttributesDict)
									commonAttributesDict[value].filtered = false;
							})
						}
					}
	
					/* Initialize filtering for special attributes */
					if( ArcheoUtilities.isValid( componentValues.special.MISSING ) ) 
						attributesDict.special.options.MISSING.filtered = false;
					else
						attributesDict.special.options.MISSING.filtered = true;
	
					if( ArcheoUtilities.isValid( componentValues.special.OTHER ) )
						attributesDict.special.options.OTHER.filtered = false;
					else
						attributesDict.special.options.OTHER.filtered = true;

					/* Update browser */
					ArcheoUI.setSelect(elementsDict.browser, attributesDict);
					elementsDict.browser.attr('attributeId', attributeId);
					elementsDict.browser.attr('attributeType', attributeType);
				}
			}
		}
		else {
			/* Reset to default */
			ArcheoUI.setSelect(elementsDict.browser, defaultGroups);
		}
	});
}


function resetButtonEvents(elementsDict, layerId) {
	let $resetButton = elementsDict.resetButt;

	$resetButton.on('click', () => resetFiltering(elementsDict, layerId));
}


function initializeUI(newLayerElement, layerId) {
	let $browser = newLayerElement.find('#layer-select-attribute-filter-browser');
	$browser.attr('id', layerId + '_' + $browser.prop('id'));

	let $resetButt = newLayerElement.find('#layer-attribute-filter-reset');
	$resetButt.attr('id', layerId + '_' + $resetButt.prop('id'));

	let $search = newLayerElement.find('#layer-filter-attribute-search');
	$search.attr('id', layerId + '_' + $search.prop('id'));

	let $searchRegex = newLayerElement.find('#layer-attribute-filter-regex');
	$searchRegex.attr('id', layerId + '_' + $searchRegex.prop('id'));

	let $selectAllButt = newLayerElement.find('#layer-attribute-filter-select-all');
	$selectAllButt.attr('id', layerId + '_' + $selectAllButt.prop('id'));

	let $unselectAllButt = newLayerElement.find('#layer-attribute-filter-unselect-all');
	$unselectAllButt.attr('id', layerId + '_' + $unselectAllButt.prop('id'));

	let $invertButt = newLayerElement.find('#layer-attribute-filter-select-invert');
	$invertButt.attr('id', layerId + '_' + $invertButt.prop('id'));

	let $unfilterButt = newLayerElement.find('#layer-attribute-filter-unfilter-all');
	$unfilterButt.attr('id', layerId + '_' + $unfilterButt.prop('id'));

	let $filterButt = newLayerElement.find('#layer-attribute-filter-filter-all');
	$filterButt.attr('id', layerId + '_' + $filterButt.prop('id'));

	let $ancestorsInput = newLayerElement.find('#layer-attribute-filtering-ancestors');
	$ancestorsInput.attr('id', layerId + '_' + $ancestorsInput.prop('id'));

	let $ancestorsButt = newLayerElement.find('#layer-attribute-filtering-ancestors-button');
	$ancestorsButt.attr('id', layerId + '_' + $ancestorsButt.prop('id'));

	let $descendantsInput = newLayerElement.find('#layer-attribute-filtering-descendants');
	$descendantsInput.attr('id', layerId + '_' + $descendantsInput.prop('id'));

	let $descendantsButton = newLayerElement.find('#layer-attribute-filtering-descendants-button');
	$descendantsButton.attr('id', layerId + '_' + $descendantsButton.prop('id'));

	let $treePanel = newLayerElement.find('#tree-filter-select-panel');
	$treePanel.attr('id', layerId + '_' + $treePanel.prop('id'));

	return {
		'browser': $browser,
		'resetButt': $resetButt,
		'search': $search,
		'searchRegex': $searchRegex,
		'selectAllButt': $selectAllButt,
		'unselectAllButt': $unselectAllButt,
		'invertButt': $invertButt,
		'unfilterButt': $unfilterButt,
		'filterButt': $filterButt,
		'ancestorsInput': $ancestorsInput,
		'ancestorsButt': $ancestorsButt,
		'descendantsInput': $descendantsInput,
		'descendantsButton': $descendantsButton,
		'treePanel': $treePanel
	}
}


function setComponentsSettings(newLayerElement, layerId) {
	/* Initialize UI */
	let elementsDict = initializeUI(newLayerElement, layerId);

	/* Initialize events */
    //initializeAttributeSelectEvents(elementsDict);
	componentUIUpdateEvents(elementsDict, layerId);
	browserFilteringEvents(elementsDict);
	initializeSearchEvents(elementsDict);
	initializeFilteringEvents(elementsDict, layerId);
	initializeUseRegexEvent(elementsDict);
	initializeAttributesSelectButtons(elementsDict);
	initializeAttriutesFilterButtons(elementsDict);

	treeSelectEvents(elementsDict, layerId);
	resetButtonEvents(elementsDict, layerId);
}


export default setComponentsSettings;