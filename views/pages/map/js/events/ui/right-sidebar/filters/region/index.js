import {
	promiseFetchRegionsBasicData
} from '../../utilities.js';

import {
	resetFiltering
} from './utilities';


function initializeRegionsFilterButtons() {
    let $selectAllButt = $('#region-filter-select-all');
    let $unselectAllButt = $('#region-filter-unselect-all');

    let $selectValues = $('#select-filter-region-values');

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

	let $selectInvert = $('#region-filter-select-invert');

	$selectInvert.on('click', function() {
		let $allOptions = $selectValues.find('option:not(.hidden:selected)');
		let $selectedOptions = $selectValues.find('option:not(.hidden):selected');

		$allOptions.prop('selected', true);
		$selectedOptions.prop('selected', false);
	});
}


function initializeRegionsSelectButtons() {
    let $filterAllButt = $('#region-filter-filter-all');
    let $unfilterAllButt = $('#region-filter-unfilter-all');

    let $selectValues = $('#select-filter-region-values');

	let filterButtonFunction = function(doFilterOut) {
		return function(event) {
			let $selectedOptions = $selectValues.find('option:selected:not(.hidden)');
			let regionTypeId = $selectValues.attr('regionTypeId');
			let legend = ArcheoSession.getRegionLegend(regionTypeId);
	
			if(doFilterOut)
				$selectedOptions.addClass('filtered');
			else
				$selectedOptions.removeClass('filtered');

			$selectedOptions.each((index) => {
				let value = $($selectedOptions[index]).val();
				legend[value].filtered = doFilterOut;
			});
	
			ArcheoEvents.broadcast('filter-region-change', null, {
				regionTypeId: regionTypeId
			});
		}
	}

    $filterAllButt.on('click', filterButtonFunction(true));

	$unfilterAllButt.on('click', filterButtonFunction(false));
}


function initializeManualSelectEvents() {
	let $selectValues = $('#select-filter-region-values');

	$selectValues.on('change', function(event) {
		let $allSelectedOptions = $selectValues.find('option:selected');
		let $properSelectedOptions = $selectValues.find('option:selected:not(.hidden)');

		$allSelectedOptions.prop('selected', false);
		$properSelectedOptions.prop('selected', true);
	});
}


function initializeUseRegexEvent() {
	let $regionRegexCheckbox = $('#region-filter-regex');
	let $regionSearch = $('#filter-region-search');

	$regionRegexCheckbox.on('click', function(event) {
		let value = ! $regionRegexCheckbox.hasClass('active'); // negation applied intentionally

		if(value) {
			$regionSearch.attr('placeholder', "Filter regions by regex...");
			$regionSearch.attr('regex', "");
			$regionSearch.val('');
		}
		else {
			$regionSearch.attr('placeholder', "Filter regions...");
			$regionSearch.removeAttr('regex');
			$regionSearch.val('');
		}
	});
}


function initializeFilteringEvents() {
	let filteringFunction = function($selectValues) {
		return function(event) {
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');
			let regionTypeId = ArcheoSession.get().filters.regions.regionTypeId;

			let legend = ArcheoSession.getRegionLegend(regionTypeId);
	
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
	
			ArcheoEvents.broadcast('filter-region-change', null, {
				regionTypeId: regionTypeId,
			});
		};
	}

	let $selectRegionValues = $('#select-filter-region-values');
	$selectRegionValues.on('dblclick update', filteringFunction( $selectRegionValues ));
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

	let $selectRegionsValues = $('#select-filter-region-values');
	let $regionsSearch = $('#filter-region-search');

	$regionsSearch.on('input', searchEventFunction(
		$selectRegionsValues
	));
}



function initializeRegionSelectEvents() {
    let $selectRegion = $('#select-filter-region');
    let $selectValues = $('#select-filter-region-values');

	const regionChangeEventFunction = async function (event) {	
		var $select = $(event.target);
		let regionTypeId = $select.val().split('__')[1];

		if( ArcheoUtilities.isValidNonEmptyString(regionTypeId) ) {
			if(event.type === 'changed')
				$('#region-filter-wrapper').removeClass('hidden');

			let promises = [];
			
			/* Load data if it's missing */
			let regionsDict = ArcheoCache.getTemporaryEntry('regions');

			let isThisRegionDataAlreadyLoaded = regionTypeId in regionsDict 
				&& !(ArcheoUtilities.isEmpty(regionsDict[regionTypeId]));
		
			if(!isThisRegionDataAlreadyLoaded) {
				promises.push(
					promiseFetchRegionsBasicData(regionTypeId)
				);
			}

			Promise.all(promises).then((successFlags) => {
				let areAllSuccessful = true;

				successFlags.forEach((isSuccess) => {
					areAllSuccessful = areAllSuccessful && isSuccess;
				});

				if(areAllSuccessful) {
					let regions = ArcheoSession.getRegionLegend(regionTypeId, true);

					/* Filter out grouped regions */
					regions = ArcheoUtilities.filterObject(regions, 
						([key]) => !( ArcheoUtilities.isValid(regions[key].group) ) );

					ArcheoUI.setSelect($selectValues, regions);
					$selectValues.attr('regionTypeId', regionTypeId);

					ArcheoSession.get().filters.regions.regionTypeId = regionTypeId;
				}
				else
					alert("For some reason the region data couldn't be fetched. Please contact the administration.");	
			});
		}
		else {
			if(event.type === 'changed')
				$('#region-filter-wrapper').addClass('hidden');
		}
	}

	/* Change layer region */
	$selectRegion.on('changed.bs.select update', regionChangeEventFunction);
}


function filterTriggerEvents() {
	let $trigger = $('#region-filter_trigger');

	$trigger.on('click', function(event) {
		/* The button status will be changed only after click event, thus negation */
		var isToggled = ! $(event.target).hasClass('active'); // negation applied on purpose

		ArcheoSession.get().filters.regions.isActive = isToggled;

		let cache = ArcheoCache.getTemporaryEntry('attributeFiltering');

		ArcheoEvents.broadcast('filter-attribute-change', null, {
			attributeId: cache.attributeId,
			attributeType: cache.attributeType
		});
	});
}


function resetButtonEvents() {
	let $resetButton = $('#region-filter-reset');

	$resetButton.on('click', () => resetFiltering());
}


function initializeSessionLoadEvents() {
	$('#region-filter_trigger').on('session-load', function() {
		let isActive = ArcheoSession.get().filters.regions.isActive;
		ArcheoUI.toggleCheckbox($('#region-filter_trigger'), isActive);
	});

	$('#select-filter-region').on('session-load', function() {
		$('#select-filter-region').selectpicker('val', '');
	});
}


function initializeRegionFilterEvents() {
    initializeRegionSelectEvents();
	initializeSearchEvents();

	initializeFilteringEvents();
	initializeUseRegexEvent();

	initializeRegionsSelectButtons();
	initializeRegionsFilterButtons();
	filterTriggerEvents();

	initializeManualSelectEvents();

	initializeSessionLoadEvents();

	resetButtonEvents();
}


export default initializeRegionFilterEvents;