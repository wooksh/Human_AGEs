function resetTreeSearch() {
	let $descendantsSearchInput = $('#attribute-filtering-descendants');
    let $ancestorSearchInput = $('#attribute-filtering-ancestors');

	$descendantsSearchInput.val('');
	$descendantsSearchInput.attr('searched-label', '');
	$descendantsSearchInput.attr('searched-value', '');

	$ancestorSearchInput.val('');
	$ancestorSearchInput.attr('searched-label', '');
	$ancestorSearchInput.attr('searched-value', '');
}


function toggleTreeSearch(attributeType, clusteringObjectName = 'attributes') {
	let $treeClusteringOptionsPanel = $('#tree-filter-select-panel');

	if(attributeType === 'tree' && clusteringObjectName === 'attributes')
		$treeClusteringOptionsPanel.removeClass('hidden');
	else
		$treeClusteringOptionsPanel.addClass('hidden');
}


function toggleAdmixture(attributeType, clusteringObjectName = 'attributes') {
	let $admixturePanel = $('#admixture-filtering');

	if(attributeType === 'admixture' && clusteringObjectName === 'attributes')
		$admixturePanel.removeClass('hidden');
	else
		$admixturePanel.addClass('hidden');
}


function resetFiltering(filtered = false, triggerEvent = true) {
	let filteringConfig = ArcheoCache.getTemporaryEntry('attributeFiltering');
	let attributeId = filteringConfig.attributeId;
	let attributeType = filteringConfig.attributeType;

	if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
		let legend = ArcheoSession.getAttributeLegend(attributeId);
		
		let attributesLegend;
		if(attributeType === 'admixture')
			attributesLegend = ArcheoSession.getAdmixtureLegend(attributeId, true);
		else
			attributesLegend = ArcheoSession.getAttributeLegend(attributeId, true);

		let attributesValues = Object.keys(attributesLegend);

		for(var i = 0; i < attributesValues.length; ++i) {
			let value = attributesValues[i];
			legend[value].filtered = filtered;
		}

		if(triggerEvent) {
			ArcheoEvents.broadcast('filter-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});

			updateBrowser();
		}
	}
}


function updateBrowser(event, params = {}) {
	if( !ArcheoUtilities.isValid(params.doNotRefreshBrowser) ) {
		let $selectAttribute = $('#select-filter-attribute');
		let $selectAttributeType = $('#select-filter-attribute-type');
		
		$selectAttribute.trigger('update');
		$selectAttributeType.trigger('update');
	}
}


export {
	resetTreeSearch,
	toggleTreeSearch,
	updateBrowser,
	resetFiltering,
	toggleAdmixture
}