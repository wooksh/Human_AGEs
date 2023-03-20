import 'json5';


function graphqlify(obj, asList = false) {
	if(asList) {
		var list = [];
		for(var key in obj)
			list.push( `${key}:${obj[key]}` );
		return list.join(',');
	}
	else {
		return JSON5.stringify(obj, {quote: '"'});
	}
}


function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}


async function promiseIncorporatingAttributeType(attributeId, attributeTypeName, features, objectId, generateStyle = true) {
	return new Promise( async function(resolution, rejection) {
		let featuresDict = {};
		features.forEach((feature) => {
			featuresDict[feature.get('properties').id] = feature;
		});

		let featuresIds = Object.keys(featuresDict);

		var filters = {'id_in': featuresIds};
		var selectionSet = [ 'id', `${attributeTypeName}(type: $type)` ];
		var variablesDeclarations = {"$type": "String"};

		let query = ArcheoRequests.createGraphqlQuery(
			objectId, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		let attributeLength = 0;

		ArcheoRequests.queryGraphQL(query, (response) => {
			let attributeData = response.data[objectId];
			
			attributeData.forEach((featureInfo) => {
				let featureId = featureInfo.id;

				let attributeInfo = featureInfo[attributeTypeName];

				featuresDict[featureId].get('properties')[attributeId] = attributeInfo;

				if( ArcheoUtilities.isValid(attributeInfo) )
					attributeLength = attributeInfo.value.length;
			});

			if(generateStyle === true) {
				let legend = ArcheoSession.getAttributeLegend(attributeId);

				/* Add special entries for filtering purposes */
				if(!('MISSING' in legend))
					legend['MISSING'] = { filtered: false, name: 'MISSING', special: true };
				if(!('OTHER' in legend))
					legend['OTHER'] = { filtered: false, name: 'OTHER', special: true };

				let valuesLabels = [];
				if(attributeLength > 0) {
					/* Determine values labels */
					for(var i = 1; i <= attributeLength; ++i) {
						let valueLabel = `k #${i}`;
						valuesLabels.push( valueLabel );

						if( !(valueLabel in legend) )
							legend[ valueLabel ] = {
								name: valueLabel,
								filtered: false,
								color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
								group: null,
								order: i - 1
							}
					}

					valuesLabels.push('MISSING');

					legend._order = valuesLabels;
				}
			}

			resolution(true);
		},
		{type: attributeId });
	});
}


async function regenerateAttributeCache(attributeId, features) {
	return new Promise( async function(resolution, rejection) {
		ArcheoCache.createAttributeEntry(attributeId, 'MISSING');

		features.forEach((feature) => {
			if( ArcheoUtilities.isValid(feature.get('properties')[attributeId]) ) {
				let value = feature.get('properties')[attributeId].value || feature.get('properties')[attributeId];
				ArcheoCache.createAttributeEntry(attributeId, value);
			}
		});

		resolution(true);
	});
}


async function promiseIncorporatingAttribute(attributeId, features, objectId) {
	return new Promise( async function(resolution, rejection) {
		let featuresDict = {};

		features.forEach((feature) => {
			featuresDict[feature.get('properties').id] = feature;
		})

		let featuresIds = Object.keys(featuresDict);

		var filters = {'id_in': featuresIds};
		var selectionSet = [ 'id', `${attributeId}(lang: $lang)` ];
		var variablesDeclarations = {"$lang": "String"};

		let query = ArcheoRequests.createGraphqlQuery(
			objectId, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		let legend = ArcheoSession.getAttributeLegend(attributeId);

		ArcheoRequests.queryGraphQL(query, (response) => {
			if(ArcheoUtilities.isValid(response.data)) {
				let attributeDetails = response.data[objectId];

				if(ArcheoUtilities.isValid(response.errors)) {
					alert(response.errors[0].message + ' Please, contact the administrator.');
					resolution(false);
					return;
				}

				/* Add special entries for filtering purposes */
				if(!('MISSING' in legend))
					legend['MISSING'] = { filtered: false, name: 'MISSING', special: true };
				if(!('OTHER' in legend))
					legend['OTHER'] = { filtered: false, name: 'OTHER', special: true };

				ArcheoCache.createAttributeEntry(attributeId, 'MISSING');
				ArcheoCache.createAttributeEntry(attributeId, 'OTHER');
				
				attributeDetails.forEach((featureInfo) => {
					let featureId = featureInfo.id;

					let attributeInfo = featureInfo[attributeId];

					featuresDict[featureId].get('properties')[attributeId] = attributeInfo;

					if( ArcheoUtilities.isValid(attributeInfo) ) {
						/* Update legend */
						let value = attributeInfo.value;

						// Register attribute value in legend
						if( !(value in legend) )
							legend[ value ] = { 
								name: value,
								filtered: false,
								color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
								group: null
							};

						/* Add attribute to cache registry */
						ArcheoCache.createAttributeEntry(attributeId, value);
					}
				});
			}

			resolution(true);
		},
		{lang: window.getLang() });
	
	});
}


export {
	graphqlify,
	isEmpty,
	promiseIncorporatingAttributeType,
	promiseIncorporatingAttribute,
	regenerateAttributeCache
}