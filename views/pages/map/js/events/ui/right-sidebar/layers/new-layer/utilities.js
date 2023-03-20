/* These are layer types which require substential amount of computation upon renderering */
//var HEAVY_LOAD_TYPES = new Set(['tag']);


function layerConfigSliderEventSetup(sliderObj, layerId, layerType, configName, callerName = 'onChange', refresh = false) {
	$(sliderObj.input).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			//sliderObj.update({});

			/* Synchronize UI with session */
			let sessionValue = ArcheoSession.get().layers[layerId].style[configName];

			if( ArcheoUtilities.isArray(sessionValue) )
				sliderObj.update({from: sessionValue[0], to: sessionValue[1]});
			else
				sliderObj.update({from: sessionValue});
		}
	});

	var eventFunction = async function(data) {
		var config = {};

		if(sliderObj.options.type === 'double')
			config[ configName ] = [data.from, data.to];
		else
			config[ configName ] = data.from;

		ArcheoEvents.broadcast('layer-config-change', null, {
			layerId: layerId,
			value: config,
			refresh: refresh
		});
	};
	let updateDict = {};

	updateDict[ callerName ] = eventFunction;
	updateDict.onUpdate = eventFunction;

	sliderObj.update(updateDict);
}


function layerConfigSpinnerEventSetup($spinner, layerId, layerType, configName, refresh = false) {
	$spinner.on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			/* Synchronize UI with session */
			let sessionValue = ArcheoSession.get().layers[layerId].style[configName];

			$spinner.spinner("value", sessionValue);
		}
	});

	$spinner.on('spinchange spinstop', function(event, data) {
		var config = {};
		var spinnerValue = $spinner.spinner("value");

		if( ArcheoUtilities.isValid(spinnerValue) ) {
			config[ configName ] = spinnerValue;
			$spinner.attr('last-value', spinnerValue);

			ArcheoEvents.broadcast('layer-config-change', null, {
				layerId: layerId,
				value: config,
				refresh: refresh
			});
		}
		else {
			$spinner.spinner( 'value', $spinner.attr('last-value') );
		}
	});
}


function layerAngleEventSetup(sliderObj, layerId, layerType, configName, callerName = 'onChange') {
	$(sliderObj.input).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && (!ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			//sliderObj.update({});

			/* Synchronize UI with session */
			let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
			sliderObj.anglePicker("setValue",sessionValue);
		}
	});

	var eventFunction = async function(event, data) {
		var config = {};
		config[ configName ] = data.value;

		ArcheoEvents.broadcast('layer-config-change', null, {
			layerId: layerId,
			value: config
		});
	};

	sliderObj.anglePicker({
		change: eventFunction
	});
}


function layerConfigCheckboxEventSetup(checkboxObj, layerId, layerType, configName, refresh = false) {
	$(checkboxObj).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType ) ) {
			/* Synchronize UI with session */
			let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
			
			if( sessionValue )
				$(checkboxObj).addClass('active');
			else
				$(checkboxObj).removeClass('active');
	
			//$(checkboxObj).trigger('update');
		}
	});
	
	$(checkboxObj).on('click update', function(event) {
		let config = {};

		if( event.type === 'click')
			/* The class did not managed to switch yet, so the check must be negated for true value */
			config[ configName ] = ! $(checkboxObj).hasClass('active'); // negation applied intentionally
		else
			config[ configName ] = $(checkboxObj).hasClass('active');

		ArcheoEvents.broadcast('layer-config-change', null, {
			layerId: layerId,
			value: config,
			refresh: refresh
		});
	});
}


function layerColorToggleCheckboxEventSetup(checkboxObj, layerId, layerType, configName) {
	$(checkboxObj).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType ) ) {
			/* Synchronize UI with session */
			let sessionValue = ArcheoSession.get().layers[layerId].style[configName];
			
			if( sessionValue )
				$(checkboxObj).addClass('active');
			else
				$(checkboxObj).removeClass('active');
	
			//$(checkboxObj).trigger('update');
		}
	});
	
	$(checkboxObj).on('click update', function(event) {
		let config = {};

		if( event.type === 'click')
			/* The class did not managed to switch yet, so the check must be negated for true value */
			config[ configName ] = ! $(checkboxObj).hasClass('active'); // negation applied intentionally
		else
			config[ configName ] = $(checkboxObj).hasClass('active');

		ArcheoEvents.broadcast(['layer-config-change', 'layer-visibility-change'], null, {
			layerId: layerId,
			value: config,
			refreshRegions: true
		});
	});
}


function layerConfigRadiobuttonEventSetup(radiobuttonWrapper, layerId, layerType, configName, refresh = false) {
	$(radiobuttonWrapper).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType ) )
			$(checkboxObj).find("[checked='']").trigger('update');
	});
	
	$(radiobuttonWrapper).on('change update', 'input', null, function(event) {
		var $input = $(event.target);

		let config = {};
		config[ configName ] = $input.attr('value');

		ArcheoEvents.broadcast('layer-config-change', null, {
			layerId: layerId,
			value: config,
			refresh: refresh
		});
	});
}


