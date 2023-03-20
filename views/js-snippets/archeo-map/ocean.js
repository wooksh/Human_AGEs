import {Fill, Stroke, Circle, Style, Text} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';

import tileLayerSources from './data/tile-layer-sources';


function getOceanStyle() {
	//return null;
    return new Style({
        fill: new Fill({
			color: 'rgba(255,255,255,1.0)'
		})
        //zIndex: 2199
    });
}


function createOceanLayer() {
	var oceanSource = tileLayerSources.Ocean;

	return new VectorLayer({ 
		source: oceanSource,
		//style: getOceanStyle()
	}); 
}


function createOceanPolygon() {
	var oceanSource = tileLayerSources.Ocean;

	return new VectorLayer({ 
		source: oceanSource,
		//style: getOceanStyle()
	}); 
}


export { getOceanStyle, createOceanLayer };