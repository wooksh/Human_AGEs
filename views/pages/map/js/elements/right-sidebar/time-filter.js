function initializeTimeFilter(lang) {
	var $timefilter = $("#time-filter");

	var timelineMinMax = [
		ArcheoSession.get().filters.timeline.minYear,
		ArcheoSession.get().filters.timeline.maxYear
	];

	var metaTimelineMinMax = [
		window.metadata.TimePeriod.minYear,
		window.metadata.TimePeriod.maxYear
	];

	/* Hook used UI elements to their events */
	ArcheoUI.initializeRangeSpinner( $timefilter.find('#filter-from-to'), timelineMinMax, true, window.getLang() );
	ArcheoUI.initializeRangeSpinner( $timefilter.find('#filter-min-max'), metaTimelineMinMax, true, window.getLang() );

	//initializeTimeFilterEvents();

	//$timefilter.trigger('time-filter-update');
}


export default initializeTimeFilter;