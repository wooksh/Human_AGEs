import colors from 'Views/mixins-sass/_colors.scss';


const possiblePatterns = ['hatch', 'coal', 'dot', 'crosses', 'woven'];

function generateRandomRegionStyle() {
    let patternColor = ArcheoUtilities.randomRGBColorGenerator(true);
    let backgroundColor = ArcheoUtilities.randomRGBColorGenerator(true);

    return {
        name: '',
        color: {
            pattern: patternColor.toRgbString(),
            background: backgroundColor.setAlpha(0.3).toRgbString(),
            stroke: null
        },
        pattern: {
            type: possiblePatterns[ ArcheoUtilities.getRandomInt(0, possiblePatterns.length) ],
            angle: 45 * ArcheoUtilities.getRandomInt(0, 4),
            scale: 1.0 + 0.25 * ArcheoUtilities.getRandomInt(1, 4),
            spacing: ArcheoUtilities.getRandomInt(10, 21)
        }
    };
}


/* Gather basic data about all certain type's regions */
function promiseFetchRegionsBasicData(regionsTypeId) {
	return new Promise((resolution, rejection) => {
		var filters = {'this_is_division': {'Division': {'id': regionsTypeId}}};
		var selectionSet = [ 'id', 'name(lang: $lang)', 'centroid {x, y}', 'dating', 'bbox {x, y}' ];
		var variablesDeclarations = { "$lang": "String" };

		let query = ArcheoRequests.createGraphqlQuery(
			'Region', 
			selectionSet,
			filters,
			variablesDeclarations
		);

		/* Register region type entry */
		let regionsLegend = ArcheoSession.get().legend.regions;
		if( !(regionsTypeId in regionsLegend) )
			regionsLegend[regionsTypeId] = {};

		ArcheoRequests.queryGraphQL(query, (response) => {
			let regionsDetails = response.data.Region;

			/* Add regions info to the regions dict */
			regionsDetails.forEach((regionInfo) => {
				let id = regionInfo.id;

				let centroid = [ regionInfo.centroid.x, regionInfo.centroid.y ];
				centroid = ArcheoMap.getCoordinatesProjectedToMap(centroid);

				let boundingCoordinates = [];
				for(var i = 0; i < regionInfo.bbox.length; ++i) {
					let corner = [ regionInfo.bbox[i].x, regionInfo.bbox[i].y ];
					boundingCoordinates.push(
						ArcheoMap.getCoordinatesProjectedToMap(corner)
					);
				}

				let isThereDatingInfo = 
					ArcheoUtilities.isValid(regionInfo.dating) && 
					ArcheoUtilities.isValid(regionInfo.dating[ Object.keys(regionInfo.dating)[0] ]);

				let regionName = regionInfo.name;

				let mapRegionInfo = {
					name: regionName,
					type: regionsTypeId,
					centroid: centroid,
					extent: ArcheoMap.getExtentFromBoundingBox(boundingCoordinates)
				};

				if( !(regionName in regionsLegend[regionsTypeId]) ) {
					if(regionsTypeId === 'cultures')
						regionsLegend[regionsTypeId][regionName] = generateRandomRegionStyle();

					regionsLegend[regionsTypeId][regionName] = {
						...regionsLegend[regionsTypeId][regionName],
						name: regionName,
						filtered: false,
						group: null
					};
				}

				if(isThereDatingInfo) {
					mapRegionInfo.dating = regionInfo.dating;
					mapRegionInfo.datingMean = (regionInfo.dating.year_end - regionInfo.dating.year_start) / 2.0;
				}
				
				ArcheoMap.setMapRegions(id, mapRegionInfo, regionsTypeId);
			});

			resolution(true);
		},{ lang: window.getLang() });
	});
}


async function promiseGetDescendantsAttributes(attributeEntity, attributesValuesIds, treeIndex) {
	return new Promise( async function(resolution, rejection) {
        // 	"begins_with": "_starts_with", 

		var filters = {'name_in': attributesValuesIds, 'treeIndex_starts_with': treeIndex};
		var selectionSet = [ 'name' ];
		//var variablesDeclarations = {"$lang": "String"};

		let query = ArcheoRequests.createGraphqlQuery(
			attributeEntity, 
			selectionSet,
			filters,
			//variablesDeclarations
		);

		ArcheoRequests.queryGraphQL(query, (response) => {
			let attributeDescendants = response.data[attributeEntity];

			resolution(attributeDescendants);
		});
		//{lang: window.getLang() });
	});
}

