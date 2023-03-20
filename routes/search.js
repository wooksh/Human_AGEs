const express = require('express');
const router = express.Router();
const path = require('path');
const cwd = process.cwd();

const fetch = require('../src/db/fetch');

/* The keys are names of optgroups in query builder */
const queryToDatabaseEntitiesTranslator = require('./data/entitiesTranslator');


function searchByName(entityName, attributeName, languageTag, searchString, res, next) {
	var suffixPattern = '*';

	switch (entityName) {
		case 'Source': suffixPattern = '~'; break;
		//case 'PresentPopulation': suffixPattern = '~'; break;
		//case 'PastPopulation': suffixPattern = '~'; break;
	}

	let query = `query($entityName: String, $lang: String, $searchString: String, $attributeName: String, $suffixPattern: String, $limit: Int) {
		fuzzySearch(entityName: $entityName, lang: $lang, searchString: $searchString, attributeName: $attributeName, suffixPattern: $suffixPattern, limit: $limit)
	}`;

	let variables = { 
		searchString: searchString, 
		attributeName: attributeName,
		lang: languageTag,
		entityName: entityName,
		suffixPattern: suffixPattern,
		limit: 10
	};

    fetch({ 
        query: query,
        variables: variables
    }).then(dbRes => {
        var data = dbRes.data;
        if(!data) {
            next();
            res.status(404).send(`[${entityName}] No data: \n${JSON.stringify(dbRes, null, 2)}`);
            return;
        } else
            res.json(data);

    }).catch(error => {
        res.status(404).send(error);
        return;
        //next(error);
    });    
}


router.get('/:entityTag/:attributeTag/:languageTag/:query', (req, res, next) => {
    var entityTag = req.params.entityTag;
	var entityName = queryToDatabaseEntitiesTranslator[entityTag];

    searchByName(
		entityName, 
		req.params.attributeTag, 
		req.params.languageTag, 
		req.params.query, 
		res, next
		);
});


module.exports = router;