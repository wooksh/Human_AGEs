function completeCallTimeData(data) {
	let timelineInfo = ArcheoSession.get().filters.timeline;

	data.showPresent = data.showPresent || timelineInfo.showPresent;
	data.yearTo = data.yearTo || timelineInfo.yearTo;
	data.yearTo = data.yearTo || timelineInfo.yearTo;
	data.yearFrom = data.yearFrom || timelineInfo.yearFrom;
	data.minYear = data.minYear || timelineInfo.minYear;
	data.maxYear = data.maxYear || timelineInfo.maxYear;

	return data;
}


function initializeTimelineConfigCheckboxEvent($checkbox, option) {
	$checkbox.on('click', function(event) {
		/* The button status will be changed only after click event, thus negation */
		var isToggled = ! $checkbox.hasClass('active'); // negation applied on purpose
		ArcheoSession.get().filters.timeline[option] = isToggled;

		ArcheoEvents.broadcast('time-filter-update', null, {});
	});
}


export { completeCallTimeData, initializeTimelineConfigCheckboxEvent };