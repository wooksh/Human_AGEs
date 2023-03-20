import { getLayerStyle } from './appearance/appearance-utilities';
import { piechartLabelsStyle } from './appearance/piechartLabels';

import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';

import convexHull from 'ol-ext/geom/ConvexHull';

import { getRegionsStyles } from './appearance/regions';
import { getMapLayers, getMapSources, getMapRegions, getRegionsLayer, getCoordinatesProjectedToMap,
	getMapSelectDraggableLayer} from './archeo-map';
import stylefunction from 'ol-mapbox-style/dist/stylefunction';
import { clearCache } from './layer';
import GeoJSON from 'ol/format/GeoJSON';

const GeoJsonParser = new GeoJSON();


function getFeatureDatingBasedColorRGBA(feature) {
  	let properties = feature.get('properties');

  	if( properties.dating ) {
		return getDatingBasedColorRGBA( properties.dating.year_start, properties.dating.year_end );
	}

	return null;
}


/* Step is 0.0 - 1.0 */
function interpolateColor(colorA, colorB, distance) {
	return colorA.mul(distance).add( colorB.mul(1.0 - distance) );
}


function getDatingBasedColorRGBA(datingFrom, datingTo) {
	var entityIntervalCenter = ArcheoUtilities.avg([datingFrom, datingTo]);

	let session = ArcheoSession.get();

    var timelineFrom = session.filters.timeline.yearFrom;
	var timelineTo = session.filters.timeline.yearTo;

    var timelineIntervalCenter = ArcheoUtilities.avg([timelineFrom, timelineTo]);
    var timelineIntervalSize = Math.max(( timelineTo - timelineFrom ), 1.0);
    var entityIntervalSize = Math.max(( datingTo - datingFrom ), 1.0);

    const hueIntervalSize = 0.666666; // From red to blue: [0, ~240]
    if(entityIntervalCenter <= timelineIntervalCenter) {
      var entityHue = ((Math.max(entityIntervalCenter, timelineFrom) - timelineFrom) / timelineIntervalSize) * hueIntervalSize;
    }
    else {
      var entityHue = ((Math.min(entityIntervalCenter, timelineTo) - timelineFrom) / timelineIntervalSize) * hueIntervalSize;
    }
  
	var entityCertaintyOpacity = 1.0;
	if(session.filters.timeline.isActive === true && session.filters.timeline.showPropability === true) {
		/* Calculate Jaccard Index */
		if(datingFrom > timelineTo || datingTo < timelineFrom)
			entityCertaintyOpacity = 0.0;
		else {
			let intersection = Math.min(timelineTo, datingTo) - Math.max(timelineFrom, datingFrom);
			let sum = Math.max(timelineTo, datingTo) - Math.min(timelineFrom, datingFrom);
			entityCertaintyOpacity = intersection / entityIntervalSize;

			// contribute avgs?
			// = Math.sqrt(intersection / sum);
		}

    	//entityCertaintyOpacity = 1.0 - ((Math.max(timelineFrom - datingFrom, 0) + Math.max(datingTo - timelineTo, 0)) / entityIntervalSize);
		//entityCertaintyOpacity = Math.max(entityCertaintyOpacity, 0);
	}

    var timeLinePortion = Math.min(entityIntervalSize / timelineIntervalSize, 1.0);
    var entityAccuracyLightenss = timeLinePortion * 0.4 + 0.5; // From full color lighthness to white is: [0.5, 1.0]
    var entitySaturation = 1.0 - (timeLinePortion * 0.7);
  
    var rgbArray = ArcheoUtilities.hslToRgb(entityHue, entitySaturation, entityAccuracyLightenss);
    rgbArray.push(entityCertaintyOpacity);

    return rgbArray;
}


function averageRgba(color1, color2) {
  return [ (color1[0]+color2[0]) / 2, (color1[1]+color2[1]) / 2, (color1[2]+color2[2]) / 2, (color1[3]+color2[3]) / 2 ];
}


function getMapSettingElementsList(elementsNames, extendedElementsDict, defaultElements) {  
	var elements = [];
	var doAttachDefaults = false;
  
	if(elementsNames === 'all') {
	  doAttachDefaults = true;
  
	  for(var elementsName in extendedElementsDict)
		elements.push( extendedElementsDict[elementsName] );
	} 
	else if( ArcheoUtilities.isArray(elementsNames) ) {
	  for(var i = 0; i < elementsNames.length; ++i) {
		let elementsName = elementsNames[i];
  
		if(elementsName == 'defaults')
		  doAttachDefaults = true;
		else
		  elements.push( extendedElementsDict[ elementsName ] );
	  }
	}
  
	if( doAttachDefaults && defaultElements !== null ) {
	  defaultElements.extend(elements);
	  elements = defaultElements;
	}
  
	return elements;
}


