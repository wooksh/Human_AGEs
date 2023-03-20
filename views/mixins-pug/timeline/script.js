function initializeTimelineSlider(selector, params = null) {
	var $timeline = $(selector);

    if(params === null)
        params = {};

    $timeline.ionRangeSlider({
        type: "double", 
        grid: true,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
        hide_min_max: true,
		prettify: ArcheoUtilities.getFormattedYear,
        keyboard: true,
        skin: "flat",
        ...params
	});

	return $timeline.data("ionRangeSlider");
}


export { initializeTimelineSlider };