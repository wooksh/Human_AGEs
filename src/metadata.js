const { cypherMeta } = require('./db/props/cypherMeta');


const propsToEntityKeys = {
	'pca': 'PCA',
	'umap': 'UMAP',
	'admixture': 'Admixture',
	'haplogroup_y': 'HaplogroupY',
	'haplogroup_mt': 'HaplogroupMt',
	'sex': 'Sex'
};


exports.getDBMetadata = async function(session) {
	var metadata = { '_': {} };

	var metaKeys = Object.keys(cypherMeta).filter(item => item !== 'Database');
	metaKeys.unshift('Database');

	for(var i = 0; i < metaKeys.length; ++i) {
		entityName = metaKeys[i];

		metadata['_'][entityName] = {};
		let query = cypherMeta[entityName];

		await session.runExplicit(query).then(
		(result) => {
			let record = result.records[0];

			record.forEach( (value, key, record) => {
				let attributesNames = value;

				for(attributeName in attributesNames) {
					let attributeValue = attributesNames[ attributeName ];

					if( attributeName.startsWith('lang_') ) {
						let splittedName = attributeName.split('__');
						let lang = splittedName[0].split('_')[1];
						attributeName = splittedName[1];
	
						if(!(lang in metadata))
							metadata[lang] = {}

						if(!(entityName in metadata[lang]))
							metadata[lang][entityName] = {}
	
						metadata[lang][entityName][attributeName] = attributeValue;
					}
					else
						metadata['_'][entityName][attributeName] = attributeValue;
				}
			});

			/* Add common attributes to all langs */
			for(let lang in metadata) {
				if(lang !== '_')
					metadata[lang][entityName] = {...metadata[lang][entityName], ...metadata['_'][entityName]};
			}
			//delete metadata['_'];

		}).catch( (error) => {
			console.error(error.message);
		});
	}

	session.close();
	session = null;

	delete metadata._.Database;

	metadata._.props_keys = propsToEntityKeys;

	/* Add language-independent entity metadata to all langs */
	for(let lang in metadata) {
		metadata[lang] = {...metadata['_'], ...metadata[lang]};
	}

	

	return metadata;
}