function layerSettingSliderEventSetup(sliderObj, layerId, layerType, settingName, callerName = 'onChange') {
	$(sliderObj.input).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			sliderObj.update({});
		}
	});

	var eventFunction = async function(data) {
		let value;

		if(sliderObj.options.type === 'double')
			value = [data.from, data.to];
		else
			value = data.from;

		ArcheoEvents.broadcast('layer-setting-change', null, {
			layerId: layerId,
			setting: settingName,
			value: value
		});
	};

	let updateDict = {};

	updateDict[ callerName ] = eventFunction;
	updateDict.onUpdate = eventFunction;

	sliderObj.update(updateDict);
}


function layerConfigSelectEventSetup(selectObj, layerId, layerType, configName, refresh = false) {
	$(selectObj).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			selectObj.trigger('changed.bs.select');
		}
	});

	$(selectObj).on('changed.bs.select', function (event) {
		var config = {};
		config[configName] = selectObj.val();

		ArcheoEvents.broadcast('layer-config-change', null, {
			layerId: layerId,
			value: config,
			refresh: refresh
		});
	});
}


function layerConfigColorPickEventSetup(colorPickerObj, layerId, notLayerType, callerName = 'move', refresh = false) {
	$(colorPickerObj).on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(notLayerType) || data.value !== notLayerType) ) {
			let currentColor = colorPickerObj.spectrum('get');
			colorPickerObj.trigger(`${callerName}.spectrum`, [currentColor]);
		}
	});

	colorPickerObj.on(`${callerName}.spectrum change.spectrum`, function(e, color) {
		let rgbColor = color.toRgbString();

		ArcheoEvents.broadcast('layer-color-change', null, {
			layerId: layerId,
			value: rgbColor,
			refresh: refresh
		});
	});

	/* Initialy run event to synchronize UI with layer config */
	$(colorPickerObj).trigger('layer-type-change', [{layerId: layerId}] );
}

// handler:color:change
// handler:drag:end

// layerGradientInput
function layerConfigGradientPickEventSetup(gradientPicker, layerId, layerType, refresh = false) {
	let gradientEl = $(gradientPicker.el);

	gradientEl.on('layer-type-change', function(event, data) {
		if( data.layerId === layerId && ( !ArcheoUtilities.exists(layerType) || data.value === layerType) ) {
			gradientPicker.change();
		}
	});

	var changeFunction = function(handler) {
		var gradientColor = gradientPicker.getColorValue();
		//var gradientCss = gradientPicker.getValue();

		if(ArcheoUtilities.isValidNonEmptyString(gradientColor)) {
			//var rgbColors = gradientColor.split('%, ');

			ArcheoEvents.broadcast('layer-gradient-change', '.layer', {
				layerId: layerId,
				value: ArcheoUtilities.gradientToArray(gradientColor),
				refresh: refresh
			});
		}
	};

	gradientPicker.on(`change`, changeFunction);
	gradientPicker.on(`handler:color:change`, changeFunction);
	gradientPicker.on(`handler:drag:end`, changeFunction);
	gradientPicker.on(`handler:remove`, changeFunction);	
	gradientPicker.on(`handler:add`, changeFunction);	
}


function sizeSliderSettingSetup($obj, params = {}) {
	return ArcheoUI.initializeSlider($obj, {
		min: 10,
		max: 100,
		from: 20,
		step: 1,
		type: 'single',
		postfix: 'px',
		drag_interval: true,
		...params
	});
}


function getDataSourceAttributeValues(datasetId, layerId, attributeId, attributeType) {
	//let features = ArcheoMap.getDataSourceFeatures(datasetId);
	var features = ArcheoCache.getDatasetFeatures(datasetId);
	var attributesValues = new Set();

	if(attributeType === "admixture") {
		/* Update decoration for every feature */
		let componentsCount;

		features.forEach((feature) => {
			var decoration = ArcheoMap.setupFeatureAttributesData(feature, layerId);
			componentsCount = decoration.attributeCount;
		});

		let valuesArray = [];

		for(var i = 1; i < componentsCount + 1; ++i)
			valuesArray.push(`k #${i}`);

		return valuesArray;
	} else {
		features.forEach((feature) => {
			/* Change to decoration */ 
			let decoration = ArcheoMap.setupFeatureAttributesData(feature, layerId);
			let value = decoration.attributeValue;

			if( ArcheoUtilities.isValid(value) && value !== 'MISSING' )
				attributesValues.add( value );
		});

		return Array.from(attributesValues);
	}
}


export {
	layerAngleEventSetup,
    layerConfigSliderEventSetup,
    layerConfigCheckboxEventSetup,
	layerColorToggleCheckboxEventSetup,
    layerSettingSliderEventSetup,
	layerConfigSelectEventSetup,
	sizeSliderSettingSetup,
	layerConfigColorPickEventSetup,
	layerConfigGradientPickEventSetup,
	layerConfigRadiobuttonEventSetup,
	getDataSourceAttributeValues,
	//getDataSourceFeatures,
	layerConfigSpinnerEventSetup
}