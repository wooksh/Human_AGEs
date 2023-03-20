import attributes from 'Pages/map/data/attributes.json';
import attributesTypes from 'Pages/map/data/attributesTypes.json';
import { of } from 'rxjs';

import {
	initializeTreeSearch,
	updateTreeLevelSlider
} from '../../utilities.js';

import {
	treeSelectEvents
} from './tree-select.js';

import treeLevelClusteringEvents from './tree-level.js';

import initializeRootWordClusteringEvents from './root-word.js';


import {
	addGroupToLegend,
	updateBrowser,
	resetGroupModyfing,
	activateGroupModyfing,
	resetTreeSearch,
	toggleTreeSearch,
	resetClustering
} from './utilities.js';


function initializeNewGroupButton() {
	let $newGroupButton = $('#attribute-cluster-new-group-button');
	let $newGroupTextbox = $('#attribute-cluster-new-group');
	let $selectValues = $('#select-attribute-cluster-browser');
	let $groupErrorText = $('#new-group-error-text');
	let $groupMessageText = $('#new-group-message-text');

	$newGroupButton.on('click', function(event) {
		let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;

		let legend = ArcheoSession.getAttributeLegend(attributeId);
		
		let groupName = $newGroupTextbox.val();

		$groupMessageText.text('');

		// Add new group //
		if( ArcheoUtilities.isValidNonEmptyString(groupName) ) {
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

			// func(groupName, attributesValuesIds)

			if($selectedOptions.length > 0) {
				$groupErrorText.text('');
				//legend._groups.push( groupName );

				// Create new legend entry for the group, if it does not exists already //
				addGroupToLegend(legend, groupName);

				// Assign attributes to the group //
				$selectedOptions.each((index) => {
					let value = $($selectedOptions[index]).val();
					if(value !== groupName && value in legend)
						legend[value].group = groupName;
				});

				let attributesValuesCount = $selectedOptions.length;
				$groupMessageText.text(`Added ${attributesValuesCount} attribute's values to "${groupName}" group.`);
			}
			else {
				$groupErrorText.text('To create a group you must select attributes, which will be assigned to it.');
			}
		}
		else {
			$groupErrorText.text('You must provide group\'s name.');
		}

		ArcheoEvents.broadcast('clustering-attribute-change', null, {
			attributeId: attributeId,
			attributeType: attributeType
		});
	});
}


