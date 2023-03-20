const express = require('express');
const router = express.Router({mergeParams: true});
const cwd = process.cwd();

const fetch = require('../src/db/fetch');

const dbNameDict = {
    'AADR': {
        'en': 'Allen Ancient DNA Resource'
    },
    'EMPOP': {
        'en': 'EMPOP'
    }
};

const entityTypeDict = {
    'remains': {
        'en': 'Remains'
    },
    'person': {
        'en': 'Person'
    }
};


const selectionSet = {
    'remains': `
        coordinates
        site(lang: $lang)
        sex(lang: $lang)
        id
        database_id
        dating
        haplogroup_y
        haplogroup_mt
        age
        regionsIds(lang: $lang, type: "countries")
        admixture(type: "admixture_k7")
        full_sample(lang: $lang)
        sources(lang: $lang)
        pca_types(lang: $lang)
        umap_types(lang: $lang)
        population
        `,
    'person': `
        coordinates
        place(lang: $lang)
        sex(lang: $lang)
        id
        database_id
        haplogroup_y
        haplogroup_mt
        regionsIds(lang: $lang, type: "countries")
        admixture(type: "admixture_k7")
        full_sample(lang: $lang)
        sources(lang: $lang)
        pca_types(lang: $lang)
        umap_types(lang: $lang)
        population
        `
};


function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


router.get(`/:dbName/entity/:entityType/:entityId`, (req, res, next) => {
    var dbId = decodeURIComponent(req.params.dbName);
    var dbName = dbId.split('_')[0]; // <name>_<version>
    var dbVersion = dbId.split('_')[1];
    var entityType = decodeURIComponent(req.params.entityType);
    var entityId = decodeURIComponent(req.params.entityId);
    let lang = req.params.languageTag;

    var entityDbName = capitalizeString(entityType) + dbName;

    let query = `query($lang: String, $id: String) {
        ${entityDbName}(filter: {id: $id }) {
            ${selectionSet[entityType]}
        }
    }`;
    
    fetch({
        query: query,
        variables: { id: entityId, lang: lang } // In future get lang param from request 
    }).then(dbRes => {
        var entityData = dbRes.data[entityDbName][0];

        var entityDataString = entityData ? JSON.stringify(entityData) : null;
        if(entityDataString === null) {
            next();
            return;
		}
		
		let metadata = req.app.get('metadata');
		let langMetadata = { ...metadata['_'], ...metadata[lang] };
  
		let metadataString = langMetadata ? 
		  JSON.stringify(langMetadata) : 
		  null;

        //res.render(`entity/${entityType}/index`, {
        res.render(`entity/index`, {
			pageName: entityType,
            entityData: entityDataString, 
            metadata: metadataString,
            lang: lang,

            entityName: entityTypeDict[entityType][lang],
            databaseName: dbNameDict[dbName][lang] + " " + dbVersion,
            entityType: entityType,
            entityId: entityId,
            databaseId: dbId,
            entityDbName: entityDbName,
            dictionary: null
        });
    }).catch(error => {
        res.status(404).send(error);
        next(error);
    });
});


module.exports = router;