import tinygradient from 'tinygradient';


function changeLayerColorEvent() {
    $('html').on('layer-color-change', '.layer', function(event, data) {
        var $layer = $(event.target);
        var layerId = $layer.attr('id');

        if( data.layerId === layerId ) {
            var $el = $layer.find('.accordion-wrapper');

            $el.css('border-color', data.value);
            $el.css('border-image', 'none');

            /* Change input color button as well just to synchronize it with legend color picker */
            $layer.find('.layer-color-input .color').css('background-color', data.value);	  
        }
    });
}


function changeLayerGradientEvent() {
    $('html').on('layer-gradient-change', '.layer', function(event, data) {
        var $layer = $(event.target);
        var layerId = $layer.attr('id');

        if( data.layerId === layerId ) {
            /* Update grapick object */
            let gradientInput = $($layer.find('.layer-gradient-input')[0]);

            let gradientInputObj = gradientInput.prop('grapick');

            ArcheoUI.setGradientValue(gradientInputObj, data.value);
        }
    });

    $('html').on('layer-gradient-change', '.layer-header', function(event, data) {
        var $layerHeader = $(event.target);
        var $layerWrapper = $layerHeader.parent();
        var $layer = $layerHeader.parents('.layer');
        var layerId = $layer.attr('id');

        if( data.layerId === layerId ) {
            /* Change accordion highlight */
            let cssGradient = tinygradient(data.value).css();

            $layerWrapper.css('border-image', cssGradient);
            $layerWrapper.css('border-image-slice', '1');

           // $layer.find('.layer-color-input .color').css('border-image', cssGradient);
        }
    });
}


function initializeLayerColorChangeEvents() {
    changeLayerColorEvent();
    changeLayerGradientEvent();
}


export default initializeLayerColorChangeEvents;