function removeGroupsButton() {
    let $removeGroups = $('#group-remove');
    let $selectValues = $('#select-attribute-cluster-browser');
	let $groupErrorText = $('#manage-group-error-text');
	let $groupMessageText = $('#manage-group-message-text');

	$removeGroups.on('click', function(event) {
		$groupErrorText.text('');
		$groupMessageText.text('');

		let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;

		let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

		let attributes;
		if(attributeType === 'admixture')
			attributes = ArcheoSession.getAdmixtureLegend(attributeId, true)
		else
			attributes = ArcheoSession.getAttributeLegend(attributeId, true, false, true);

		let groupsList = ArcheoSession.getAttributeGroupsList(attributeId);

		if($selectedOptions.length > 0) {
			var groupName;

			$selectedOptions.each((index) => {
				groupName = $($selectedOptions[index]).val();

				/* Remove group from the list */
				groupsList.removeEl(groupName);

				/* Remove group pointer from all associated attributes */
				let attributesIds = Object.keys(attributes);
				for(var i = 0; i < attributesIds.length; ++i) {
					let attributeInfo = attributes[ attributesIds[i] ];
					if(attributeInfo.group === groupName)
						attributeInfo.group = null;
				}
			});

			let removedGroupsCount = $selectedOptions.length;
			if(removedGroupsCount > 0)
				$groupMessageText.text(`Removed ${removedGroupsCount} groups.`);
			else if(removedGroupsCount === 1)
				$groupMessageText.text(`Removed "${groupName}" group.`);

			ArcheoEvents.broadcast('clustering-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});
		}
		else {
			$groupErrorText.text('No groups have been selected for removal.');
		}
	});
}


function modifyGroupButton() {
    let $modifyGroup = $('#group-modify');
    let $selectValues = $('#select-attribute-cluster-browser');
	let $groupErrorText = $('#manage-group-error-text');
	let $groupMessageText = $('#manage-group-message-text');

	$modifyGroup.on('click', function(event) {
		let $butt = $(event.target);
		let $buttText = $butt.find('.label');

		let isButtModifying = ArcheoUtilities.isValid( $butt.attr('modifying') );

		$groupErrorText.text('');
		$groupMessageText.text('');

		let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
		let attributeId = clusteringConfig.attributeId;
		let attributeType = clusteringConfig.attributeType;

		let attributes;
		if(attributeType === 'admixture')
			attributes = ArcheoSession.getAdmixtureLegend(attributeId, true)
		else
			attributes = ArcheoSession.getAttributeLegend(attributeId, true, false, true);

		/* Apply changes */
		if(isButtModifying) {
			let $ungroupedOptions = $selectValues.find('.filtered');
			$ungroupedOptions.each((index) => {
				let value = $($ungroupedOptions[index]).val();
				attributes[value].group = null;
			});

			let removedValuesCount = $ungroupedOptions.length;
			let groupName = $modifyGroup.attr('modifying');
			if(removedValuesCount > 0)
				$groupMessageText.text(`Removed ${removedValuesCount} attribute values from "${groupName}" group.`);
			else if(removedValuesCount === 0)
				$groupMessageText.text(`Group "${groupName}" has not been modified.`);

			resetGroupModyfing();

			ArcheoEvents.broadcast('clustering-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});
		}
		/* Setup view for modifications */
		else {
			let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
	
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');
			//let groupsList = ArcheoSession.getAttributeGroupsList(attributeId);
	
			if($selectedOptions.length === 1) {
				let $selectedGroup = $( $selectedOptions[0] ); 
				let groupName = $selectedGroup.val(); // it's only an id

				activateGroupModyfing(groupName);

				let groupsAttributes = {};
				let attributesIds = Object.keys(attributes);
				for(var i = 0; i < attributesIds.length; ++i) {
					let attributeId = attributesIds[i];
					let attributeInfo = attributes[ attributeId ];
					if(attributeInfo.group === groupName)
						groupsAttributes[attributeId] = attributeInfo;

					// Special case //
					if(attributeInfo.name == groupName) {
						attributeInfo.disabled = true;
						attributeInfo.title = "You can not exclude group's own value.";
						groupsAttributes[attributeId] = attributeInfo;
					}
				}
	
				ArcheoUI.setSelect($selectValues, groupsAttributes);
			}
			else if($selectedOptions.length > 1) {
				$groupErrorText.text('You can modify only one group at the same time.');
			} else {
				$groupErrorText.text('No group has been selected for editing.');
			}
		}	
	});
}


function initializeModifyingEvents() {
	let $selectValues = $('#select-attribute-cluster-browser');

	$selectValues.on('dblclick update', function(event) {
		let isModifyingActivated = ArcheoUtilities.isValid( $selectValues.attr('modifying') );

		if( isModifyingActivated ) {
			let $selectedOptions = $selectValues.find(':selected:not(.hidden)');

			let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
			let attributeId = clusteringConfig.attributeId;
			let attributeType = clusteringConfig.attributeType;

			let legend = ArcheoSession.getAttributeLegend(attributeId);

			let selectedCount = $selectedOptions.length;
			let filteredCount = $selectedOptions.filter('.filtered').length;

			if((filteredCount / selectedCount) >= 0.5) {
				$selectedOptions.removeClass('filtered');
			}
			else {
				$selectedOptions.addClass('filtered');
			}
		}
	});
}


function initializeAttributesSelectButtons() {
    let $selectAllButt = $('#attribute-cluster-select-all');
    let $unselectAllButt = $('#attribute-cluster-unselect-all');

    let $selectValues = $('#select-attribute-cluster-browser');

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

	let $selectInvert = $('#attribute-cluster-select-invert');

	$selectInvert.on('click', function() {
		let $allOptions = $selectValues.find('option:not(.hidden:selected)');
		let $selectedOptions = $selectValues.find('option:not(.hidden):selected');

		$allOptions.prop('selected', true);
		$selectedOptions.prop('selected', false);
	});
}

// #grouping-buttons-panel

function initializeAttributesFilterButtons() {
    let $groupAllButt = $('#attribute-cluster-group-all');
    let $ungroupAllButt = $('#attribute-cluster-ungroup-all');
    let $selectValues = $('#select-attribute-cluster-browser');

	let filterButtonFunction = function(doFilterOut) {
		return function(event) {
			let $selectedOptions = $selectValues.find('option:not(.hidden)');
	
			if(doFilterOut)
				$selectedOptions.removeClass('filtered');
			else
				$selectedOptions.addClass('filtered');
		}
	}

    $groupAllButt.on('click', filterButtonFunction(true));

	$ungroupAllButt.on('click', filterButtonFunction(false));
}



function initializeUseRegexEvent() {
	let $groupFilterRegexCheckbox = $('#group-cluster-regex');
	let $groupSearch = $('#cluster-group-search');

	$groupFilterRegexCheckbox.on('click update', function(event) {
		let value = $groupFilterRegexCheckbox.hasClass('active');
		if(event.type === 'click')
			value = !value; // negation applied intentionally
		let placeholder = $groupSearch.attr('placeholder');

		placeholder = placeholder.replace("...", "").replace(" by regex", "");

		if(value) {
			$groupSearch.attr('placeholder', `${placeholder} by regex...`);
			$groupSearch.attr('regex', "");
			$groupSearch.val('');
		}
		else {
			$groupSearch.attr('placeholder', `${placeholder}...`);
			$groupSearch.removeAttr('regex');
			$groupSearch.val('');
		}
	});
}


function initializeSearchEvents() {
	let $selectValues = $('#select-attribute-cluster-browser');
	let $groupsSearch = $('#cluster-group-search');

	$groupsSearch.on('input', function(event) {
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
	});
}


function initializeBrowserEvents() {
	let $groupsPanel = $('#attributes-clustering-group-panel');
	let $attributesPanel = $('#attributes-clustering-attribute-panel');
	let $groupSearch = $('#cluster-group-search');

	$('#attributes-clustering-object').on('change update', 'input', null, function(event) {
		var $input = $(event.target);
		var browsedObject = $input.attr('value');

		if(browsedObject === 'attributes') {
			$groupSearch.attr('placeholder', `Filter values`);
			$attributesPanel.removeClass('hidden');
			$groupsPanel.addClass('hidden');
			resetGroupModyfing();
		}
		else if(browsedObject === 'groups') {
			$groupSearch.attr('placeholder', `Filter groups`);
			$groupsPanel.removeClass('hidden');
			$attributesPanel.addClass('hidden');
		}

		/* Update search placeholder */
		$('#group-cluster-regex').trigger("update");

		updateBrowser();
	});
}


function initializeAttributeSelectEvents() {
    let $selectAttribute = $('#select-cluster-attribute');
    let $selectAttributeType = $('#select-cluster-attribute-type');
    let $selectValues = $('#select-attribute-cluster-browser');
	let $clusteringObject = $("#attributes-clustering-object");

	let $ancestorSearchInput = $('#attribute-clustering-ancestors');
    let $descendantsSearchInput = $('#attribute-clustering-descendants');
	let $resetButton = $('#attribute-clustering-reset');


	const attributeChangeEventFunction = function(event) {
		/* Update cache on interface event */
		var $select = $(event.target);
		if(event.type === 'changed') {
			let attributeId = $select.val();

			if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
				if(!(attributeId in attributesTypes)) {
					$('#attribute-grouping-wrapper').removeClass('hidden');
				}
				else {
					$('#attribute-grouping-wrapper').addClass('hidden');
				}
			} else
				$('#attribute-grouping-wrapper').addClass('hidden');

			ArcheoCache.setTemporaryEntry('attributeClustering', {
				attributeId: $select.val(),
				attributeName: $select.find(':selected').val(),
				attributeType: $select.find(':selected').attr('type')
			});
		} 

		let cache = ArcheoCache.getTemporaryEntry('attributeClustering');

		let attributeId = cache.attributeId;
		let attributeType = cache.attributeType;

		if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
			if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
				let params = {
					attributeId: attributeId,
					attributeType: attributeType,
					eventType: event.type
				};

				ArcheoRequests.incorporateAttributes(params).then(() => {
					$select.trigger('update', params);
				});
			}
		}
	};

	const updateUI = function(event, data) {
		let cache = ArcheoCache.getTemporaryEntry('attributeClustering');

		let attributeId = cache.attributeId;
		let attributeName = cache.attributeName;
		let attributeType = cache.attributeType;

		let clusteringObjectName = $clusteringObject.find("input:checked").val();
		resetGroupModyfing();

		let attributeChangeEvent = ArcheoUtilities.isValid(data) ? data.eventType : event.type;

		if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
			var $select = $(event.target);

			/* Update UI */
			if(attributeChangeEvent === 'changed') {
				let typesWrapper = $select.parent().next();

				if(attributeId in attributesTypes) {
					typesWrapper.removeClass('d-none');
					ArcheoUI.setSelectpicker( $selectAttributeType, attributesTypes[attributeId], true );

					// Reset UI //
					//$treeLevelPanel.addClass('hidden');

					return;	
				}
				else {
					typesWrapper.addClass('d-none');
				}

				//alert('attributeId');
				//alert(attributeId);

				/* Handle tree type options */
				if(ArcheoUtilities.isValidNonEmptyString(attributeId)) {
					resetTreeSearch();
					initializeTreeSearch($ancestorSearchInput, attributeId);
					initializeTreeSearch($descendantsSearchInput, attributeId);
					$resetButton.removeAttr('disabled');

					//alert(attributeType);
					//alert(clusteringObjectName);
	
					updateTreeLevelSlider($('#tree-level-clustering'), $('#attribute-clustering-tree-level-slider'), attributeId, attributeType);
				}
				else {
					$resetButton.attr('disabled', '');
				}	
			}

			/* Fix for hiding tree search when switching to groups */
			toggleTreeSearch(attributeType, clusteringObjectName);

			let attributesDict;

			if(attributeType === 'admixture') {
				attributesDict = ArcheoSession.getAdmixtureLegend(attributeId, true, true, true);
				delete attributesDict.OTHER;
				delete attributesDict.MISSING;
			} else
				attributesDict = ArcheoSession.getAttributeLegend(attributeId, true, false, true);

			let groups = ArcheoSession.getAttributeGroupsLegend(attributeId);

			if(clusteringObjectName === 'attributes') {
				/* Filter out grouped attributes */
				attributesDict = ArcheoUtilities.filterObject(attributesDict, 
					([key]) => !( ArcheoUtilities.isValid(attributesDict[key].group) ) && !(key in groups) );
			}
			else if(clusteringObjectName === 'groups') {
				attributesDict = groups;
			}

			ArcheoUI.setSelect($selectValues, attributesDict);
			$selectValues.attr('attributeId', attributeId);
			$selectValues.attr('attributeType', attributeType);

			ArcheoCache.setTemporaryEntry('attributeClustering', {
				attributeId: attributeId,
				attributeType: attributeType
			});
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
	let $resetButton = $('#attribute-clustering-reset');

	$resetButton.on('click', resetClustering);
}


function initializeAttributeClusteringEvents() {
    initializeAttributeSelectEvents();
	initializeBrowserEvents();
	initializeSearchEvents();
	initializeUseRegexEvent();

	initializeAttributesSelectButtons();
	initializeAttributesFilterButtons();
	initializeNewGroupButton();

	initializeModifyingEvents();

	removeGroupsButton();
	modifyGroupButton();

	treeSelectEvents();
	treeLevelClusteringEvents();
	initializeRootWordClusteringEvents();

	resetButtonEvents();
}


export default initializeAttributeClusteringEvents;