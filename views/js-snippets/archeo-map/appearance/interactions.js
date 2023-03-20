import {Fill, Stroke, Circle, Style} from 'ol/style';
import MultiPoint from 'ol/geom/MultiPoint';

import colors from 'Views/mixins-sass/_colors.scss';


function getHoverStyle() {
    
    var fillColor = undefined;
    var defaultFillColor = tinycolor(colors.palette_secondary_color).setAlpha(0.4).toRgbString();

    return (feature, resolution) => {
        return [
            new Style({
                stroke: new Stroke({
                    color: colors.palette_secondary_color_darker,
                    width: 2,
                }),
                fill: new Fill({
                    color: fillColor || defaultFillColor,
                }),
            }),
            new Style({
                image: new Circle({
                    radius: 2,
                    stroke: new Stroke({
                        color: [0,0,0,1],
                        width: 1,
                    }),
                    fill: new Fill({
                        color: colors.palette_primary_color,
                    }),
                }),
                geometry: function (feature) {
                    let coordinates = feature.getGeometry().getCoordinates();

                    let multipoint = new MultiPoint([coordinates]);
                    return multipoint;
                },
            })
        ];
    }
}


export { getHoverStyle };