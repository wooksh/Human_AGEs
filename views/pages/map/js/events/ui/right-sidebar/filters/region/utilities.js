function resetFiltering(filtered = false, triggerEvent = true) {
	let $regionSelect = $('#select-filter-region');

	let regionTypeId = $regionSelect.val().split('__')[1];

	if( ArcheoUtilities.isValidNonEmptyString(regionTypeId) ) {
		let regions = ArcheoSession.getRegionLegend(regionTypeId, true);

		/* Reset regions filtering */
		Object.keys(regions).forEach((key) => {
			regions[key].filtered = filtered;
		});

		if(triggerEvent) {
			ArcheoEvents.broadcast('filter-region-change', null, {
				regionTypeId: regionTypeId
			});

			updateBrowser();
		}
	}
}


function updateBrowser() {
	let $regionSelect = $('#select-filter-region');
	$regionSelect.trigger('update');
}


export {resetFiltering};