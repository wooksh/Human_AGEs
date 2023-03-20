function resetTreeSearch(elementsDic) {
	let $descendantsSearchInput = elementsDic.descendantsInput;
    let $ancestorSearchInput = elementsDic.ancestorsInput;

	$descendantsSearchInput.val('');
	$descendantsSearchInput.attr('searched-label', '');
	$descendantsSearchInput.attr('searched-value', '');

	$ancestorSearchInput.val('');
	$ancestorSearchInput.attr('searched-label', '');
	$ancestorSearchInput.attr('searched-value', '');
}


function toggleTreeSearch(elementsDic, attributeType, clusteringObjectName = 'attributes') {
	let $treeClusteringOptionsPanel = elementsDic.treePanel;

	if(attributeType === 'tree' && clusteringObjectName === 'attributes')
		$treeClusteringOptionsPanel.removeClass('hidden');
	else
		$treeClusteringOptionsPanel.addClass('hidden');
}


function resetFiltering(elementsDict, layerId, filtered = false, triggerEvent = true) {
	let layerConfig = ArcheoSession.get().layers[layerId];
	let attributeId = layerConfig.attributeId;
	let attributeType = layerConfig.attributeType;

	if( ArcheoUtilities.isValidNonEmptyString(attributeId) ) {
		layerConfig.style.componentValues.data = "selectAll";

		ArcheoEvents.broadcast('layer-attribute-change', null, {
			layerId: layerId,
			//data.eventType
			attributeId: attributeId,
			//attributeName: attributeTitle,
			attributeType: attributeType
		});

		/*elementsDict.browser.trigger('layer-attribute-change', {
			layerId: layerId,
			attributeId: attributeId,
			attributeType: attributeType
		});*/

		/*let legend = ArcheoSession.getAttributeLegend(attributeId);
		
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

		if(triggerEvent)
			ArcheoEvents.broadcast('filter-attribute-change', null, {
				attributeId: attributeId,
				attributeType: attributeType
			});*/
	}
}


export {
	resetTreeSearch,
	toggleTreeSearch,
	resetFiltering
}