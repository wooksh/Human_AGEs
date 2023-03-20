import attributes from 'Pages/map/data/attributes.json';
import attributesTypes from 'Pages/map/data/attributesTypes.json';
import {
	initializeTreeSearch,
	updateTreeLevelSlider
} from '../../utilities.js';

import { treeSelectEvents } from './tree-select.js';
import treeLevelFilteringEvents from './tree-level.js';
import { 
	toggleTreeSearch, resetTreeSearch, updateBrowser, resetFiltering, toggleAdmixture
} from './utilities.js';

import { initializeAdmixtureOptions } from './admixture-proportions.js';
import defaultGroups from 'Pages/map/data/groups.json';


function initializeFilterSwitch() {
	let $switch = $('#attribute-filter-switch');
	let $filteringPanel = $('#attribute-filtering-panel');
	
	$switch.on('click update', function(event) {
		let value = ! $switch.hasClass('active'); // negation applied intentionally
		let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');

		let attributeId = cache.attributeId;

		if(value === true) {
			$filteringPanel.removeAttr('disabled');
			ArcheoSession.get().filters.attributes.available.push(attributeId);
		}
		else {
			$filteringPanel.attr('disabled', '');
			ArcheoSession.get().filters.attributes.available.removeEl(attributeId);
		}

		ArcheoEvents.broadcast('filter-attribute-change', null, {
			attributeId: cache.attributeId,
			attributeType: cache.attributeType
		});
	});
}



function initializeAttributesSelectButtons() {
    let $selectAllButt = $('#attribute-filter-select-all');
    let $unselectAllButt = $('#attribute-filter-unselect-all');

    let $selectValues = $('#select-attribute-filter-browser');

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

	let $selectInvert = $('#attribute-filter-select-invert');

	$selectInvert.on('click', function() {
		let $allOptions = $selectValues.find('option:not(.hidden:selected)');
		let $selectedOptions = $selectValues.find('option:not(.hidden):selected');

		$allOptions.prop('selected', true);
		$selectedOptions.prop('selected', false);
	});
}


function initializeAttriutesFilterButtons() {
    let $filterAllButt = $('#attribute-filter-filter-all');
    let $unfilterAllButt = $('#attribute-filter-unfilter-all');

    let $selectValues = $('#select-attribute-filter-browser');

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

			$selectedOptions.each((index) => {
				let value = $($selectedOptions[index]).val();
				legend[value].filtered = doFilterOut;
			});
	
			ArcheoEvents.broadcast('filter-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});
		}
	}

    $filterAllButt.on('click', filterButtonFunction(true));

	$unfilterAllButt.on('click', filterButtonFunction(false));
}


function initializeUseRegexEvent() {
	let $attributeRegexCheckbox = $('#attribute-filter-regex');
	let $attributeSearch = $('#filter-attribute-search');

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


function initializeFilteringEvents() {
	let filteringFunction = function($selectValues) {
		return function(event) {
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

			let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');
			let attributeId = cache.attributeId;
			let attributeType = cache.attributeType;

			let legend = ArcheoSession.getAttributeLegend(attributeId);
	
			let selectedCount = $selectedOptions.length;
			let filteredCount = $selectedOptions.filter('.filtered').length;
	
			if((filteredCount / selectedCount) >= 0.5) {
				$selectedOptions.removeClass('filtered');
				$selectedOptions.each((index) => {
					let value = $($selectedOptions[index]).val();
					legend[value].filtered = false;
				});
			}
			else {
				$selectedOptions.addClass('filtered');
				$selectedOptions.each((index) => {
					let value = $($selectedOptions[index]).val();
					legend[value].filtered = true;
				});
			}
	
			ArcheoEvents.broadcast('filter-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType,
				doNotRefreshBrowser: true
			});
		};
	}

	let $selectAttributeValues = $('#select-attribute-filter-browser');
	$selectAttributeValues.on('dblclick update', filteringFunction( $selectAttributeValues ));
}


function initializeSearchEvents() {
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

	let $selectAttributesValues = $('#select-attribute-filter-browser');
	let $attributesSearch = $('#filter-attribute-search');

	$attributesSearch.on('input', searchEventFunction(
		$selectAttributesValues
	));
}