function triggerDataLayerStyleFunction(layer = null, selector = '#map') {
	if( ArcheoUtilities.isValid(layer) ) {
		/* Flush the style cache */
		clearCache(layer);

		if(layer.className_ === 'vector-regions') {
			layer.setStyle( getRegionsStyles(layer) );
			ArcheoCache.setTemporaryEntry('regionsNamesCache', {});
		} else if(layer.className_ === 'vectorDraggable')
			layer.setStyle( piechartLabelsStyle(layer) );
		else
			layer.setStyle( getLayerStyle(layer) );
	} else {
		let layers = {
			...getMapLayers(selector),
			'vector-regions': getRegionsLayer(),
			'vector-draggable': ArcheoMap.getMapSelectDraggableLayer()
		};

		for(var layerId in layers)
			triggerLayerStyleFunction( layers[layerId], layerId );
	}
}


function triggerLayerStyleFunction(layer = null, layerId = null, selector = '#map') {
	ArcheoLegend.clearLegend();

	if(layer == null)
		ArcheoMap.clearPiechartLabels();
	
	triggerDataLayerStyleFunction(layer, selector);

	ArcheoMap.refreshPiechartLabels();
	ArcheoMap.refreshRegionsLayer();
}


function triggerClusterFilters(layer = null, isTriggeredByTime = false, selector = '#map') {
	ArcheoMap.clearMapSelection();

	if( ArcheoUtilities.isValid(layer) ) {
		ArcheoMap.clearPiechartLabels();

		/* Reset regions change on their change */
		if(layer.className_ === 'vector-regions')
			ArcheoCache.setTemporaryEntry('regionsNamesCache', {});

		// Fix for animated clusters
		
		//if('oldcluster' in layer)
		//	layer.oldcluster.clear();

		//clearCache(layer);
		layer.getSource().refresh();
	} else {
		let layers = { ...getMapLayers(selector) };

		for(var layerId in layers) {
			let datasetId = ArcheoSession.get().layers[ layerId ].datasetId;

			if( ArcheoUtilities.isValidNonEmptyString(datasetId) ) {

				let isLayerPresent = ArcheoSession.get().datasets[ datasetId ].isPresent;

				/* Prevents reclustering of present datasets on timeline event */
				if(isTriggeredByTime === false || (isTriggeredByTime === true && isLayerPresent === false))
					triggerClusterFilters( layers[layerId], isTriggeredByTime, selector );
			}
			else {
				triggerClusterFilters( layers[layerId], isTriggeredByTime, selector );
			}
		}
	}
}


function applyTileLayerStyle(styleURL, olMapLayer, mapLayerName, mapLayerIds, callback = null) {
	return new Promise((resolution, rejection) => {
		fetch(styleURL).then(function(response) {
			response.json().then(function(glStyle) {
				stylefunction(olMapLayer, glStyle, mapLayerIds);
	
				olMapLayer.set('style', glStyle);
				olMapLayer.set('style-objects-ids', mapLayerIds);
				
				if( ArcheoUtilities.isValid(callback) ) {
					callback();
					resolution();
				}
				else {
					rejection();
				}
			});
		});
	});
}


function applyVectorLayerStyle(mapLayer, style, objectsIds) {
	stylefunction(mapLayer, style, objectsIds);
}


function setVectorLayerObjectsColor(mapLayer, colorString, objectsIds = null) {
	let styleObj = mapLayer.get('style');
	objectsIds = ArcheoUtilities.isValid(objectsIds) ? objectsIds : mapLayer.get('style-objects-ids');
	objectsIds = objectsIds || mapLayer.get('mapbox-layers');
	
	if(ArcheoUtilities.isValid(objectsIds)) {
		for(var i = 0; i < objectsIds.length; ++i) {
			let objectColorStyle = styleObj.layers.find( (x) => x.id === objectsIds[i] ).paint;

			if('fill-color' in objectColorStyle)
				objectColorStyle['fill-color'] = colorString;
			if('line-color' in objectColorStyle)
				objectColorStyle['line-color'] = colorString;
			if('text-color' in objectColorStyle)
				objectColorStyle['text-color'] = colorString;
		}

		applyVectorLayerStyle(mapLayer, styleObj, mapLayer.get('style-objects-ids'));
	}
}


