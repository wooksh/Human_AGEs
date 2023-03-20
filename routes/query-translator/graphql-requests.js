const JSON5 = require('json5');


function graphqlify(obj, asList = false) {
	if(asList) {
		var list = [];
		for(var key in obj)
			list.push( `${key}:${obj[key]}` );
		return list.join(',');
	}
	else
		return JSON5.stringify(obj, {quote: '"'});
}


function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}


exports.createGraphqlQuery = function(
	entityName, 
	selectionSet,
	filters = {},
	/* I am turning off language for now */
	variablesDeclarations = {} //{'$lang': 'String'}
	){

	var queryFilters = filters;

    /* Add filters mandatory for certain entities */
    /* I assume, that there is no such objects, that does not fullfil these mandatory conditions */
	//if(entityName in mandatoryFilters)
	//	queryFilters = { 'AND': [mandatoryFilters[entityName], queryFilters] };

	if( !isEmpty(variablesDeclarations) ) {
		let query = `query(${graphqlify(variablesDeclarations, true)}){${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;
		return query;
	} else {
		let query = `query{${entityName}(filter:${graphqlify(queryFilters)}){${selectionSet.join(',')}}}`;
		return query;
	}
}


exports.getEntityQueryData = function( queriesData, entityName ) {
	if("default" in queriesData)
		return {...queriesData['default'], ...queriesData[entityName]};
	return queriesData[entityName]
}

