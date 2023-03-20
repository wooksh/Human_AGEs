import attributes from 'Pages/map/data/attributes.json';
import attributesTypes from 'Pages/map/data/attributesTypes.json';


function initializeLayerColorpicker() {
    var $picker = $('#legend-layer-color-picker');

    /* Initialize attribute color picker */
    ArcheoUI.initializeColorInput($picker, {
        palette: 'layer',
        appendTo: "#map-wrapper",
        containerClassName: 'legend-layer-color-picker'
    }, null, function(event, color) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let rgbColor = color.toRgbString();

            let layerId = $symbol.layerId;
            let layerType = $symbol.layerType;

            if(layerType !== 'heatmap')
                ArcheoEvents.broadcast('layer-color-change', null, {
                    layerId: layerId,
                    value: rgbColor
                });

            /* Modify legend entry */
            //ArcheoSession.get().legend.layers[ layerId ]...;

            /* Update all data appearance */
            //ArcheoMap.triggerLayerStyleFunction();
        }
    }, ['move', 'change']);

    $picker.on(`dragstop.spectrum change.spectrum`, function() {
        setTimeout(() => {ArcheoMap.triggerLayerStyleFunction();}, 50);
    });

    let $gradient = $('#legend-layer-gradient');
    let gradientObj = ArcheoUI.initializeGradientInput($gradient, "#map-wrapper");
    $gradient.prop('grapick', gradientObj);

    //$('#legend-layer-gradient-wrapper').prependTo('.legend-layer-color-picker');
}


function initializeAttributeColorpicker() {
    var $picker = $('#legend-attribute-color-picker');

    /* Initialize attribute color picker */
    ArcheoUI.initializeColorInput($picker, {
        palette: 'default',
        appendTo: "#map-wrapper"
    }, null, function(event, color) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let rgbColor = color.toRgbString();

            let attributeValue = $symbol.attributeValue;
            let attributeName = $symbol.attributeName;

            /* Modify legend entry */
            let legend = ArcheoSession.get().legend.attributes;
            let legendEntry = legend[ attributeValue ] || legend[ attributeName ][ attributeValue ];
            legendEntry.color = rgbColor;

            /* Update all data appearance */
            ArcheoMap.triggerLayerStyleFunction();
        }
    });

    $picker.on(`dragstop.spectrum`, function() {
        setTimeout(() => {ArcheoMap.triggerLayerStyleFunction();}, 50);
    });
}


function initializeRegionColorpicker() {
    /* Initialize background color picker */
    var $backgroundPicker = $('#legend-region-background-color-picker');

    ArcheoUI.initializeColorInput($backgroundPicker, {
        appendTo: "#map-wrapper",
        palette: 'default',
        containerClassName: 'legend-region-background-color-picker'
    }, null, function(event, color) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');
        let rgbColor = color.toRgbString();

        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;// siblings('.legend-text').text();
            let regionType = $symbol.regionType;// parents('.region-legend').attr('region-type');

            /* Change legend entry property value */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].color.background = rgbColor;

            /* Set buttons colors */
            $('#region-background-color-butt').find('.color').css('background-color', rgbColor);

            // Update all data appearance //
            ArcheoMap.triggerLayerStyleFunction();
        }
    });

    $backgroundPicker.on(`dragstop.spectrum`, function() {
        setTimeout(() => {ArcheoMap.triggerLayerStyleFunction();}, 50);
    });

    /* Initialize pattern color picker */
    var $patternPicker = $('#legend-region-pattern-color-picker');

    ArcheoUI.initializeColorInput($patternPicker, {
        appendTo: "#map-wrapper",
        palette: 'default',
        containerClassName: 'legend-region-pattern-color-picker'
    }, null, function(event, color) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');
        let rgbColor = color.toRgbString();

        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;// siblings('.legend-text').text();
            let regionType = $symbol.regionType;// parents('.region-legend').attr('region-type');

            /* Change legend entry property value */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].color.pattern = rgbColor;

            /* Set buttons colors */
            $('#region-pattern-color-butt').find('.color').css('background-color', rgbColor);

            // Update all data appearance //
            ArcheoMap.triggerLayerStyleFunction();
        }
    });

    $patternPicker.on(`dragstop.spectrum`, function() {
        setTimeout(() => {ArcheoMap.triggerLayerStyleFunction();}, 50);
    });

    /* Move controls */
    //$('#legend-region-color-settings').prependTo('.region-color-picker').removeClass('d-none');

    let $patternSelect = $('#legend-select-pattern-type');
    $patternSelect.selectpicker();

    let $scaleSlider = $('#legend-pattern-scale');
    ArcheoUI.initializeSlider($scaleSlider, {
		min: 0.1,
		max: 4,
		from: 1,
		step: 0.1,
		type: 'single',
		//postfix: 'px',
		//drag_interval: true,
		//...params
	});

    let $spacingSlider = $('#legend-pattern-spacing');
    ArcheoUI.initializeSlider($spacingSlider, {
		min: 5,
		max: 50,
		from: 18,
		step: 1,
		type: 'single',
		//postfix: 'px',
		//drag_interval: true,
		//...params
	});

    let $anglepicker = $('#pattern-anglepicker');
    $anglepicker.anglePicker({	
		flat: true
		, value: 0 // !
		, enableCenter: true
		, centerSize: 20
		, size: 75
		, handleSize: 15
		, handleType: "default"
		, snap: 1
		, showValue: true
		, start: -90
		, showValueAlwaysEnabled: true
	});
}
    
    
function initializeMapLegend() {
    ArcheoLegend.initialize(attributes, attributesTypes);
    initializeLayerColorpicker();
    initializeAttributeColorpicker();
    initializeRegionColorpicker();
}


export default initializeMapLegend;