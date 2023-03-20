/*** This file contains map Query Buidler query translation API */

const path = require('path');
const fetch = require('../src/db/fetch');

var rulesTranslator = require('./query-translator/translator');

const queriesData = require('./query-translator/queriesData.json');

const entityDictionary = require('../views/pages/map/data/entityDictionary.json');

const ArcheoRequests = require('./query-translator/graphql-requests');

const Utilities = require('./query-translator/utilities.js');


function processQuery(entityName, languageTag, filters, res, next) {
	let entityQueriesData = ArcheoRequests.getEntityQueryData( queriesData, entityName );

	let query = ArcheoRequests.createGraphqlQuery(
		entityName, 
		entityQueriesData['selectionSet'],
		filters,
		entityQueriesData['variablesDeclarations'] //{'$lang': 'String'}
	);

	fetch({ 
        query: query,
        variables: {lang: languageTag}
    }).then(dbRes => {
        var data = dbRes.data;
        if(!data[entityName]) {
            next();
            res.status(500).send(`No data is found for provided query: \n${JSON.stringify(dbRes, null, 1)}`);
        } else {
            res.json(data[entityName]);
		}

    }).catch(error => {
        res.status(500).send(`Error during query execution: \n${error}`);
    });
}


async function queryRouterFunction(req, res, next) {
	var builderQuery = JSON.parse(req.body.query);

	var filters = builderQuery.filters;
	var entityType = builderQuery.objects;
	var database = builderQuery.database;

	if(database in entityDictionary) {
		if(entityType in entityDictionary[database]) {
			var entityName = entityDictionary[ database ][ entityType ];
			var lang = builderQuery.lang;
			var graphqlQuery = undefined;

			try {
				graphqlQuery = await rulesTranslator(filters, entityName, entityType, lang);
			}
			catch(e) {
				res.status(500).send(`Invalid query filters content: ${e}`);
				return;
			}

			processQuery(
				entityName,  
				req.params.languageTag, 
				graphqlQuery, 
				res, next
				);
		}
		else
			res.status(500).send(`Invalid query entity type name: ${entityType}`);
	}
	else
		res.status(500).send(`Invalid query database name: ${database}`);
}


module.exports = queryRouterFunction;