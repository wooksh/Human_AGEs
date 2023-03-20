var searchPattern = ` $searchString + '*' `;
const limit = 10;
// apoc.schema.node.indexExists("Culture", ["lang_en__name"])
module.exports = `
type Query {
	fuzzySearch(lang: String = "en", searchString: String, entityName: String, attributeName: String, suffixPattern: String, limit: Int): [JSON] @cypher(
		statement: """
		  WITH 
		  	$attributeName as attribute,
		  	'lang_' + $lang + '__' + $attributeName as translatedAttribute
		  WITH 
			CASE apoc.schema.node.indexExists($entityName, [translatedAttribute])
			WHEN true THEN translatedAttribute
			ELSE attribute
			END as attribute
		  WITH
			attribute,
		 	$entityName + '_' + attribute as indexName
		  CALL db.index.fulltext.queryNodes(
			indexName, $searchString + $suffixPattern
		  )   
		  YIELD node
		  WITH DISTINCT node, attribute
		  ORDER BY node[attribute]
		  RETURN DISTINCT CASE apoc.label.exists(node, 'Tree')
			WHEN true THEN apoc.map.fromPairs([ 
				[ attribute, node[attribute] ],
				[ 'treeIndex', node.treeIndex ],
				[ 'synonym', node.synonym ]
			])
			ELSE apoc.map.fromPairs([ 
				[ attribute, node[attribute] ]
			])
			END
		  LIMIT toInteger($limit);
		""")
}

`;