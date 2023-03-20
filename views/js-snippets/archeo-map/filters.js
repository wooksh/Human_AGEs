import {getDecorationWithFullAttributeData} from './entities-attributes.js';


/* Filtering strategies */
function featureTimeFilter(feature) {
	let session = ArcheoSession.get();

    var timelineFrom = session.filters.timeline.yearFrom;
	var timelineTo = session.filters.timeline.yearTo;

	let dating = feature.get('properties').dating;

	if(ArcheoSession.get().filters.timeline.isActive === false)
		return true;
	
	// return true if 
	if( ArcheoUtilities.isValid(dating) ) {
		if( dating.year_start <= timelineTo && dating.year_end >= timelineFrom )
			return true;
		else
			return false;
	}
	else { // ArcheoSession.get().filters.timeline.showPresent;
		if( session.filters.timeline.showPresent === true )
			return true;
		else
			return false;
	}
}


function regionTimeFilter(regionId) {
	let session = ArcheoSession.get();

    var timelineFrom = session.filters.timeline.yearFrom;
	var timelineTo = session.filters.timeline.yearTo;

	let regionsDict = ArcheoMap.getMapRegions();

	if(session.filters.timeline.isActive === false || session.filters.timeline.doFilterRegions === false)
		return true;

	if( ArcheoUtilities.isValid(regionsDict) && ArcheoUtilities.isValid(regionId) && regionId in regionsDict) {
		let dating = regionsDict[regionId].dating;

		if( ArcheoUtilities.isValid(dating) ) {
			if( dating.year_start <= timelineTo && dating.year_end >= timelineFrom ) {
				return true;
			} else {
				return false;
			}
		}
	}

	return true; // Always hide only archaeological regions
}


function regionValueFilter(regionId, regionTypeId = null) {
	let regionsDict = ArcheoMap.getMapRegions(regionTypeId);

	if(ArcheoSession.get().filters.regions.isActive === false)
		return true;

	if( ArcheoUtilities.isValid(regionsDict) && ArcheoUtilities.isValid(regionId) && regionId in regionsDict ) {
		let regionName = regionsDict[regionId].name;
		regionTypeId = regionsDict[regionId].type;
		let legend = ArcheoSession.getRegionLegend(regionTypeId);

		let isFiltered = !(regionName in legend) || legend[regionName].filtered;

		return isFiltered === false;
	}

	return true;
}


function featureAttributeValueFilter(feature, layer, cluster) {
	var attributesIds = ArcheoSession.get().filters.attributes.available || null;
	var attributesDict = ArcheoSession.get().filters.attributes.configs;
	
	if(ArcheoSession.get().filters.attributes.isActive === false)
		return true;

	/* Filter all available attributes */
	for(var i = 0; i < attributesIds.length; ++i) {
		var attributeId = attributesIds[i];
		var attributeInfo = attributesDict[attributeId];

		var legend;
		if(attributeInfo.type === 'admixture')
			legend = ArcheoSession.getAdmixtureLegend(attributeId);
			//legend = ArcheoSession.getAdmixtureLegend(attributeId, true);
		else
			legend = ArcheoSession.getAttributeLegend(attributeId);

		var decoration = getDecorationWithFullAttributeData(
			attributeInfo, 
			feature.get('properties'),
			legend);

		var featureAttributeValue = decoration.attributeValue;
		var featureAttributeType = decoration.attributeType;

		/* Filtering for normal attributes... */
		if(featureAttributeType !== 'admixture') {
			if( ArcheoUtilities.isValid(featureAttributeValue) ) {	
				let isFiltered = (featureAttributeValue in legend) && legend[featureAttributeValue].filtered;
				
				if( (!isFiltered) === false)
					return false;
			}
		}
		/* Separately handle filtering by admixture here... */
		else {
			let admixturesNames = legend._order;

			/* Handle special attribute MISSING */
			let isMissing = featureAttributeValue[featureAttributeValue.length - 1] === 1;
			if(isMissing && legend.MISSING.filtered === true)
				return false;

			let valuesCountDict = {};

			for(var k = 0; k < decoration.attributeCount; ++k) {
				let attributeValue = admixturesNames[k];

				if( ArcheoUtilities.isValid(legend[attributeValue].group) )
					attributeValue = legend[attributeValue].group;

				let valueCount = featureAttributeValue[k];

				if(attributeValue in valuesCountDict)
					valuesCountDict[attributeValue] += valueCount;
				else
					valuesCountDict[attributeValue] = valueCount;
			}

			for(var value in valuesCountDict) {
				let proportion = ArcheoSession.get().filters.attributes.configs[attributeId].proportions[value];
			
				if(ArcheoUtilities.isValid(proportion)) {
					if(proportion.operator === 'geq' && !(valuesCountDict[value] >= proportion.value)) 
						return false;
					else if(proportion.operator === 'leq' && !(valuesCountDict[value] <= proportion.value))
						return false;
					else if(proportion.operator === 'eq' && !(valuesCountDict[value] === proportion.value))
						return false;
				}
			}
		}
	}

	return true;
}


function featureLayerComponentFilter(feature, layer, cluster) {
	var layerId = layer.get('layerId');
	var componentValues = ArcheoSession.get().layers[layerId].style.componentValues;

	var decoration = feature.get('decoration')[layerId];
	var featureAttributeValue = decoration.attributeValue;
	var featureAttributeType = decoration.attributeType;

	/* Filtering for normal attributes */
	if(featureAttributeType !== 'admixture') {
		if(componentValues.data === 'selectAll') {
			if(featureAttributeValue === 'MISSING' || featureAttributeValue === 'OTHER')
				return ArcheoUtilities.isValid(componentValues.special[featureAttributeValue]);
			else
				return true;
		}

		var components = {...componentValues.data, ...componentValues.special};

		return components[featureAttributeValue] === true;
	}

	/* Filtering for admixture attributes */
	else {
		let isMissing = featureAttributeValue[featureAttributeValue.length - 1] === 1;
		
		if(isMissing && componentValues.special.MISSING === false)
			return false;
	}

	return true;
}


function featureRegionFilter(feature, layer, cluster) {
	let strategyConfig = ArcheoSession.get().clustering.features;
	
	if( ArcheoUtilities.isValidNonEmptyString( strategyConfig.method.region ) ) {
		let regionId = feature.get('regionId');

		if (ArcheoUtilities.isValidNonEmptyString(regionId))
			return true;
		else
			return false;
	}

	return true;
}


var filtersDict = {
	'time': featureTimeFilter,
	'value': featureAttributeValueFilter,
	'region': featureRegionFilter,
	'component': featureLayerComponentFilter
};


var regionFilters = {
	'time': regionTimeFilter,
	'value': regionValueFilter
}


function regionFilter(regionId, regionTypeId = null) {
	return regionFilters.time(regionId) 
		&& regionFilters.value(regionId, regionTypeId);
}





export {filtersDict, regionFilters, regionTimeFilter, regionFilter};