// is_ancestor(treeIndex: String, lang: String = "en")

async function promiseGetAncestorsAttributes(attributeEntity, attributesValuesIds, treeIndex) {
	return new Promise( async function(resolution, rejection) {
        // "begins_with": "_starts_with", 

		var filters = {'name_in': attributesValuesIds};
		var selectionSet = [ 'is_ancestor(treeIndex: $treeIndex, lang: $lang)' ];
		var variablesDeclarations = {"$lang": "String", "$treeIndex": "String"};
		//var variablesDeclarations = {"$treeIndex": "String"};

		let query = ArcheoRequests.createGraphqlQuery(
			attributeEntity, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		ArcheoRequests.queryGraphQL(query, (response) => {
			let attributeAncestors = response.data[attributeEntity];
			attributeAncestors = attributeAncestors.map((el) => el.is_ancestor);
			attributeAncestors = attributeAncestors.filter((ancestor) => ArcheoUtilities.isValid(ancestor));

			resolution(attributeAncestors);
		},
		{
			lang: window.getLang(),
			treeIndex: treeIndex
		});
	});
}


async function promiseGetAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevel) {
	return new Promise( async function(resolution, rejection) {
		var filters = {'name_in': attributesValuesIds};
		var selectionSet = [ 'get_ancestor(treeLevel: $treeLevel, lang: $lang)' ];
		var variablesDeclarations = {"$lang": "String", "$treeLevel": "Int"};

		let query = ArcheoRequests.createGraphqlQuery(
			attributeEntity, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		ArcheoRequests.queryGraphQL(query, (response) => {
			let attributeAncestors = response.data[attributeEntity];
			attributeAncestors = attributeAncestors.map((el) => { 
				return el.get_ancestor 
			});

			attributeAncestors = attributeAncestors.filter((ancestor) => ArcheoUtilities.isValid(ancestor) && ancestor.path_length > -1);

			resolution(attributeAncestors);
		},
		{
			lang: window.getLang(),
			treeLevel: treeLevel
		});
	});
}


async function promiseFitlerAttributesByTreeLevel(attributeEntity, attributesValuesIds, treeLevelFrom, treeLevelTo) {
	return new Promise( async function(resolution, rejection) {
		var filters = {'name_in': attributesValuesIds, 'depth_gte': treeLevelFrom, 'depth_lte': treeLevelTo};
		var selectionSet = [ 'name' ];
		//var variablesDeclarations = {"$lang": "String"};
		var variablesDeclarations = {};

		let query = ArcheoRequests.createGraphqlQuery(
			attributeEntity, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		ArcheoRequests.queryGraphQL(query, (response) => {
			let attributeObjects = response.data[attributeEntity];

			resolution(attributeObjects);
		},
		{
			//lang: window.getLang()
		});
	});
}


function initializeTreeSearch($inputEl, attributeId) {
    if( ArcheoUtilities.isValid($inputEl.autocomplete('instance')) )     	
        $inputEl.autocomplete("destroy");

    ArcheoSearcher.initialize(
        $inputEl, attributeId, 'treeIndex', 'name', 'synonym', window.getLang(), 
        
        function( event, ui ) {			 
            $inputEl.attr( 'searched-label', ui.item.label );
            $inputEl.attr( 'searched-value', ui.item.value );
        },
        function( event, ui ) {
            let queryAttributeValue = $inputEl.attr('searched-label');
            let label = ArcheoUtilities.isStringUndefined(queryAttributeValue) ? '' : queryAttributeValue;

            $inputEl.val( label );
        });
}


function updateTreeLevelSlider($treeLevelClusteringPanel, $treeLevelSlider, attributeId, attributeType, data = {}) {
	if(attributeType === 'tree') {	
		$treeLevelClusteringPanel.removeClass('hidden');

		let allAttributes = MapUtilities.getAttributesDict();
		let attributeEntity = allAttributes[attributeId].entity;

		let minLevel = metadata[attributeEntity].minDepth;
		let maxLevel = metadata[attributeEntity].maxDepth;

		$treeLevelSlider.data("ionRangeSlider").update({
			min: minLevel,
			max: maxLevel,
			...data
		});
	}
	else {
		$treeLevelClusteringPanel.addClass('hidden');
	}
}


export {
	promiseFetchRegionsBasicData,
	promiseGetDescendantsAttributes,
	promiseGetAncestorsAttributes,
	initializeTreeSearch,
	promiseGetAttributesByTreeLevel,
	promiseFitlerAttributesByTreeLevel,
	updateTreeLevelSlider
};