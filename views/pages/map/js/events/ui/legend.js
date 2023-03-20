function layerColorChangeOnClickEvents() {
    $('#legend').on('click', '.legend-layer-symbol', null, function(event) {
        let $symbol = $(event.target);

        let layerId = $symbol.parents('.layer-legend').attr('layer-id');
        let layerType = ArcheoSession.get().layers[ layerId ].type;

        ArcheoCache.setTemporaryEntry('$symbol', {
            layerId: layerId,
            layerType: layerType
        });

        let layerConfig = ArcheoSession.get().layers[layerId];

        let symbolPosition = $symbol.offset();

        if(layerType === 'heatmap') {
            let $gradient = $('#legend-layer-gradient');

            let gradientObj = $gradient.prop('grapick');

            // Powoduje problem, usuwa znacznik fixed
            //// gradientObj.setValue( $symbol.css('background') );

            ArcheoUI.setGradientValue(gradientObj, layerConfig.style.gradient);

            /* Show gradient input */
            //$('#legend-layer-gradient-wrapper').removeClass('d-none');
            
            $("#gradient-modal").dialog("option", "position", { my: "left top", at: "left top", of: $symbol });
            $('#gradient-modal').dialog( "open" ); 
        }
        else {
            $('#legend-layer-color-picker').spectrum("set", $symbol.css('background-color'));
            $('#legend-layer-color-picker').spectrum('show');

            let container = $('#legend-layer-color-picker').spectrum('container');
            container.css('top', symbolPosition.top);
            container.css('left', symbolPosition.left);

            /*showRegionPickerControls('.legend-layer-color-picker');
           */
        }

        return false;
    });
}


function layerGradientOnChange() {
    let $gradient = $('#legend-layer-gradient');
    let gradientObj = $gradient.prop('grapick');

    var changeFunction = function(handler) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let layerId = $symbol.layerId;
            let layerType = $symbol.layerType;

            var gradientColor = gradientObj.getColorValue();

            /* Validate whether any gradient has been set */
            if(ArcheoUtilities.isValidNonEmptyString(gradientColor)) {
                ArcheoEvents.broadcast('layer-gradient-change', '#legend-layer-gradient', {
                    layerId: layerId,
                    value: ArcheoUtilities.gradientToArray(gradientColor)
                    //css: gradientObj.getValue()
                });
            }
        }
	};


    gradientObj.on(`change`, changeFunction);
	gradientObj.on(`handler:color:change`, changeFunction);
	gradientObj.on(`handler:drag:end`, changeFunction);
	gradientObj.on(`handler:remove`, changeFunction);	
	gradientObj.on(`handler:add`, changeFunction);	
}


function attributeColorChangeOnClickEvents() {
    $('#legend').on('click', '.legend-symbol.attribute', null, function(event) {
        let $symbol = $(event.target);

        let attributeValue = $symbol.siblings('.legend-text').text();
        let attributeName = $symbol.parents('.attribute-section-wrapper').attr('attribute-id');

        ArcheoCache.setTemporaryEntry('$symbol', {
            attributeValue: attributeValue,
            attributeName: attributeName
        });

        let symbolPosition = $symbol.offset();

        $('#legend-attribute-color-picker').spectrum("set", $symbol.css('background-color'));
        $('#legend-attribute-color-picker').spectrum('show');

        let container = $('#legend-attribute-color-picker').spectrum('container');

        container.css('top', symbolPosition.top);
        container.css('left', symbolPosition.left);

        return false;
    });
}


function regionColorChangeOnClickEvents() {
    let $backgroundButt = $('#region-background-color-butt');
    let $patternButt = $('#region-pattern-color-butt');
    let $patternSelect = $('#legend-select-pattern-type');
    let $scaleSlider = $('#legend-pattern-scale').data("ionRangeSlider");
    let $spacingSlider = $('#legend-pattern-spacing').data("ionRangeSlider");
    let $anglepicker = $('#pattern-anglepicker');

    $backgroundButt.on('click', function() {
        let color = $backgroundButt.find('.color').css('background-color');

        $('#legend-region-background-color-picker').spectrum("set", color);
        $('#legend-region-background-color-picker').spectrum('show');

        return false;
    });

    
    $patternButt.on('click', function(event) {
        let color =  $patternButt.find('.color').css('background-color');

        $('#legend-region-pattern-color-picker').spectrum("set", color);
        $('#legend-region-pattern-color-picker').spectrum('show');

        return false;
    });


    $patternSelect.on('change', function (event) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;
            let regionType = $symbol.regionType;

            /* Modify legend entry */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].pattern.type = $patternSelect.val();

            /* Update all data appearance */
            ArcheoMap.triggerLayerStyleFunction();
        }

        return false;
	});

    var eventFunction = async function(data) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;
            let regionType = $symbol.regionType;

            /* Modify legend entry */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].pattern.scale = data.from;

            /* Update all data appearance */
            ArcheoMap.triggerLayerStyleFunction();
        }

        return false;
	};

	$scaleSlider.update({
        onFinish: eventFunction
    });


    var eventFunction = async function(data) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');

        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;
            let regionType = $symbol.regionType;

            /* Modify legend entry */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].pattern.spacing = data.from;

            /* Update all data appearance */
            ArcheoMap.triggerLayerStyleFunction();
        }
	
        return false;
    };

	$spacingSlider.update({
        onFinish: eventFunction
    });


    var eventFunction = async function(event, data) {
        let $symbol = ArcheoCache.getTemporaryEntry('$symbol');
        
        if( ArcheoUtilities.isValid($symbol) ) {
            let regionName = $symbol.regionName;
            let regionType = $symbol.regionType;

            /* Modify legend entry */
            ArcheoSession.get().legend.regions[ regionType ][ regionName ].pattern.angle = data.value;

            /* Update all data appearance */
            ArcheoMap.triggerLayerStyleFunction();  
        }

        return false;
	};

	$anglepicker.anglePicker({
		change: eventFunction
	});

    $('#legend').on('click', '.legend-symbol.region', null, function(event) {
        let $symbol = $(event.target);

        let regionName = $symbol.siblings('.legend-text').text();
        let regionType = $symbol.parents('.region-legend').attr('region-type');

        ArcheoCache.setTemporaryEntry('$symbol', {
            regionName: regionName,
            regionType: regionType
        });

        let regionStyle = ArcheoSession.get().legend.regions[ regionType ][ regionName ];

        /* Set buttons colors */
        let backgroundColor = regionStyle.color.background;
        $backgroundButt.find('.color').css('background-color', backgroundColor);

        let patternColor =  regionStyle.color.pattern;
        $patternButt.find('.color').css('background-color', patternColor);

        /* Set other controls */
        $patternSelect.val( regionStyle.pattern.type );
        $scaleSlider.update({ from: regionStyle.pattern.scale });
        $spacingSlider.update({ from: regionStyle.pattern.spacing });

        $("#pattern-modal").dialog("option", "position", { my: "left top", at: "left top", of: $symbol });
        $("#pattern-modal").dialog("open");

        $('#pattern-anglepicker').anglePicker("setValue", parseInt(regionStyle.pattern.angle) );

        return false;
    });
}
    
    
function initializeMapLegendEvents() {
    layerColorChangeOnClickEvents();
    attributeColorChangeOnClickEvents();
    regionColorChangeOnClickEvents();

    layerGradientOnChange();
}


export default initializeMapLegendEvents;