function addGroupToLegend(legend, groupName) {
	if( !(groupName in legend) ) {
		legend[ groupName ] = { 
			name: groupName,
			filtered: false,
			color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
			group: null
		};
	}

	if( !( legend._groups.has(groupName) ) ) {
		legend._groups.push( groupName )
	}
}


function updateBrowser() {
	let $selectAttribute = $('#select-cluster-attribute');
    let $selectAttributeType = $('#select-cluster-attribute-type');
	
	$selectAttribute.trigger('update');
	$selectAttributeType.trigger('update');
}


function resetGroupModyfing() {
	let $modifyGroup = $('#group-modify');
    let $removeGroups = $('#group-remove');
    let $selectValues = $('#select-attribute-cluster-browser');
	let $groupErrorText = $('#manage-group-error-text');
	let $modifyingMessage = $('#modifying-message-text');
	let $groupingButtonsPanel = $('#grouping-buttons-panel');

	$groupErrorText.text('');
	$selectValues.removeAttr('modifying');
	$modifyGroup.removeAttr('modifying');
	$modifyGroup.text('Modify group');
	$modifyGroup.removeClass('highlit');
	$modifyingMessage.text('');
	$removeGroups.removeAttr('disabled');
	$groupingButtonsPanel.addClass('hidden');
}


function activateGroupModyfing(groupName) {
	let $modifyGroup = $('#group-modify');
    let $removeGroups = $('#group-remove');
    let $selectValues = $('#select-attribute-cluster-browser'); 
	let $groupErrorText = $('#manage-group-error-text');
	let $modifyingMessage = $('#modifying-message-text');
	let $groupMessageText = $('#manage-group-message-text');
	let $groupingButtonsPanel = $('#grouping-buttons-panel');

	$groupErrorText.text('');
	$groupMessageText.text('');
	$selectValues.attr('modifying', groupName);
	$modifyGroup.attr('modifying', groupName);
	$modifyGroup.text('Apply edit');
	$modifyGroup.addClass('highlit');
	$modifyingMessage.text(`Modifying content of a group "${groupName}".`);
	$removeGroups.attr('disabled', '');
	$groupingButtonsPanel.removeClass('hidden');
}


function resetTreeSearch() {
	let $descendantsSearchInput = $('#attribute-clustering-descendants');
    let $ancestorSearchInput = $('#attribute-clustering-ancestors');

	$descendantsSearchInput.val('');
	$descendantsSearchInput.attr('searched-label', '');
	$descendantsSearchInput.attr('searched-value', '');

	$ancestorSearchInput.val('');
	$ancestorSearchInput.attr('searched-label', '');
	$ancestorSearchInput.attr('searched-value', '');
}


function toggleTreeSearch(attributeType, clusteringObjectName = 'attributes') {
	let $treeClusteringOptionsPanel = $('#tree-clustering-select-panel');

	if(attributeType === 'tree' && clusteringObjectName === 'attributes')
		$treeClusteringOptionsPanel.removeClass('hidden');
	else
		$treeClusteringOptionsPanel.addClass('hidden');
}


function resetClustering(triggerEvent = true) {
	let clusteringConfig = ArcheoCache.getTemporaryEntry('attributeClustering');
	let attributeId = clusteringConfig.attributeId;
	let attributeType = clusteringConfig.attributeType;

	if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
		let legend = ArcheoSession.getAttributeLegend(attributeId);
		let attributesLegend = ArcheoSession.getAttributeLegend(attributeId, true, false, true);
		let attributesValues = Object.keys(attributesLegend);

		for(var i = 0; i < attributesValues.length; ++i) {
			let value = attributesValues[i];
			legend[value].group = null;
		}

		legend._groups = [];

		if(triggerEvent)
			ArcheoEvents.broadcast('clustering-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});
	}
}


export {
	addGroupToLegend,
	updateBrowser,
	resetGroupModyfing,
	activateGroupModyfing,
	resetTreeSearch,
	toggleTreeSearch,
	resetClustering
}