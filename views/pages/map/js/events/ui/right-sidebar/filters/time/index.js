import {completeCallTimeData, initializeTimelineConfigCheckboxEvent} from './utilities.js';


function onTimelineUpdate(selector = "#timeline") {
    $(selector).on('time-filter-update session-load', function(event, data = {}) {
		completeCallTimeData(data);

		$(event.target).data("ionRangeSlider").update({
			min: data.minYear, 
			max: data.maxYear, 
			from: data.yearFrom, 
			to: data.yearTo
		});
	});
}


function onTimelineRangeUpdate(selector = "#timeline-range") {
    $(selector).on('time-filter-update session-load', function(event, data = {}) {
		completeCallTimeData(data);

		$(event.target).data("ionRangeSlider").update({
			from: data.minYear, 
			to: data.maxYear
		});
	});
}


function initializeTimelineSettingsEvents() {
	$('#time-filter').on('time-filter-update session-load', function(event, data = {}) {
		completeCallTimeData(data);

		let $min = $(event.target).find('#filter-min-max .input-years-from input');
		let $max = $(event.target).find('#filter-min-max .input-years-to input');

		$min.val(data.minYear); 			
		$max.val(data.maxYear);

		$min.trigger('change');
		$max.trigger('change');

		let $from = $(event.target).find('#filter-from-to .input-years-from input');
		let $to = $(event.target).find('#filter-from-to .input-years-to input');

		$from.attr('min', data.minYear); 	
		$from.attr('max', data.maxYear);

		$to.attr('min', data.minYear); 	
		$to.attr('max', data.maxYear);

		$from.val(data.yearFrom); 			
		$to.val(data.yearTo);

		$from.trigger('change');
		$to.trigger('change');

		let minMaxedFrom = parseInt( $from.attr('value') );
		let minMaxedTo = parseInt( $to.attr('value') );

		data.yearFrom = minMaxedFrom;
		data.yearTo = minMaxedTo;
	});


	$('#filter-min-max input').on('change', function(event) {
		if( ArcheoUtilities.isHumanTriggeredEvent(event) ) {
			let fromValue = parseInt( $('#filter-min-max .input-years-from input').attr('value') );
			let toValue = parseInt( $('#filter-min-max .input-years-to input').attr('value') );

			if(!event.isTrigger)
				ArcheoEvents.broadcast('time-filter-update', null, {
					minYear: fromValue,
					maxYear: toValue
				}, 100);
		}
	});


	$('#filter-from-to input').on('change', function(event) {
		if( ArcheoUtilities.isHumanTriggeredEvent(event) ) {
			let fromValue = parseInt( $('#filter-from-to .input-years-from input').attr('value') );
			let toValue = parseInt( $('#filter-from-to .input-years-to input').attr('value') );

			if(!event.isTrigger)
				ArcheoEvents.broadcast('time-filter-update', null, {
					yearFrom: fromValue,
					yearTo: toValue
				}, 100);
		}
	});
}


function initializePresetTimeButtonEvents() {
	$('#present-switch').parent().on('click', function(event) {
		let value = ! $('#present-switch').prop('checked') // negated on purpose;

		if(ArcheoUtilities.isHumanTriggeredEvent(event)) {
			ArcheoSession.get().filters.timeline.showPresent = value;

			ArcheoEvents.broadcast('time-present-filter-update', '#present-switch', {showPresent: value}, 100);
		}
	});


	$('#present-switch').on('time-present-filter-update session-load', function(event, data) {
		completeCallTimeData(data);

		let doShowPresent = data.showPresent;
		if( doShowPresent !== $('#present-switch').prop('checked') )
			$('#present-switch').parent().trigger('click');
	});
}


function initializePresentTimeCheckboxEvents() {
	$('#time-filter-present-toggle').on('click update', function(event) {
		let $obj = $(event.target);
		let value;

		if( event.type === 'click')
			/* The class did not managed to switch yet, so the check must be negated for true value */
			value = ! $obj.hasClass('active'); // negation applied intentionally
		else
			value = $obj.hasClass('active');

		if(ArcheoUtilities.isHumanTriggeredEvent(event)) {
			ArcheoSession.get().filters.timeline.showPresent = value;	
			ArcheoEvents.broadcast('time-present-filter-update', '#time-filter-present-toggle', {showPresent: value}, 100);
		}
	});


	$('#time-filter-present-toggle').on('time-present-filter-update session-load', function(event, data) {
		let $obj = $(event.target);

		completeCallTimeData(data);
		let doShowPresent = data.showPresent;

		if( doShowPresent === true ) {
			$obj.addClass('active')
		} else {
			$obj.removeClass('active')
		}
	});
}

		
// completeCallTimeData(data); 


function filterTriggerEvents() {
	let $trigger = $('#time-filter_trigger');

	$trigger.on('click', function(event) {
		/* The button status will be changed only after click event, thus negation */
		var isToggled = ! $(event.target).hasClass('active'); // negation applied on purpose
		ArcheoSession.get().filters.timeline.isActive = isToggled;

		ArcheoEvents.broadcast('time-filter-update', null, {});
	});
}


function initializeMoreTimeFilteringEvents() {
	initializeTimelineConfigCheckboxEvent($('#time-filter-regions-filter-toggle'), 'doFilterRegions');
}


function initializeAppearanceEvents() {
	initializeTimelineConfigCheckboxEvent($('#time-filter-propability-toggle'), 'showPropability');
}


function initializeOptimizationEvents() {
	initializeTimelineConfigCheckboxEvent($('#time-filter-onfinish-toggle'), 'eventOnFinish');
}


function initializeSessionLoadEvents() {
	$('#time-filter_trigger').on('session-load', function() {
		let isActive = ArcheoSession.get().filters.timeline.isActive;
		ArcheoUI.toggleCheckbox($('#time-filter_trigger'), isActive);
	});

	$('#time-filter-regions-filter-toggle').on('session-load', function() {
		let doFilterRegions = ArcheoSession.get().filters.timeline.doFilterRegions;
		ArcheoUI.toggleCheckbox($('#time-filter-regions-filter-toggle'), doFilterRegions);
	});

	$('#time-filter-propability-toggle').on('session-load', function() {
		let showPropability = ArcheoSession.get().filters.timeline.showPropability;
		ArcheoUI.toggleCheckbox($('#time-filter-propability-toggle'), showPropability);
	});

	$('#time-filter-onfinish-toggle').on('session-load', function() {
		let eventOnFinish = ArcheoSession.get().filters.timeline.eventOnFinish;
		ArcheoUI.toggleCheckbox($('#time-filter-onfinish-toggle'), eventOnFinish);
	});
}


function initializeTimelineEvents() {
    onTimelineUpdate("#timeline");
	onTimelineRangeUpdate("#timeline-range");
    initializeTimelineSettingsEvents();
	initializePresetTimeButtonEvents();
	filterTriggerEvents();
	initializePresentTimeCheckboxEvents();

	initializeMoreTimeFilteringEvents();
	initializeAppearanceEvents();
	initializeOptimizationEvents();

	initializeSessionLoadEvents();
}


export default initializeTimelineEvents;