// 2 => 2, 3 => 3, -2 => 1/2, -3 => 1/3 etc.
// two decimal places left
/*function transformWeightFactor(factor) {
	return Math.round( (Math.abs(factor)**Math.sign(factor)) * 100) / 100;
}*/


function rgbObjToArray(rgbObj) {
	let order = ['r', 'g', 'b', 'a'];
	let output = [];
	for(var i = 0; i < order.length; ++i)
		output.push( rgbObj[ order[i] ] );

	return output;
}


function fetchAndAddRegionPolygon(regionId, layer, highlitRegionsIds = null) {
	/* Fetch regions info */
	var filters = {'id': regionId};

	var selectionSet = [ 
		'id', 
		'polygon_part_of_this { Polygon{ pointsArray, polygonhole_part_of_this { PolygonHole{ pointsArray } } } }'
	];

	let query = ArcheoRequests.createGraphqlQuery(
		'Region', 
		selectionSet,
		filters
	);

	ArcheoRequests.queryGraphQL(query, (response) => {	
		let regionDetails = response.data.Region[0];

		/* Create valid multipolygon with holes GeoJSON */
		var geojson = {
			"type": "MultiPolygon",
			"coordinates": []
		};

		regionDetails.polygon_part_of_this.forEach((polygonRel) => {
			let polygon = polygonRel.Polygon;
			let polygonArray = [ polygon.pointsArray.map((point) => getCoordinatesProjectedToMap(point)) ];

			polygon.polygonhole_part_of_this.forEach((holeRel) => {
				let hole = holeRel.PolygonHole;
				polygonArray.push( hole.pointsArray.map((point) => getCoordinatesProjectedToMap(point)) )
			});

			geojson.coordinates.push(polygonArray);
		});

		var multipolygonFeature = GeoJsonParser.readFeature(geojson);

		let regionsDict = getMapRegions();

		multipolygonFeature.set('regionId', regionId, true);

		regionsDict[regionId].polygon = multipolygonFeature;
		regionsDict[regionId].area = multipolygonFeature.getGeometry().getArea();

		layer.getSource().addFeature( multipolygonFeature );

		if(ArcheoUtilities.isValid(highlitRegionsIds))
			highlitRegionsIds.add(regionId);
	});
}


function getClusterConvexHull(cluster, includeExactLocations = true, regionsLayer = null, featuresMarksCache = null) {
	var hull = cluster.get("convexHull");
	var features = cluster.get("features");
	var isRegionsLayerAvailable = ArcheoUtilities.isValid(regionsLayer);
	var isFeaturesCacheAvailable = ArcheoUtilities.isValid(featuresMarksCache);
					
	// calculate convex hull
	if (features && features.length) {
		var c = [];
		for (var i=0; i < features.length; i++) {
			let f = features[i];
			let coordinates = f.getGeometry().getCoordinates();

			if(includeExactLocations === true) {
				let hash = ArcheoUtilities.cantorsPairFunction(coordinates);
				let isHashAbsent = !(hash in featuresMarksCache);

				if(!isFeaturesCacheAvailable || isHashAbsent) {
					if(isRegionsLayerAvailable) {
						regionsLayer.getSource().addFeature(f);
					}

					c.push(coordinates);

					if(isFeaturesCacheAvailable)
						featuresMarksCache[hash] = true;
				}
			}
			else
				c.push(coordinates);
		}

		if (!hull) {
			hull = new Feature( new Polygon([convexHull(c)]) )
			
			/* Get and set color for hull region */
			let layerId = cluster.get('layerId');
			let alpha = cluster.get('decoration').timeColor[3];

			hull.set('layerId', layerId);
			hull.set('alpha', alpha);

			cluster.set("convexHull", hull);
		}
	}

	if(isRegionsLayerAvailable) {
		regionsLayer.getSource().addFeature ( 
			hull 
		);
	}

	return hull;
}


function getLayerZIndex(layerNumber, layerType) {
	let zIndex;
	if(layerType === 'heatmap')
		zIndex = -1000 - layerNumber;
	else
		zIndex = 10000000 - layerNumber;
	
	return zIndex;
}


export { 
  getFeatureDatingBasedColorRGBA, 
  averageRgba, 
  getMapSettingElementsList,
  triggerLayerStyleFunction,
  triggerClusterFilters,
  applyTileLayerStyle,
  interpolateColor,
  //transformWeightFactor,
  rgbObjToArray,
  fetchAndAddRegionPolygon,
  getDatingBasedColorRGBA,
  getClusterConvexHull,
  getLayerZIndex,
  applyVectorLayerStyle,
  setVectorLayerObjectsColor
};