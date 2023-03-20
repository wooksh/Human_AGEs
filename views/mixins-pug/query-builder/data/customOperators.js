export default [
	{
	  type: 'inrange', 
	  nb_inputs: 1, 
	  multiple: false,
	  optgroup: 'date_interval',
	  apply_to: ['number']
	},
	{
		type: 'between', 
		nb_inputs: 1, 
		multiple: false, 
		optgroup: 'date_interval',
		apply_to: ['number']
	},
	{
	  type: 'part_of', 
	  nb_inputs: 1, 
	  multiple: false, 
	  apply_to: ['string']
	},
	{
	  type: 'not_part_of', 
	  nb_inputs: 1, 
	  multiple: false, 
	  apply_to: ['number']
	},
	{
		type: 'distance__less', 
		nb_inputs: 1, 
		apply_to: ['number']
	},
	{
		type: 'distance__less_or_equal', 
		nb_inputs: 1, 
		apply_to: ['number']
	},
	{
		type: 'distance__greater', 
		nb_inputs: 1, 
		apply_to: ['number']
	},
	{
		type: 'distance__greater_or_equal', 
		nb_inputs: 1, 
		apply_to: ['number']
	},
	{
		type: 'timepoint__less', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'timepoint__less_or_equal', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'timepoint__greater', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'timepoint__greater_or_equal', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'timepoint__equal', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'timepoint__not_equal', 
		nb_inputs: 1, 
		apply_to: ['number'],
		optgroup: 'date_timepoint'
	},
	{
		type: 'boolean_does', 
		nb_inputs: 1, 
		apply_to: ['boolean']
	},
];