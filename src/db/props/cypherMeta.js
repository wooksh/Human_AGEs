exports.cypherMeta = {
    'TimePeriod': 'MATCH (n:meta__TimePeriod) RETURN properties(n) as properties',
    'Sex': 'MATCH (n:meta__Sex) RETURN properties(n) as properties',
    'UsePhaseFunction': 'MATCH (n:meta__UsePhaseFunction) RETURN properties(n) as properties',
    'DatingType': 'MATCH (n:meta__DatingType) RETURN properties(n) as properties',
	'HaplogroupY': 'MATCH (n:meta__HaplogroupY) RETURN properties(n) as properties',
    'HaplogroupMt': 'MATCH (n:meta__HaplogroupMt) RETURN properties(n) as properties',
    'Database': 'MATCH (n:meta__Database) RETURN properties(n) as properties',
    'Dating': 'MATCH (n:meta__Dating) RETURN properties(n) as properties',

    'Admixture': 'MATCH (n:meta__Admixture) RETURN properties(n) as properties',
    'PCA': 'MATCH (n:meta__PCA) RETURN properties(n) as properties',
    'UMAP': 'MATCH (n:meta__UMAP) RETURN properties(n) as properties'
};