import {Fill, Stroke, Circle, Style, Text} from 'ol/style';
import FillPattern from 'ol-ext/style/FillPattern';
import Point from 'ol/geom/Point';

import { regionFilter } from '../filters.js';
import {getUid} from 'ol/util';

import { getDatingBasedColorRGBA } from '../utilities.js';
import { layerFilter } from '../interactions/utilities.js';

import { getRegionsLayer } from '../archeo-map';


const MIN_REGION_LABEL_SIZE = 8;


function getRegionsStyles() {
    return (feature, resolution) => {
        var regionType;
        var alpha = 1.0;
        let regionsLegend = ArcheoSession.get().legend.regions;
        var style = regionsLegend.DEFAULT;
        var clusteringConfig = ArcheoSession.get().clustering.features;
        var timeFilterConfig = ArcheoSession.get().filters.timeline;

        let regionId = feature.get('regionId');

        let regionsNamesCache = ArcheoCache.getTemporaryEntry('regionsNamesCache');

        let mapScaleFactor = ArcheoMap.getMapScaleFactor();

        if( ArcheoUtilities.isValid(regionId) ) {
            var regionsStyleCache = ArcheoCache.getTemporaryEntry('styleCache')['vector-regions'];
            var regionUid = getUid(feature);
            
            if( !(regionUid in regionsStyleCache) ) {
                /* Calculate region specific style config */
                let regionsDict = ArcheoMap.getMapRegions();

                if( regionsDict !== false ) {
                    /* Situation in which strategy method has changed, but regions have not managed to change yet */
                    if( ArcheoUtilities.isValid(regionsDict[regionId]) ) {
                        if( regionFilter(regionId, regionType) ) {
                        
                            /* Set dating info */
                            let dating = regionsDict[regionId].dating;

                            if( ArcheoUtilities.isValid(dating) && timeFilterConfig.doFilterRegions === true ) {
                                let regionDatingColorArray = getDatingBasedColorRGBA(dating.year_start, dating.year_end);

                                alpha = regionDatingColorArray[3];
                            }

                            /* Set region style info */
                            let regionType = regionsDict[regionId].type;
                            let regionName = regionsDict[regionId].name;
                            style = regionsLegend[regionType][regionName];         
                        
                            if( ArcheoUtilities.isValid(style.color) )
                                ArcheoLegend.appendRegionToLegend(regionName, regionType);
                            else
                                style = {style, ...regionsLegend.DEFAULT};

                            let patternColor;
                            let textPatternColor;
                            if( ArcheoUtilities.isValid(style.color.pattern) ) {
                                patternColor = tinycolor(style.color.pattern);

                                patternColor = patternColor.setAlpha( patternColor.getAlpha() * alpha ).toRgbString();
                                textPatternColor = tinycolor(style.color.pattern).darken(30).setAlpha( alpha * 2 ).toRgbString();
                            } else
                                patternColor = 'rgba(0,0,0,0)';

                            let backgroundColor;
                            let textBackgroundColor;
                            if( ArcheoUtilities.isValid(style.color.background) ) {
                                backgroundColor = tinycolor(style.color.background);
                                backgroundColor = backgroundColor.setAlpha( backgroundColor.getAlpha() * alpha ).toRgbString();
                                textBackgroundColor = tinycolor(style.color.background).setAlpha( alpha * 2 ).toRgbString();
                            } else
                                backgroundColor = 'rgba(0,0,0,0)';

                            let strokeColor;
                            if( ArcheoUtilities.isValid(style.color.stroke) ) {
                                strokeColor = tinycolor(style.color.stroke);
                                strokeColor = strokeColor.setAlpha( strokeColor.getAlpha() * alpha ).toRgbString();
                            } else
                                strokeColor = 'rgba(0,0,0,0)';

                            let textSize = Math.min(50, (Math.sqrt(regionsDict[regionId].area) / resolution) * 0.125 * mapScaleFactor);

                            if( ArcheoUtilities.isValid(style.pattern) ) {
                                regionsStyleCache[ regionUid ] = [
                                    new Style({
                                        fill: new FillPattern({
                                            color: patternColor,
                                            pattern: style.pattern.type,
                                            fill: new Fill({
                                                color: backgroundColor,
                                            }),
                                            angle: style.pattern.angle,
                                            scale: style.pattern.scale,
                                            spacing: style.pattern.spacing 

                                        })
                                    })
                                ];

                                if(clusteringConfig.labelPosition === 'region' && !(regionName in regionsNamesCache)) {
                                    let tinyBackground = tinycolor(backgroundColor);

                                    let regionTextObj = null;
                                    if(textSize > MIN_REGION_LABEL_SIZE) {
                                        regionTextObj = new Text({
                                            text: regionName,
                                            font: 'italic ' + textSize + 'px sans-serif',
                                            fill: new Fill({
                                                //color: 'rgba(0,0,0,0)' //patternColor// get it from colors?
                                                color: textPatternColor //patternColor// get it from colors?
                                                //color: tinycolor('rgba(0,0,0,0)').setAlpha( alpha ).toRgbString()
                                            }),
                                            stroke: new Stroke({
                                                //color: backgroundColor,
                                                color: tinyBackground.setAlpha(0.1 + 2 * tinyBackground.getAlpha()).toRgbString(),
                                                width: 0.2 * textSize
                                            })
                                        });
                                    }
                                
                                    regionsStyleCache[ regionUid ].push(
                                        new Style({
                                            text: regionTextObj,
                                            geometry: function() {
                                                return new Point(regionsDict[regionId].centroid)
                                            }
                                        })
                                    );

                                    regionsNamesCache[regionName] = true;
                                }
                            } else {
                                regionsStyleCache[ regionUid ] = [
                                    new Style({
                                        stroke: new Stroke({
                                            color: strokeColor,
                                            width: 3 * mapScaleFactor,
                                        }),
                                        fill: new Fill({
                                            color: backgroundColor
                                        })
                                    })
                                ];

                                if(clusteringConfig.labelPosition === 'region') {
                                    let regionTextObj = null;
                                    if(textSize > MIN_REGION_LABEL_SIZE) {
                                        regionTextObj = new Text({
                                            text: regionName,
                                            font: 'italic ' + textSize + 'px sans-serif',
                                            fill: new Fill({
                                                color: tinycolor(strokeColor).darken(5).setAlpha( alpha * 2 ).toRgbString()
                                                //color: tinycolor('rgba(0,0,0,0)').setAlpha( alpha ).toRgbString()
                                            }),
                                            stroke: new Stroke({
                                                color: tinycolor(backgroundColor).setAlpha( tinycolor(backgroundColor).getAlpha() * 3 ).toRgbString(),
                                                width: 0.1 * textSize
                                            })
                                        });
                                    }
                                    
                                    regionsStyleCache[ regionUid ].push(
                                        new Style({
                                            text: regionTextObj,
                                            geometry: function() {
                                                return new Point(regionsDict[regionId].centroid)
                                            }
                                        })
                                    );
                                }
                            }
                        }
                    }
                }

                if( !(regionUid in regionsStyleCache) )
                    regionsStyleCache[ regionUid ] = new Style(null);
            }

            return regionsStyleCache[ regionUid ];
        }
        else {
            let layerId = feature.get('layerId');
            let layerConfig = ArcheoSession.get().layers[layerId];
    
            if(layerConfig.settings.visible === false)
                return new Style(null);

            /* Removes convex hull region of unexisting cluster */
            /* if( ! ArcheoUtilities.isValid(feature.get('cluster')) ) {
                getRegionsLayer().getSource().removeFeature(feature);
                return new Style(null);
            }*/

            let layerColor = layerConfig.style.color;
			alpha = feature.get('alpha');

            let backgroundColor = tinycolor(style.color.background);
            backgroundColor = backgroundColor.setAlpha( backgroundColor.getAlpha() * alpha ).toRgbString();

            let strokeColor = tinycolor(style.color.stroke);
            strokeColor = strokeColor.setAlpha( strokeColor.getAlpha() * alpha ).toRgbString();

            let fillColor;
            if(layerConfig.style.colorToggle === true) {
                fillColor = tinycolor( layerColor ).setAlpha(0.2 * alpha);
            }
            else {
                // tinycolor(backgroundColor).setAlpha( tinycolor(backgroundColor).getAlpha() * 3 ).toRgbString()
                fillColor = backgroundColor;
            }

            return new Style({
                stroke: new Stroke({
                    color: strokeColor,
                    width: 3 * mapScaleFactor,
                }),
                fill: new Fill({
                    color: fillColor
                })
            })
        }
    }
}


export { getRegionsStyles };