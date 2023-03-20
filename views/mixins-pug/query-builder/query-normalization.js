function createFilter(node) {
	var entity = (node.data.entity || node.field) + (node.data.suffix || '');
	var relationOperator = node.data.relation_operator;
	var property = node.data.attributes;
	var operator = property === 'relationship' ? 'exists' : node.operator;
	var value = node.value;

	if( ArcheoUtilities.isArray(value) )
		value = value.slice(0); // copies the object

	/* Fix for custom operators */
	operator = operator.split('__');
	operator = operator[ operator.length - 1 ];

	node = {
		"entity": entity,
		"property": property,
		"operator": operator,
		"value": value
	};

	if( ArcheoUtilities.isValidNonEmptyString(relationOperator) ) {
		node.relation_operator = relationOperator;
	}

	return node;
}


function traverseRules(node, translatedNode) {
	if('rules' in node) {
		// It is group then
		var rulesList = [{}];
		translatedNode[ node.condition ] = rulesList;
		
		for(var i = 0; i < node.rules.length; ++i) {
			let newTranslatedNode = {};
			let newNode = node.rules[i];

			traverseRules(newNode, newTranslatedNode);

			rulesList.push( newTranslatedNode );
		}

		/* If no AND filters concatenation were performed */
		if(Object.keys( rulesList[0] ).length === 0)
			rulesList.shift();
	}
	else {
		var filter = createFilter(node);
		Object.assign(translatedNode, filter);
	}
}


function getNormalizedQuery(rules) {
	if( ! ArcheoUtilities.isValid(rules) )
		//throw Error(`Error during query translation. Expected \'object\' type, received \'${typeof rules}\'`);
		return {};
	else {

		var graphQLFilters = {};
		traverseRules(rules, graphQLFilters);

		return graphQLFilters;
	}
}


export default getNormalizedQuery;