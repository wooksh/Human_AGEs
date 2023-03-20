exports.parent_name = `
    parent_name(depth: Int = 0): String @cypher(statement: """
        MATCH (this)
        RETURN CASE this.depth <= $depth
        WHEN true THEN 
            null
        WHEN false THEN
            [(this) -[:PART_OF*..100]-> (p {depth: $depth}) | p.name][0]
        END
    """)

    is_ancestor(treeIndex: String, lang: String = "en"): JSON @cypher(statement: """
        MATCH (this) WHERE treeIndex STARTS WITH this.treeIndex 
        RETURN {name: this.name}
    """)

    get_ancestor(treeLevel: Int, lang: String = "en"): JSON @cypher(statement: """
        WITH (this.depth - treeLevel) as path_length, this
        WITH
            (CASE
            WHEN path_length >= 0 THEN path_length
            ELSE -1 END) AS path_length, this

        call apoc.path.expand( this, 'PART_OF>', '+Tree', 0, path_length ) yield path
        UNWIND nodes(path) as p 
        
        RETURN {name: this.name, group: apoc.agg.minItems(p, p.depth)['items'][0].name, path_length: path_length};
    """)
`;