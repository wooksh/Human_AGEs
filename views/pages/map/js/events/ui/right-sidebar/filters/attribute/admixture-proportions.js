function admixtureOptionsSliderEvents(elementsDict, attributeValue, attributeId, attributeType) {
    var eventFunction = async function(data) {
		let proportionValue = data.from;

        /* Change proportion for this attribute value */
		let valueSettings = ArcheoSession.get().filters.attributes.configs[attributeId].proportions[attributeValue];
		valueSettings.value = proportionValue;
		
		ArcheoEvents.broadcast('filter-attribute-change', null, {
			attributeId: attributeId,
			attributeType: attributeType
		});
    }

    elementsDict.sliderObj.data("ionRangeSlider").update({
        onFinish: eventFunction
    });
}


function admixtureOptionsOperatorEvents(elementsDict, attributeValue, attributeId, attributeType) {
    elementsDict.operatorOptionObj.on('change update', 'input', null, function(event) {
        var $input = $(event.target);
        var operatorName = $input.attr('value');

        /* Change proportion for this attribute value */
		ArcheoSession.get().filters.attributes.configs[attributeId].proportions[attributeValue].operator = operatorName;

        /* Change UI */
        let $sliderWrapper = elementsDict.proportion.find('.admixture-proportion-slider-wrapper');
        $sliderWrapper.attr('operator', operatorName);

        ArcheoEvents.broadcast('filter-attribute-change', null, {
			attributeId: attributeId,
			attributeType: attributeType
		});
    });
}


function initializeAdmixtureOptionsEvents(elementsDict, attributeValue, attributeId, attributeType) {
	admixtureOptionsSliderEvents(elementsDict, attributeValue, attributeId, attributeType);
    admixtureOptionsOperatorEvents(elementsDict, attributeValue, attributeId, attributeType);
}


function initializeAdmixtureOptions(attributeId, attributeType, attributes) {
	let $admixturePanel = $('#admixture-filtering');
	let $admixtureOptionsPanel = $('#admixture-filtering-options');
    let filterConfigsDict = ArcheoSession.get().filters.attributes.configs;

	if(attributeType === 'admixture' && attributeId in filterConfigsDict) {
		$admixtureOptionsPanel.empty();

		Object.keys(attributes).forEach((attributeValue) => {
			let $proportion = $(`#admixture-proportion-template`).clone();

			/* Register new proportions settings if none */
			let valueSettingsDict = filterConfigsDict[attributeId].proportions;
			if( !(attributeValue in valueSettingsDict) )
				valueSettingsDict[attributeValue] = {value: 0, operator: 'geq'};

			/* Assign new dataset id */
			$proportion.attr('id', `${attributeValue}_proportion-option`);
			$proportion.appendTo($admixtureOptionsPanel);

			/* Assign title */
			let $proportionTitle = $proportion.find('.title');
			$proportionTitle.html(`<span>"<b>${attributeValue}</b>" filter options</span>`);

			/* Change operators ids */
			let $operatorOption = $proportion.find('#proportion-operator-option')
			let operatorOptionsId = `${attributeValue}_proportion-operator-option`;
			$operatorOption.attr('id', operatorOptionsId);
			$operatorOption.find('input').attr('name', operatorOptionsId);
			$operatorOption.addClass('proportion-operator-option');

			/* Initialize slider */
			let $slider = $proportion.find('#admixture-proportion-slider');
			ArcheoUI.initializeSlider($slider, {
				min: 0,
				max: 1,
				from: valueSettingsDict[attributeValue].value,
				step: 0.01,
				type: 'single',
				extra_classes: 'admixture-proportion-slider-wrapper',
                onUpdate: function(data) {
                    let valueSettings = ArcheoSession.get().filters.attributes.configs[attributeId].proportions[attributeValue];
                    let $sliderWrapper = $proportion.find('.admixture-proportion-slider-wrapper');
                    $sliderWrapper.attr('operator', valueSettings.operator);
                }
			});

			$slider.removeAttr('id');
			let $sliderWrapper = $proportion.find('.admixture-proportion-slider-wrapper');

			/* Initialize operator */
			$sliderWrapper.attr('operator', valueSettingsDict[attributeValue].operator);
			let $operatorWrapper = $proportion.find('.proportion-operator-option');
			ArcheoUI.toggleRadiobutton($operatorWrapper, valueSettingsDict[attributeValue].operator);

			initializeAdmixtureOptionsEvents({
                'proportion': $proportion,
				'sliderObj': $slider,
				'sliderWrapperObj': $sliderWrapper,
				'operatorOptionObj': $operatorOption
			}, attributeValue, attributeId, attributeType);

			$proportion.removeClass('hidden');
		});



		$admixturePanel.removeClass('hidden');
	}
	else {
		$admixturePanel.addClass('hidden');
	}
}


export {
    initializeAdmixtureOptions
}