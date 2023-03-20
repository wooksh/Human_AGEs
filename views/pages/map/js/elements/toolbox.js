function initializeColorInputs() {
	/* Body Color */
	var $layerColorInputs = $('.basemap-layers-visibility .basemap-layer-color');

    $layerColorInputs.each(function() {
        ArcheoUI.initializeColorInput($(this), {
            appendTo: "#map-wrapper",
            color: "#fff",
            palette: 'default'
        });
    })
}


function initializeToolboxElements() {
    initializeColorInputs();
}


export default initializeToolboxElements;