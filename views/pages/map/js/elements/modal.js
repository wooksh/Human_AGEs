function initializeFeaturesModals() {
    $( "#gradient-modal" ).dialog({
        appendTo: "#map-wrapper",
        autoOpen: false,
        show: { effect: "fade", duration: 500 },
        hide: { effect: "fade", duration: 500 },
        position: { my: "left top", at: "left top", of: $('#legend-layers') },
        draggable: false,
        resizable: false
    });

    $( "#pattern-modal" ).dialog({
        appendTo: "#map-wrapper",
        autoOpen: false,
        show: { effect: "fade", duration: 500 },
        hide: { effect: "fade", duration: 500 },
        position: { my: "left top", at: "left top", of: $('#legend-regions') },
        draggable: false,
        resizable: false
    });

    /*$(".map-modal-content").mCustomScrollbar({
        theme: "minimal-dark",
        scrollbarPosition: "outside",
        scrollInertia: 100
    });*/
}


function intitializeOptionsModals() {
    let $photoDPI = $('#photo-modal #photo-dpi');

    $photoDPI.spinner({
		culture: window.getLang(),
		min: 96,
		max: 1000,
		numberFormat: "n",
		step: 1
	});

	$photoDPI.spinner( "value", 96 );
}


function initializeModals() {
    initializeFeaturesModals();
    intitializeOptionsModals();
}


export default initializeModals;