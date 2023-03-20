import {Fill, Stroke, Circle, Style, Icon, Text} from 'ol/style';
import { interpolateColor, rgbObjToArray } from '../utilities';
import { getFeatureSize, getFeatureWeight, adjustOffsetVector } from './appearance-utilities';
import {Point} from 'ol/geom';

import colors from 'Views/mixins-sass/_colors.scss';


function getPointStyle(layerConfig, cluster, resolution) {
	var featureDecoration = cluster.get('decoration');
	var clusteringSettings = ArcheoSession.get().clustering.features;

	var clusterZIndex;
    if(featureDecoration.isHighlit || featureDecoration.isSelected)
        clusterZIndex = 1000000;
    else
        clusterZIndex = featureDecoration.zIndex;  

	var clusterCount = featureDecoration.count;

	var showValue = layerConfig.style.cardinalityByValue;
	var showSize = layerConfig.style.cardinalityBySize;
	var showColor = layerConfig.style.cardinalityByColor;

	var alpha = featureDecoration.timeColor[3];

	if(featureDecoration.isHighlit === true)
		alpha = 1;
	else if(featureDecoration.isSelected === true)
		alpha = 1;

	//featureDecoration.timeColor[3] = alpha; // why?

    featureDecoration.alpha = alpha;
	
    var image = null;
	var text = null;

	var fillOpacity = Math.max(alpha - 0.2, 0.1);

	/* Calculation of sizes */
	var pointSize;

	var cardinalityPointSize = getFeatureSize(featureDecoration, layerConfig);
	let mapScaleFactor = ArcheoMap.getMapScaleFactor();

	if(showSize) {
		pointSize = cardinalityPointSize;
	} else {
		pointSize = layerConfig.style.size[1] * mapScaleFactor;
	}

	var radiusIncrement = (featureDecoration.isHighlit || featureDecoration.isSelected) ? 2 : 0;
	var circleRadius = pointSize + radiusIncrement;

	featureDecoration.circleRadius = circleRadius;

	var circleStrokeWidth = 0.20 * circleRadius;
	var circleFillSize = 0.9 * circleRadius;
	var circleStroke = null;

	var layerColor;

	var backgroundColor;
	if(featureDecoration.isSelected)
		backgroundColor = [ 220, 220, 220, fillOpacity];
	else
		backgroundColor = [ 245, 245, 245, fillOpacity];

	var featureColor;
	if(layerConfig.style.colorToggle === true)
		featureColor = tinycolor( layerConfig.style.color );
	else
		featureColor = tinycolor(colors.palette_primary_color);

	featureColor.setAlpha(alpha * featureColor.getAlpha());

	let lightFeatureColor = rgbObjToArray( tinycolor(featureColor.toRgb()).desaturate(30).lighten(30).toRgb() );
	featureColor = rgbObjToArray( featureColor.toRgb() );

	if(showColor) {
		// Kolor nie powinien być zależny od rozmiaru
		let distance = getFeatureWeight(featureDecoration, layerConfig);
		layerColor = interpolateColor(featureColor, lightFeatureColor, distance);
	} else {
		layerColor = featureColor;
	}

	layerColor = ArcheoUtilities.rgbaArrayToCssString( layerColor );
	featureDecoration.featureColor = layerColor;

	let fontSize = circleFillSize * 0.75 * layerConfig.style.fontSizeRatio;

	let featuresCountText;
	if( layerConfig.style.valueDisplay === 'count' )
        featuresCountText = clusterCount.toString();
    else if( layerConfig.style.valueDisplay === 'weight' ) {
        let weight = getFeatureWeight(featureDecoration, layerConfig);
        featuresCountText = ArcheoUtilities.round(weight, 3).toString();
    }

	var textFillColor;
    var textStrokeColor;

	if(featureDecoration.isSelected) {
        textFillColor = [255, 255, 255, alpha];
        textStrokeColor = [14, 14, 14, alpha];
    } else {
        textFillColor = [14, 14, 14, alpha];
        textStrokeColor = [255, 255, 255, alpha];
    }

	let textLayerColor = null;

	if(showValue) {
		if(layerConfig.style.bodyToggle === false && layerConfig.style.colorToggle === true) {
			textLayerColor = new Text({
				text: featuresCountText,
				font: fontSize + 'px sans-serif',
				fill: new Fill({
					color: textFillColor// get it from colors?
				}),
				stroke: new Stroke({
					color: layerColor,
					width: 0.5 * fontSize * layerConfig.style.outlineSizeRatio || 1
				})
			});
		}

		text = new Text({
			text: featuresCountText,
			font: fontSize + 'px sans-serif',
			fill: new Fill({
				color: textFillColor// get it from colors?
			}),
			stroke: new Stroke({
                color: textStrokeColor,
                width: 0.25 * fontSize
            })
		});

		circleStroke = new Stroke({
			color: layerColor,
			width: circleStrokeWidth * layerConfig.style.outlineSizeRatio || 1
		});
	} else {
		backgroundColor = layerColor;
		circleFillSize = circleRadius;
	}

	let wholeCircleRadius = circleFillSize * 0.9;

	if(layerConfig.style.colorToggle === false) {
		circleStroke = null;
	}

	if(layerConfig.style.bodyToggle === true) {
		image = new Circle({
			fill: new Fill({
				color: backgroundColor
			}),
			stroke: circleStroke,
			radius: wholeCircleRadius * layerConfig.style.backgroundSizeRatio || 1
		});
	}

	var styles = [];

	adjustOffsetVector(layerConfig, featureDecoration, wholeCircleRadius);
    
    var geometryFunc = function() {
        let clusterCoords = cluster.getGeometry().getCoordinates();
        return new Point(clusterCoords.add( 
            featureDecoration.offsetVector
        ))
    }

	let labelPosition = clusteringSettings.labelPosition;
	var regionFontSize = fontSize * 0.6;

	/* Regions label */
    if( ArcheoUtilities.isValid(featureDecoration.regionName) && labelPosition === "cluster" ) {
        var regionFillColor = tinycolor(colors.palette_primary_color_lightest).setAlpha(0.7 * alpha).toRgbString();
        var regionStrokeColor = tinycolor(colors.palette_primary_color).darken(20).setAlpha(alpha).toRgbString();

        var regionTextFontSize = regionFontSize;
        var regionTextLength = featureDecoration.regionName.length;
        var regionLabelYPos = 2.75 * regionTextFontSize; // To regulate height - the more, the heighter
		var regionText;

		regionText = new Text({
			text: featureDecoration.regionName,
			font: "italic " + regionTextFontSize + 'px sans-serif',
			fill: new Fill({
				color: regionStrokeColor,
			}),
			stroke: new Stroke({
				color: regionFillColor,
				width: regionTextFontSize * 0.2
			}),
			offsetY: -regionLabelYPos,
			textAlign: 'center'
		});
		
        styles.push(
			new Style({
				geometry: geometryFunc,
                text: regionText,
                zIndex: clusterZIndex
            })
        );
    }

    /* Layer name label */
    if(layerConfig.style.layerNameToggle === true) {
        let textFontSize = regionFontSize;
        let labelYPos = 2.75 * textFontSize; // To regulate height - the more, the heighter

		let strokeWidthRatio = 0.3;
		if(!showValue) {
			labelYPos = 0;
			strokeWidthRatio = 0.2;
		}

        var layerNameText = new Text({
            text: layerConfig.settings.title,
            font:  textFontSize + 'px sans-serif',
            fill: new Fill({
                color: [0, 0, 0, alpha]
            }),
            stroke: new Stroke({
                color: [255, 255, 255, alpha],
                width: textFontSize * strokeWidthRatio
            }),
            offsetY: labelYPos,
            textAlign: 'center'
        });

        styles.push(
            new Style({
                geometry: geometryFunc,
                text: layerNameText,
                zIndex: clusterZIndex
            })
        );
    }



	styles = styles.concat([
        new Style({
			geometry: geometryFunc,
            image: image,
			zIndex: clusterZIndex
        }), 
		new Style({
			geometry: geometryFunc,
			text: textLayerColor,
			zIndex: clusterZIndex
		}),
		new Style({
			geometry: geometryFunc,
			text: text,
			zIndex: clusterZIndex
		})
    ]);

    return styles; //styles;
}


export default getPointStyle;