function getDecorationWithAttributeData(featureProperties, layerConfig, legend) {
	let attributeId = layerConfig.attributeId;
	let attributeName = layerConfig.attributeName;
	let attributeType = layerConfig.attributeType;

	let attributeProperty = featureProperties[attributeId];

	if( ArcheoUtilities.isObj(attributeProperty) )
		attributeProperty = ArcheoUtilities.deepCloneObject( attributeProperty );

	let decoration = {
		label: 				'',
		attributeValue:		ArcheoUtilities.getFeaturesAttributeValue(attributeProperty), // lang should be used here
		treeIndex:			ArcheoUtilities.isObj(attributeProperty) ? attributeProperty.index : undefined, // lang should be used here
		attributeName:  	attributeName,
		attributeId:  		attributeId,
		attributeType: 		attributeType
	};

	/* Perform filtering for admixture attribute here */
	if(attributeType === 'admixture') {
		/* Determines number of admixture values in an array, ommiting special attributes */
		let legend = ArcheoSession.getAdmixtureLegend(attributeId);
		decoration.attributeCount = legend._order.length - 1; // -1, because of special attributes

		if( decoration.attributeValue !== 'MISSING' ) {
			/* Filtering by attribute filter */
			let components = layerConfig.style.componentValues.data;

			let newAttributeValue = [];
			for(var i = 0; i < decoration.attributeCount; ++i) { 
				/* Filter out admixture info by zeroing array elements */
				let clusterName = legend._order[i];
				let isValueNotFilteredOut = legend[ clusterName ].filtered === false;

				/* Filtering by component */
				if( ArcheoUtilities.isObj(components) )
					isValueNotFilteredOut = isValueNotFilteredOut && clusterName in components;

				if(isValueNotFilteredOut)
					newAttributeValue.push( decoration.attributeValue[i] );
			}

			newAttributeValue.push(0); // Fix for displaying missing data

			decoration.attributeValue = newAttributeValue;
		}
		else {
			// legend._order.length
			let attributeValue = ArcheoUtilities.arrayFill(legend._order.length);
			attributeValue[ attributeValue.length - 1 ] = 1;

			decoration.attributeValue = attributeValue;
		}
	}
	/* Handle attributes grouping and renaming */
	else {
		if(decoration.attributeValue in legend) {
			if( decoration.attributeValue !== 'MISSING' ) {
				if( ArcheoUtilities.isValid(legend[ decoration.attributeValue ].group) ) {
					let groupId = legend[ decoration.attributeValue ].group;
					decoration.attributeValue = legend[groupId].name;
				}
				else {
					decoration.attributeValue = legend[ decoration.attributeValue ].name;
				}
			}
		}
	}

	return decoration;
}


function getDecorationWithFullAttributeData(attributeInfo, featureProperties, legend) {
	let attributeId = attributeInfo.id;
	let attributeName = attributeInfo.name;
	let attributeType = attributeInfo.type;

	/*let idLabel = 'ID: ' + ArcheoUtilities.getDeepestValue(featureProperties.id);
	let label = 
		ArcheoUtilities.getDeepestValue(featureProperties.name) ||
		ArcheoUtilities.getDeepestValue(featureProperties.function) ||
		idLabel;	
	*/

	let attributeProperty = featureProperties[attributeId];

	if( ArcheoUtilities.isObj(attributeProperty) )
		attributeProperty = ArcheoUtilities.deepCloneObject( attributeProperty );

	let decoration = {
		//label: 			'',
		attributeValue:		ArcheoUtilities.getFeaturesAttributeValue(attributeProperty), // lang should be used here
		//attributeLabels: 	null,
		//treeIndex:		ArcheoUtilities.isObj(attributeProperty) ? attributeProperty.index : undefined, // lang should be used here
		attributeName:  	attributeName,
		attributeId:  		attributeId,
		attributeType: 		attributeType
	};

	if(attributeType === 'admixture') {
		let legend = ArcheoSession.getAdmixtureLegend(attributeId);
		decoration.attributeCount = legend._order.length - 1;

		if( decoration.attributeValue !== 'MISSING' ) {
			decoration.attributeValue.push(0);
		} else {
			// legend._order.length
			let attributeValue = ArcheoUtilities.arrayFill(legend._order.length);
			attributeValue[ attributeValue.length - 1 ] = 1;

			decoration.attributeValue = attributeValue;
		}
	}
	/* Handle attributes grouping and renaming */
	else {
		if(decoration.attributeValue in legend) {
			if( decoration.attributeValue !== 'MISSING' ) {
				if( ArcheoUtilities.isValid(legend[ decoration.attributeValue ].group) ) {
					let groupId = legend[ decoration.attributeValue ].group;
					decoration.attributeValue = legend[groupId].name;
				}
				else {
					decoration.attributeValue = legend[ decoration.attributeValue ].name;
				}
			}
		}
	}

	return decoration;
}


export { 
	getDecorationWithAttributeData,
	getDecorationWithFullAttributeData
};