function initializeAttributeSelectEvents() {
    let $selectAttribute = $('#select-filter-attribute');
    let $selectAttributeType = $('#select-filter-attribute-type');
    let $selectValues = $('#select-attribute-filter-browser');

	let $ancestorSearchInput = $('#attribute-filtering-ancestors');
    let $descendantsSearchInput = $('#attribute-filtering-descendants');

	let $filterSwitch = $('#attribute-filter-switch');
	let $filterSwitchWrapper = $($filterSwitch.parent());
	let $filteringPanel = $('#attribute-filtering-panel');

	let $treeLevelPanel = $('#tree-level-filtering');
	let $admixturePanel = $('#admixture-filtering');

	var treeLevelSliderData = {from: 1, to: 100};


	const attributeChangeEventFunction = function(event) {
		var $select = $(event.target);

		/* Update cache on interface event */
		if(event.type === 'changed') {
			let attributeId = $select.val();

			if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
				if(!(attributeId in attributesTypes)) {
					$('#attribute-filter-wrapper').removeClass('hidden');
				}
				else {
					$('#attribute-filter-wrapper').addClass('hidden');
				}
			} else
				$('#attribute-filter-wrapper').addClass('hidden');

			ArcheoCache.setTemporaryEntry('attributeFiltering', {
				attributeId: attributeId,
				attributeName: $select.find(':selected').val(),
				attributeType: $select.find(':selected').attr('type')
			});
		} 

		let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');

		let attributeId = cache.attributeId;
		let attributeType = cache.attributeType;

		if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
			let params = {
				attributeId: attributeId,
				attributeType: attributeType,
				eventType: event.type
			};

			ArcheoRequests.incorporateAttributes(params).then(() => {
				if(event.type === 'changed')
					$select.trigger('clustering-attribute-change', params);
				else
					$select.trigger('update', params);
			});
		}
	};


	const updateUI = function(event, data) {
		let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');

		let attributeId = cache.attributeId;
		let attributeName = cache.attributeName;
		let attributeType = cache.attributeType;

		let attributeChangeEvent = ArcheoUtilities.isValid(data) ? data.eventType : undefined;

		if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
			var $select = $(event.target);
			let typesWrapper = $select.parent().next();
			let filtersConfig = ArcheoSession.get().filters.attributes;


			// Initialize UI state on attribute change //
			if(attributeChangeEvent === 'changed') {
				if(attributeId in attributesTypes) {
					typesWrapper.removeClass('d-none');
					ArcheoUI.setSelectpicker( $selectAttributeType, attributesTypes[attributeId], true );

					// Reset UI //
					$filteringPanel.attr('disabled', '');
					$filterSwitchWrapper.addClass('hidden');
					$treeLevelPanel.addClass('hidden');
					$admixturePanel.addClass('hidden');
		
					return;
				}
				else if(attributeType in attributesTypes && attributeId in attributesTypes[attributeType]) {
					// Reset UI //
					$filteringPanel.removeAttr('disabled');
					$filterSwitchWrapper.removeClass('hidden');
					$treeLevelPanel.addClass('hidden');
				}
				else {
					typesWrapper.addClass('d-none');
				}

				if(ArcheoUtilities.isValidNonEmptyString(attributeId)) {
					resetTreeSearch();
					initializeTreeSearch($ancestorSearchInput, attributeId);
					initializeTreeSearch($descendantsSearchInput, attributeId);
					
					// Initialize the switch with session info //
					$filterSwitchWrapper.removeClass('hidden');
					if( filtersConfig.available.has(attributeId) ) {
						$filterSwitch.addClass('active');
						$filteringPanel.removeAttr('disabled');
					} else {
						$filterSwitch.removeClass('active');
						$filteringPanel.attr('disabled', '');
					}

					toggleTreeSearch(attributeType);
					toggleAdmixture(attributeType);

					let attributeConfig = ArcheoSession.get().filters.attributes.configs[attributeId];

					if( ArcheoUtilities.isValid(attributeConfig) ) {
						treeLevelSliderData = {
							from: attributeConfig.treeLevel[0],
							to: attributeConfig.treeLevel[1]
						};
					}
					else {
						// Register attribute config entry if neccessary //
						ArcheoSession.get().filters.attributes.configs[attributeId] = {
							id: attributeId,
							name: attributeName,
							type: attributeType,
							treeLevel: [0, 100],
							proportions: {}
						};
					}

					// Update state of other UI elements //
					updateTreeLevelSlider($treeLevelPanel, $('#attribute-filtering-tree-level-slider'), attributeId, attributeType, treeLevelSliderData);
				}
				else {
					$filteringPanel.attr('disabled', '');
					$filterSwitchWrapper.addClass('hidden');
				}
			}

			/* Update browser */
			var attributesDict = ArcheoUtilities.deepCloneObject(defaultGroups);

			
			/*"special": {
				"isOptgroup": true,
				"name": "Special attributes",
				"options": {
					"MISSING": {
						"name": "missing",
						"filtered": false*/


			if(attributeType === 'admixture') {
				let legend = ArcheoSession.getAdmixtureLegend(attributeId, true, false, true);

				/* Prepare special attributes */
				//delete attributesDict.special.options.MISSING;

				if('OTHER' in legend) {
					attributesDict.special.options.OTHER.filtered = legend.OTHER.filtered;
					delete legend.OTHER;
				}
				if('MISSING' in legend) {
					attributesDict.special.options.MISSING.filtered = legend.MISSING.filtered;
					delete legend.MISSING;
				}

				attributesDict.attributes.options = legend;
				
				/* Update admixtures' options */
				if(event.type !== 'update')
					initializeAdmixtureOptions(attributeId, attributeType, attributesDict.attributes.options);
			} else {
				let legend = ArcheoSession.getAttributeLegend(attributeId, true, true, false);
				
				if('OTHER' in legend) {
					attributesDict.special.options.OTHER.filtered = legend.OTHER.filtered;
					delete legend.OTHER;
				}
				if('MISSING' in legend) {
					attributesDict.special.options.MISSING.filtered = legend.MISSING.filtered;
					delete legend.MISSING;
				}

				attributesDict.attributes.options = legend;
			}

			ArcheoUI.setSelect($selectValues, attributesDict); // error
			$selectValues.attr('attributeId', attributeId);
			$selectValues.attr('attributeType', attributeType);
		}
	};

	/* Change layer attribute */
	$selectAttribute.on('changed.bs.select dataset-add dataset-remove', attributeChangeEventFunction);
	$selectAttribute.on('clustering-attribute-change update', updateUI);

	/* Change layer attribute type if available */
	$selectAttributeType.on('changed.bs.select dataset-add dataset-remove', attributeChangeEventFunction);
	$selectAttributeType.on('clustering-attribute-change update', updateUI);
}


