const entitiesPaths = require('./paths.json');
const treeDic = require('./tree.json');
const translatableDic = require('./translatable.json');
const operationsTranslation = require('./queryBuilderToApolloOperations.json');
const Utilities = require('./utilities.js');
const queryToDatabaseEntitiesTranslator = require('../data/entitiesTranslator');
const merge = require('deepmerge')

const fetch = require('../../src/db/fetch');


function getAttributePathWithRelationFilter(path, filterName) {
	var pathCopy = path.slice(0);
	
	if(path.length > 1 && Utilities.isValidNonEmptyString(filterName)) {
		var lastRelationIndex = pathCopy.length - 2;
		pathCopy[ lastRelationIndex ] = pathCopy[ lastRelationIndex ] + '_' + filterName;
	}

	return pathCopy;
}


function getTrimmedPath(path, trimSize = 0) {
	return path.slice(0, path.length - trimSize);
}


function getAPIPathAndLastNodeObj(path) {
	var node = {};
	var pathObj = node;

	for(var i = 0; i < path.length; ++i) {
		let nodeName = path[i];
		node[ nodeName ] = {};
		node = node[ nodeName ];
	}

	return {"pathObj": pathObj, "node": node};
}


function getTranslatedAttributes(attribute, value, operation, isTranslatable, lang) {
	var prefix = isTranslatable ? 'lang_' + lang + '__' : '';

	var newAttribute = attribute;

	if(attribute === 'time_period')
		newAttribute = [`dateFrom`, `dateTo`];
		//else if(attribute === 'age')
	else if(Utilities.isArray(value))
		newAttribute = [`${attribute}`, `${attribute}`];
	
	if ( ! Utilities.isArray(newAttribute) ) {
		let suffix = operationsTranslation[operation];

		if(!(operation in operationsTranslation))
			throw Error(`Error during query translation. Invalid operation name: \'${operation}\'`);

		return prefix + newAttribute + suffix;
	}
	else {
		if (newAttribute.length === 2) {
			let suffixes = null;

			if (operation == 'between') {
				suffixes = [ operationsTranslation['greater'], operationsTranslation['less'] ];
			}
			else if (operation == 'inrange') {
				newAttribute = newAttribute.reverse();
				suffixes = [ operationsTranslation['greater'], operationsTranslation['less'] ];
			} else {
				if(!(operation in operationsTranslation))
					throw Error(`Error during query translation. Invalid operation name: \'${operation}\'`);

				suffixes = [ operationsTranslation[operation], operationsTranslation[operation] ];
			}
			
			return [
				prefix + newAttribute[0] + suffixes[0],
				prefix + newAttribute[1] + suffixes[1]
			]
		}
	}
}


function getTreeIndex(entityName, attributeName, value, lang) {
	return fetch({ 
        query: `query($entityName: String, $lang: String, $searchString: String, $attributeName: String, $suffixPattern: String, $limit: Int) {
            fuzzySearch(entityName: $entityName, lang: $lang, searchString: $searchString, attributeName: $attributeName, suffixPattern: $suffixPattern, limit: $limit)
		}`,
        variables: { 
			searchString: value, 
			attributeName: attributeName,
			lang: lang,
			entityName: entityName,
			suffixPattern: '',
			limit: 1
		}
    }).then(dbRes => {
        var data = dbRes.data;
        if(! Utilities.isValid(data) ) {
            console.error(`Error during query translation. No ${entityName} object of ${attributeName} = ${value} value found.`);
			return null
	    } else
            return data.fuzzySearch[0].treeIndex;

    }).catch(error => {
        console.error(`Error during query translation. Error while searching for tree index of ${entityName} object with ${attributeName} = ${value}.\n${error}`);
        return null;
    });  
}


