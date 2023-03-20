function changeAttributeFilterEvent() {
    $('#map').on('filter-attribute-change filter-region-change', function(event, data) {
		ArcheoMap.triggerClusterFilters();
		ArcheoMap.triggerLayerStyleFunction();
	});
}


function initializeFilterEvents() {
    changeAttributeFilterEvent();
}


export default initializeFilterEvents;