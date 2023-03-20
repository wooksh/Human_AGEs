import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

import MVT from 'ol/format/MVT';

import VectorTileSource from 'ol/source/VectorTile';


function getLightSource(url) {
	return new VectorTileSource({
		url: url,
		format: new MVT(),
		crossOrigin: "anonymous"
	});
}


var tileLayerConfigs = {
	Light: [
		{
			isVector: true,
			source: getLightSource("https://api.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.mvt?style=mapbox://styles/carcinoma/ckqs0ubq74pzy17o946gocdt1@00&access_token=pk.eyJ1IjoiY2FyY2lub21hIiwiYSI6ImNrOHltOXNrNjAzOXMzZW5xdXc3bWsxMjcifQ.fqBCJli3GXsSKXVWrDvcog"),
			name: "basemap-light-water",
			style: "https://api.mapbox.com/styles/v1/carcinoma/ckqs0ubq74pzy17o946gocdt1?access_token=pk.eyJ1IjoiY2FyY2lub21hIiwiYSI6ImNrOHltNjlmaDAzOTkzb210cmswOWMxbjYifQ.b7oRjG9RxrRSKeyeb9STCA",
			visible: true,
			layerConfig: {
				zIndex: 1
			}
		},
		{
			isVector: true,
			source: getLightSource("https://api.tiles.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.mvt?style=mapbox://styles/carcinoma/ckqs0ubq74pzy17o946gocdt1@00&access_token=pk.eyJ1IjoiY2FyY2lub21hIiwiYSI6ImNrOHltOXNrNjAzOXMzZW5xdXc3bWsxMjcifQ.fqBCJli3GXsSKXVWrDvcog"),
			name: "basemap-light-boundaries",
			style: "https://api.mapbox.com/styles/v1/carcinoma/ckqs0ubq74pzy17o946gocdt1?access_token=pk.eyJ1IjoiY2FyY2lub21hIiwiYSI6ImNrOHltNjlmaDAzOTkzb210cmswOWMxbjYifQ.b7oRjG9RxrRSKeyeb9STCA",
			visible: true,
			layerConfig: {
				zIndex: 3
			}
		},
		{
			isVector: true,
			isLang: true,
			isOption: true,
			source: getLightSource("https://api.maptiler.com/tiles/v3-lite/{z}/{x}/{y}.pbf?key=B2eiVEjxGIRZhbsvM6mc"),
			name: "basemap-light-labels",
			visible: false,
			style: {
				en: "https://api.maptiler.com/maps/f9e5db6e-49a1-4c59-955e-7e93e40a7437/style.json?key=B2eiVEjxGIRZhbsvM6mc",
				pl: "https://api.maptiler.com/maps/226d69f8-a737-4378-ad3f-42f3d772b0ab/style.json?key=B2eiVEjxGIRZhbsvM6mc"
			},
			layerConfig: {
				declutter: true,
				zIndex: 4
			}
		}
	],
	OSM: [
		{
			source: new OSM(),
			name: "basemap-osm-background",
			layerConfig: {
				zIndex: -999999999
			}
		}
	],
	Imagery: [
		{
			source: new XYZ({
				attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
				url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
			}),
			name: "basemap-xyz-background",
			layerConfig: {
				zIndex: -999999999
			}
		}
	]
};



export default tileLayerConfigs;