async function createFilter(entityName, entityType, node, lang) {
	/*
		"entity": entity,
		"property": property,
		"operator": operator,
		"value": value
	*/

	var queryEntity = node.entity;
	var relationFilter = node.relation_operator || '';
	var operator = node.operator;
	var attribute = node.property;
	var value = node.value;

	if(!(queryEntity in translatableDic))
		throw Error(`Error during query translation. Invalid entity name: \'${queryEntity}\'`);

	var isTranslatable = translatableDic[ queryEntity ][ attribute ] === true;

	if( treeDic[ queryEntity ][ attribute ] === true ) {
		realEntityName = queryToDatabaseEntitiesTranslator[queryEntity];
		prefix = isTranslatable ? 'lang_' + lang + '__' : '';
		queryAttribute = prefix + attribute;

		value = await getTreeIndex(realEntityName, queryAttribute, value, lang);
		attribute = 'treeIndex';
	}
	
	var translatedAttribute = await getTranslatedAttributes(attribute, value, operator, isTranslatable, lang);
	
	/* Fix period temporal value format */
	if( Utilities.isArray(value) )
		value = value.slice(0); // Use a copy, not reference
	else if(attribute === 'time_period') {
		value = [value, value];
	}

	/* Apply Neo4j temporal format */
	if(attribute === 'time_period' || attribute === 'date') {
		if( Utilities.isArray(value) )
			value.map((val) => { return { year: val } })
		else
			value = { year: value };
	}
		

	var attributePath = entitiesPaths[entityType][queryEntity];

	if(attribute === 'relationship') {
		translatedAttribute = attributePath[ attributePath.length - 2 ] + ( value != "true" ? '' : '_not' ); // I apply negation, because I compare value with null
		value = null;
		
		attributePath = await getTrimmedPath(attributePath, 2);
	} else
		attributePath = await getAttributePathWithRelationFilter(attributePath, relationFilter);
	

	var resultObj = await getAPIPathAndLastNodeObj( attributePath );
	var filterObj = resultObj.pathObj;
	var entityNode = resultObj.node;

	var attributesDict = {};

	if( Utilities.isArray(translatedAttribute) )
		for(var i = 0; i < translatedAttribute.length; ++i)
			if(attribute === 'time_period' || attribute === 'date')
				attributesDict[ translatedAttribute[i] ] = {year: value[i]};
			else
				attributesDict[ translatedAttribute[i] ] = value[i];
	else
		attributesDict[translatedAttribute] = value;

	Object.assign(entityNode, attributesDict);

	return filterObj;
}


async function traverseRules(node, translatedNode, entityName, entityType, lang) {
	if('AND' in node || 'OR' in node) {
		// It is group then
		var rulesList = [{}];

		let condition = Object.keys(node)[0];
		translatedNode[ condition ] = rulesList;
		let rules = node[condition];
		
		for(var i = 0; i < rules.length; ++i) {
			let newTranslatedNode = {};
			let newNode = rules[i];

			await traverseRules(newNode, newTranslatedNode, entityName, entityType, lang);

			let isNewNodeRules = 'AND' in newNode || 'OR' in newNode;
			if(condition === 'AND' && !isNewNodeRules)
				rulesList[0] = merge(rulesList[0], newTranslatedNode);
			else
				rulesList.push( newTranslatedNode );
		}

		/* If no AND filters concatenation were performed */
		if(Object.keys( rulesList[0] ).length === 0)
			rulesList.shift();
	}
	else {
		var filter = await createFilter(entityName, entityType, node, lang);
		Object.assign(translatedNode, filter);
	}


}


async function rulesTranslator(rules, entityName, entityType, lang) {
	if( ! Utilities.isValid(rules) )
		throw Error(`Error during query translation. Expected \'object\' type, received \'${typeof rules}\'`);

	var graphQLFilters = {};

	if( ! Utilities.isEmpty(rules) )
		await traverseRules(rules, graphQLFilters, entityName, entityType, lang);

	return graphQLFilters;
}


module.exports = rulesTranslator;