function resetButtonEvents() {
	let $resetButton = $('#attribute-filter-reset');

	$resetButton.on('click', () => resetFiltering());
}


function filterTriggerEvents() {
	let $trigger = $('#attribute-filter_trigger');

	$trigger.on('click', function(event) {
		/* The button status will be changed only after click event, thus negation */
		var isToggled = ! $(event.target).hasClass('active'); // negation applied on purpose

		ArcheoSession.get().filters.attributes.isActive = isToggled;

		let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');

		ArcheoEvents.broadcast('filter-attribute-change', null, {
			attributeId: cache.attributeId,
			attributeType: cache.attributeType
		});
	});
}


function initializeSessionLoadEvents() {
	$('#attribute-filter_trigger').on('session-load', function() {
		let isActive = ArcheoSession.get().filters.attributes.isActive;
		ArcheoUI.toggleCheckbox($('#attribute-filter_trigger'), isActive);
	});

	$('#select-filter-attribute').on('session-load', function() {
		$('#select-filter-attribute').selectpicker('val', '');
	});
}


function initializeAttributeFilterEvents() {
	initializeFilterSwitch();
    initializeAttributeSelectEvents();
	initializeSearchEvents();
	initializeFilteringEvents();
	initializeUseRegexEvent();
	initializeAttributesSelectButtons();
	initializeAttriutesFilterButtons();

	treeSelectEvents();
	treeLevelFilteringEvents();
	resetButtonEvents();
	filterTriggerEvents();
	initializeSessionLoadEvents();
}


export default initializeAttributeFilterEvents;