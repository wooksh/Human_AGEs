function initializeInteractiveMap(lang) {
  let mapInfo = ArcheoSession.get().map;

  var mapConfig = {
    mapInitialCenter: mapInfo.position,
	  dataProjection: mapInfo.dataProjection,
	  mapProjection: mapInfo.mapProjection,
    mapInitialZoom: mapInfo.zoom,
    mapDOMObjectId: "map", // #map
	  basemapName: 'Light', //'OSM', //'Light',
    controlsNames: 'all',
    interactionsNames: 'all'
  };

  ArcheoMap.initializeMap(mapConfig, lang);
}


export default initializeInteractiveMap;