const fs = require('fs');
const path = require('path');

const {
	cypher_Person, cypher_Remains, cypher_ArchaeologicalSite, 
	cypher_UsePhase, cypher_Result,
	cypher_PoliticalRegion, cypher_GeographicalRegion,
	cypher_Polygon, cypher_PolygonHole, cypher_Region
} = require('./cypherStatements');

const fullTextQueries = require('./fullTextQueries');

const { 
	translatable_name, translatable_description, 
	translatable_division_name 
} = require('./translatableAttributes');

const {
	parent_name
} = require('./treeAttributes');

const { interpolateString } = require('../../utilities');


const graphTypesFileContent = fs.readFileSync( path.resolve(__dirname, '../data/graphTypes.txt'), 'UTF-8' ).toString();
const typeDefs = /* GraphiQL */ interpolateString(graphTypesFileContent, {
	'cypher_Person': cypher_Person,
	'cypher_Remains': cypher_Remains,
	'cypher_ArchaeologicalSite': cypher_ArchaeologicalSite,
	'cypher_UsePhase': cypher_UsePhase,
	'cypher_Result': cypher_Result,
	'cypher_PCA': cypher_Result,
	'cypher_UMAP': cypher_Result,
	'cypher_PoliticalRegion': cypher_PoliticalRegion,
	'cypher_GeographicalRegion': cypher_GeographicalRegion,
	'cypher_Polygon': cypher_Polygon,
	'cypher_PolygonHole': cypher_PolygonHole,
	'cypher_Region': cypher_Region,
	'fullTextQueries': fullTextQueries,
	'translatable_name': translatable_name,
	'translatable_description': translatable_description,
	'translatable_division_name': translatable_division_name,
	'parent_name': parent_name
});


// Remains_OnMap(queryJSON: JSON, lang: String): [Remains] @neo4j_ignore
// ${RemainsCypherStatements} 
/*
type Query {
	Remains_OnMap: [Remains]
}
*/

const { makeAugmentedSchema } = require('neo4j-graphql-js');


exports.schema = makeAugmentedSchema({ 
	typeDefs: typeDefs,
	//logger: { log: e => console.log(e) }, //
	config: {
		//query: {exclude: ["Query", "Remains_OnMap", "UsePhase_OnMap", "ArchaeologicalSite_OnMap"]},
		mutation: false,
		auth: {
			hasScope: false,
			isAuthenticated: true,
      		hasRole: false
		}
	}
});

