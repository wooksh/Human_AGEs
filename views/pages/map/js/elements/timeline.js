import { initializeTimelineSlider } from 'Views/mixins-pug/timeline/script.js';


function initializeTimeline(selector = "#timeline") {
	let timelineInfo = ArcheoSession.get().filters.timeline;

	var $timelineRangeObj = initializeTimelineSlider(selector, {
		min: window.metadata.TimePeriod.minYear,
		max: window.metadata.TimePeriod.maxYear,

		min: timelineInfo.minYear,
		max: timelineInfo.maxYear,
		from: timelineInfo.yearFrom,
		to: timelineInfo.yearTo
	});

	let timeChangeEvent = async function(data) {
		ArcheoEvents.broadcast('time-filter-update', selector, {
			yearFrom: data.from,
			yearTo: data.to,
		}, 100);
	}

	$timelineRangeObj.update({
		onChange: async function(data) {
			if(ArcheoSession.get().filters.timeline.eventOnFinish === false) {
				timeChangeEvent(data);
			}
		},	
		onFinish: async function(data) {
			if(ArcheoSession.get().filters.timeline.eventOnFinish === true)
				timeChangeEvent(data);
		}
	});
}


function initializeTimelineRange(selector = "#timeline-range") {
	let timelineInfo = ArcheoSession.get().filters.timeline;
	var $timelineRangeObj = initializeTimelineSlider(selector, {
		from: timelineInfo.minYear,
		to: timelineInfo.maxYear,

		min: window.metadata.TimePeriod.minYear,
		max: window.metadata.TimePeriod.maxYear,

		hide_from_to: true,
		hide_min_max: true
	});

	let timeChangeEvent = async function(data) {
		let timelineInfo = ArcheoSession.get().filters.timeline;
		timelineInfo = ArcheoSession.get().filters.timeline;

		let minOffset = timelineInfo.minYear - data.from;
		let maxOffset = timelineInfo.maxYear - data.to;

		let fromValue = timelineInfo.yearFrom;
		let toValue = timelineInfo.yearTo;

		if(minOffset !== 0 && maxOffset !== 0) {
			fromValue -= maxOffset;
			toValue -= maxOffset;
		}

		ArcheoEvents.broadcast('time-filter-update', selector, {
			minYear: data.from,
			maxYear: data.to,
			yearFrom: fromValue,
			yearTo: toValue
		}, 100);
	}

	$timelineRangeObj.update({
		onChange: async function(data) {
			if(ArcheoSession.get().filters.timeline.eventOnFinish === false)
				timeChangeEvent(data);
		},
		onFinish: async function(data) {
			if(ArcheoSession.get().filters.timeline.eventOnFinish === true)
				timeChangeEvent(data);
		}
	});

	//$(selector).trigger('time-filter-update');
}


export {
	initializeTimeline,
	initializeTimelineRange
}