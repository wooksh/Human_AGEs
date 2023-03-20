function initializeUserAttributeLegend(attributeId, features) {
	let legend = ArcheoSession.getAttributeLegend(attributeId);

    /* Add special entries for filtering purposes */
    if(!('MISSING' in legend))
        legend['MISSING'] = { filtered: false, name: 'MISSING', special: true };
    if(!('OTHER' in legend))
        legend['OTHER'] = { filtered: false, name: 'OTHER', special: true };

	ArcheoCache.createAttributeEntry(attributeId, 'MISSING');
	ArcheoCache.createAttributeEntry(attributeId, 'OTHER');
	
	features.forEach((featureInfo) => {
		let attributeInfo = featureInfo.get('properties')[attributeId];

        console.log("!!!!!!!! initializeUserAttributeLegend attributeInfo");
        console.log(attributeInfo);

		if( ArcheoUtilities.isValid(attributeInfo) ) {
			/* Update legend */
			let value = attributeInfo.value || attributeInfo;

			// Register attribute value in legend
			if( !(value in legend) )
				legend[ value ] = { 
					name: value,
					filtered: false,
					color: ArcheoUtilities.randomRGBColorGenerator().toRgbString(),
					group: null
				};

            //if(value == "undefined" || value == undefined) {
            //    alert(`UNDEFINED attributeId ${attributeId} attributeInfo ${attributeInfo}`);
            //}

            console.log("ArcheoCache.createAttributeEntry(attributeId, value)");
            console.log(`attributeId ${attributeId} value ${value}`);

			/* Add attribute to cache registry */
			ArcheoCache.createAttributeEntry(attributeId, value);
		}
	});
}


export {
    initializeUserAttributeLegend
}
