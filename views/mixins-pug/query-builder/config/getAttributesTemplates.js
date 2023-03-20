import filterFunctions from './filterFunctions.js'
import operatorsSets from '../data/operatorsSets.json';


export default function(langDict, validators, customInputs) {
	var defaultSetting = {
		tags: [],
		valueAttribute: '""',
		queryAttribute: '""',
		detailsAttribute: '""',
		value_separator: ',',
		depth: 0,
		relation: '',
		relation_direction: 'right',
		relation_previous: '',
		root: false
	}; 

	return {
		number_date: { // wczytać z serwera zakresy
			...defaultSetting,
			label: langDict.attributes.date,
			operators: operatorsSets.number_range,
			type: 'integer',
			valueAttribute: 'time_period',
			queryAttribute: 'time_period',
			input: customInputs.from_to,
			...filterFunctions.from_to,
			validation: { callback: validators.min_max_number(
				window.metadata.TimePeriod.minYear, 
				window.metadata.TimePeriod.maxYear) },
			tags: ['isYear']
		},
		period_length: { // wczytać z serwera zakresy
			...defaultSetting,
			label: langDict.attributes.period_length,
			operators: operatorsSets.number_range,
			type: 'integer',
			valueAttribute: 'length',
			queryAttribute: 'length',
			input: customInputs.from_to,
			...filterFunctions.from_to,
			validation: { callback: validators.min_max_number(
				0, 
				Math.abs(window.metadata.TimePeriod.maxYear - window.metadata.TimePeriod.minYear)) },
			tags: []
		},
		age: {
			...defaultSetting,
			label: langDict.attributes.age,
			type: 'integer',
			valueAttribute: 'age',
			queryAttribute: 'age',
			input: customInputs.from_to,
			operators: operatorsSets.number_range,
			...filterFunctions.from_to,
			validation: { callback: validators.min_max_number(
				0, 
				125) }
		},
		component: {
			...defaultSetting,
			label: langDict.attributes.component,
			type: 'double',
			valueAttribute: 'component',
			queryAttribute: 'component',
				input: customInputs.component,
			operators: operatorsSets.number,
				...filterFunctions.component,
			validation: { callback: validators.min_max_number(
				-100, 
				100) }
		},
		tree_name: {
			...defaultSetting,
			label: langDict.attributes.name,
			type: 'string',
			input: 'text',
			valueAttribute: 'name',//'treeIndex',
			queryAttribute: 'name',
			input: customInputs.default,
			operators: operatorsSets.tree,
			...filterFunctions.default,
			validation: { callback: validators.tree() },
			tags: ['searchable']
		},
		text_name: {
			...defaultSetting,
			label: langDict.attributes.name,
			type: 'string',
			valueAttribute: 'name',
			queryAttribute: 'name',
			input: customInputs.default,
			operators: operatorsSets.text,
			...filterFunctions.default,
			validation: { callback: validators.min_max_length(1, 1000) },
			tags: ['translatable']
		},
		relation_exists: {
			...defaultSetting,
			label: langDict.others.relation_exists,
			type: 'boolean',
			input: 'select',
			values: langDict.values.relation_existence,
			valueAttribute: 'relationship',
			//queryAttribute: 'relationship',
			input: customInputs.relation_exists,
			operators: ["boolean_does"],
			...filterFunctions.default
			//tags: ['translatable']
		},
		select_name: {
			...defaultSetting,
			label: langDict.attributes.name,
			type: 'string',
			input: customInputs.select,
			valueAttribute: 'name',
			queryAttribute: 'name',
			operators: operatorsSets.select,
			...filterFunctions.default,
			validation: { callback: validators.min_max_length(1, 1000) },
			tags: ['translatable'],
			plugin: 'selectpicker',
			plugin_config: {
				style: 'btn-inverse btn-xs'
			}
		},
		text_id: {
			...defaultSetting,
			label: langDict.attributes.id,
			type: 'string',
			input: 'text',
			valueAttribute: 'id',
			queryAttribute: 'id',
			input: customInputs.default,
			operators: operatorsSets.text,
			...filterFunctions.default,
			validation: { callback: validators.min_max_length(1, 1000) }
		},

		/*
		tree_name: {
			...defaultSetting,
			label: langDict.attributes.name,
			type: 'string',
			input: 'text',
			valueAttribute: 'name',//'treeIndex',
			queryAttribute: 'name',
			input: customInputs.default,
			operators: operatorsSets.tree,
			...filterFunctions.default,
			validation: { callback: validators.tree() },
			tags: ['searchable']
		},
		*/

		point_coords: {
			...defaultSetting,
			label: langDict.attributes.coordinates,
			type: 'double',
			valueAttribute: 'coordinates',
			//queryAttribute: 'coordinates',
			input: customInputs.point,
			operators: operatorsSets.point,
			...filterFunctions.coordinates,
			validation: { callback: validators.coordinates() }
		}
	}
}