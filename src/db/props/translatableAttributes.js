exports.translatable_name = `
	name(lang: String = "en"): String @cypher(statement: """MATCH (this) 
	WITH this, 'lang_' + lang + '__' + 'name' as attribute
	RETURN this[attribute];
	""")
`;

exports.translatable_description = `
	description(lang: String = "en"): String @cypher(statement: """MATCH (this) 
	WITH this, 'lang_' + lang + '__' + 'description' as attribute
	RETURN this[attribute];
	""")
`;