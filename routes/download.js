const express = require('express');
const router = express.Router({mergeParams: true});
const cwd = process.cwd();

const fetch = require('../src/db/fetch');


function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


// `/:dbName/entity/:entityType/:entityId`
router.get(`/db/:dbName/entity/:entityType/:entityId`, (req, res, next) => {

    /*
    const user_id = req.query.id;
    const token = req.query.token;
    const geo = req.query.geo;
    */

    var dbId = decodeURIComponent(req.params.dbName);
    var dbName = dbId.split('_')[0]; // <name>_<version>
    var dbVersion = dbId.split('_')[1];
    var entityType = decodeURIComponent(req.params.entityType);
    var entityId = decodeURIComponent(req.params.entityId);
    let lang = req.params.languageTag;

    var entityDbName = capitalizeString(entityType) + dbName;

    let query = `query($lang: String, $id: String) {
        ${entityDbName}(filter: {id: $id }) {
            download(lang: $lang)
        }
    }`;
    
    fetch({
        query: query,
        variables: { id: entityId, lang: lang } // In future get lang param from request 
    }).then(dbRes => {
        var entityData = JSON.stringify(dbRes.data[entityDbName][0]);
        var filename = `${lang}_${dbName}_${entityType}_${entityId}.json`;

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', 'application/json');

        res.send(entityData); // or try send
    }).catch(error => {
        res.status(404).send(error);
        next(error);
    });
});


module.exports = router;