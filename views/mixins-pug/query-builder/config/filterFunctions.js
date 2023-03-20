function getRelationFilterValue(ruleContainer) {
	return ruleContainer.find('select.relation-filter').val() || '';
}


export default {
	// Suitable for: date, age
	from_to: {
		valueGetter: function(rule) {
		  var attributeName = rule.filter.valueAttribute;
		  var values = [];

		  let ruleContainer = rule.$el.find('.rule-value-container');

		  if (rule.operator.type == 'between' || rule.operator.type == 'inrange') {
			values = [ruleContainer.find('.input-years-from input.attribute-value').getDateNumberValue()
			,
			ruleContainer.find('.input-years-to input.attribute-value').getDateNumberValue()
			];	
		  }
		  else {
			values = ruleContainer.find('input.attribute-value').getDateNumberValue();
		  }

		  ArcheoUtilities.parseValues(values, rule.filter.type);
		  rule.filter.data = {
			  attributes: attributeName,
			  relation_operator: getRelationFilterValue( ruleContainer )
		  };

		  return values;
		},
		valueSetter: function(rule, value) {
		  let ruleContainer = rule.$el.find('.rule-value-container');

		  if (rule.operator.type == 'between' || rule.operator.type == 'inrange') {
			let $fromInput = ruleContainer.find('.input-years-from input.attribute-value');
			$fromInput.val(value[0]);
			$fromInput.change();
			
			let $toInput = ruleContainer.find('.input-years-to input.attribute-value');
			$toInput.val(value[1]);
			$toInput.change();
		  } else {
			let $input = ruleContainer.find('input.attribute-value');
			$input.val(value);
			$input.change();
			rule.$el.find('.rule-value-container > :first').change();
		  }
		},
		default_operator: 'between'
	},
	coordinates: {
		valueGetter: function(rule) {
			let attributeName = rule.filter.valueAttribute;

			let distance = parseFloat( rule.$el.find('.rule-value-container .distance.attribute-value').val() );
			let distanceInMeters = distance * 1000;

			let ruleContainer = rule.$el.find('.rule-value-container');

			let values = {
				point: {
					latitude: parseFloat( ruleContainer.find('.latitude.attribute-value').val() ),
					longitude: parseFloat( ruleContainer.find('.longitude.attribute-value').val() )
				}, 
				distance: distanceInMeters
			};

			ArcheoUtilities.parseValues(values, rule.filter.type);
			
			rule.filter.data = { 
				attributes: attributeName,
				relation_operator: getRelationFilterValue( ruleContainer )
			};

			return values;
		},
		valueSetter: function(rule, value) {
			let ruleContainer = rule.$el.find('.rule-value-container');

			ruleContainer.find('.latitude.attribute-value').val(value.point.latitude).trigger('change');
			ruleContainer.find('.longitude.attribute-value').val(value.point.longitude).trigger('change');
			ruleContainer.find('.distance.attribute-value').val(value.distance).trigger('change');
		},
		default_operator: 'less',
		default_value: {
			point: {
				latitude: '',
				longitude: ''
			},
			distance: ''
		}
	},
	/*
	attribute-value
	component-name
	result-type
	*/
	component: {
		valueGetter: function(rule) {
			let ruleContainer = rule.$el.find('.rule-value-container');

			let attributeName = ruleContainer.find('select.component-name').val();
			let resultType = ruleContainer.find('select.result-type').val();

			let values = parseFloat( ruleContainer.find('input.attribute-value').val() );
			ArcheoUtilities.parseValues(values, rule.filter.type);

			rule.filter.data = { 
				attributes: attributeName,
				entity: resultType,
				relation_operator: getRelationFilterValue( ruleContainer )
			};

			return values;
		},
		valueSetter: function(rule, value) {
			let ruleContainer = rule.$el.find('.rule-value-container');

			ruleContainer.find('.attribute-value').val(value).trigger('change');
		},
		default_operator: 'less',
		validation: { callback: 
			(value, rule) => {
				for(var i = 0; i < value.length; ++i)
					if( !ArcheoUtilities.isValidNonEmptyString( value[i] ) )
						return `Please input correct value of the type \"${ rule.filter.type }\"`;
				return true;
			}
		}
	},
	default: {
		valueGetter: function(rule) {
			let attributeName = rule.filter.valueAttribute;
			let operation = rule.operator.type;

			let values = [];

			let ruleContainer = rule.$el.find('.rule-value-container');
			let inputElement = ruleContainer.find('input.attribute-value,select.attribute-value');

			if(operation == 'in' || operation == 'not_in') {
				let inputValue = inputElement.val();
				let separator = rule.filter.value_separator;
				
				values = inputValue.split(separator);
			}
			else {
				values = inputElement.val();
			}

			ArcheoUtilities.parseValues(values, rule.filter.type);

			rule.filter.data = { 
				attributes: attributeName,
				relation_operator: getRelationFilterValue( ruleContainer )
			};

			return values;
		},
		valueSetter: function(rule, value) {
			let ruleContainer = rule.$el.find('.rule-value-container');

			ruleContainer.find('input.attribute-value,select.attribute-value').val(value).trigger('change');
		},
		default_operator: 'equal',
		//default_value: '',
		validation: { callback: 
			(value, rule) => {
				for(var i = 0; i < value.length; ++i)
					if( !ArcheoUtilities.isValidNonEmptyString( value[i] ) )
						return `Please input correct value of the type \"${ rule.filter.type }\"`;
				return true;
			}
		}
	}
}