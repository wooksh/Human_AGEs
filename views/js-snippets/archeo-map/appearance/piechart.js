import {Fill, Stroke, Circle, Style, Text, RegularShape, Icon} from 'ol/style';
import {Point} from 'ol/geom';
import Chart from 'ol-ext/style/Chart';

import { getFeatureSize, getFeatureWeight, adjustOffsetVector } from './appearance-utilities';

import { interpolateColor, rgbObjToArray } from '../utilities';

import colors from 'Views/mixins-sass/_colors.scss';

import { createPiechartsLabels, removePiechartsLabels } from '../interactions/utilities';

// zrobić przekazywanie kolorów wygenerowanych dla poszczególnych wartości
// pozycje liczb w tablicy data reprezentują zawsze te same wartości atrybutu

// Data is calculated basing on source 
function getPiechartStyle(layerConfig, cluster, resolution) {
    var featureDecoration = cluster.get('decoration');
    var clusteringSettings = ArcheoSession.get().clustering.features;

    var clusterZIndex;
    if(featureDecoration.isHighlit || featureDecoration.isSelected)
        clusterZIndex = 1000000;
    else
        clusterZIndex = featureDecoration.zIndex;    

	var showValue = layerConfig.style.cardinalityByValue;
	var showSize = layerConfig.style.cardinalityBySize;
	var showColor = layerConfig.style.cardinalityByColor;

    var alpha = featureDecoration.timeColor[3];

    if(featureDecoration.isHighlit === true)
        alpha = 1;
    else if(featureDecoration.isSelected === true)
        alpha = 1;

    featureDecoration.alpha = alpha;

    var fillOpacity = Math.max(alpha - 0.2, 0.3);

    var image = null;
    var text = null;
    var backgroundImage = null;

	var pointSize;

    let mapScaleFactor = ArcheoMap.getMapScaleFactor();

    if(featureDecoration.isSelected) 
        pointSize = layerConfig.style.size[1] * mapScaleFactor;
    else if(showSize) {
        pointSize = getFeatureSize(featureDecoration, layerConfig);
	} else {
		pointSize = layerConfig.style.size[1] * mapScaleFactor;
	}

    var radiusIncrement = (featureDecoration.isHighlit || featureDecoration.isSelected) ? 2 : 0;
	var circleRadius = pointSize + radiusIncrement;

    featureDecoration.circleRadius = circleRadius;

    var circleStrokeWidth = 0.03 * circleRadius;

	var dataColors = featureDecoration.dataColorsArray;
	var dataNames = featureDecoration.dataNamesArray;

	/* Apply alpha */
	dataColors = dataColors.map((rgbaString, i) => {
        let dataColor = tinycolor( rgbaString );
	    dataColor.setAlpha(alpha);

	    return dataColor.toRgbString();
	});

    var chartType;
    var featureColor = tinycolor( layerConfig.style.color );
	featureColor = featureColor.setAlpha(alpha * featureColor.getAlpha());

    let lightFeatureColor = rgbObjToArray( tinycolor(featureColor.toRgb()).desaturate(30).lighten(30).toRgb() );
	featureColor = rgbObjToArray( featureColor.toRgb() );

	if(showColor) {
		// Kolor nie powinien być zależny od rozmiaru
		let distance = getFeatureWeight(featureDecoration, layerConfig);
		featureColor = interpolateColor(featureColor, lightFeatureColor, distance);
	}

	featureColor = ArcheoUtilities.rgbaArrayToCssString( featureColor );
	featureDecoration.featureColor = featureColor;

    var backgroundColor;

    if(featureDecoration.isSelected)
        backgroundColor = [ 220, 220, 220, fillOpacity];
    else
        backgroundColor = [ 245, 245, 245, fillOpacity];

    let wholeCircleRadius = circleRadius * 1.35;

    if(layerConfig.style.colorToggle === true) {
        backgroundImage = new Circle({
            fill: new Fill({
                color: backgroundColor
            }),
            stroke: new Stroke({
                color: featureColor,
                width: circleRadius * 0.25 //0.15
            }),
            radius: circleRadius * 1.35 //1.25
        });
    } else {
        backgroundImage = new Circle({
            fill: new Fill({
                color: backgroundColor
            }),
            radius: circleRadius //1.25
        });
    }

    let fontSize = 0.53 * circleRadius * layerConfig.style.fontSizeRatio;
    featureDecoration.fontSize = fontSize;

    let featuresCountText;

    if( layerConfig.style.valueDisplay === 'count' )
        featuresCountText = featureDecoration.count.toString();
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

    if(showValue) {
        chartType = "donut";
        text = new Text({
            textBaseline: "middle",
            text: featuresCountText,
            font:  fontSize + 'px sans-serif',
            fill: new Fill({
                //color: colors.text_color_dark //colors.text_color_light
                color: textFillColor
            }),
            stroke: new Stroke({
                color: textStrokeColor,
                width: 0.2 * fontSize //0.15
            })
        });
    } else {
        chartType = "pie";
    }

    image = new Chart({
        type: chartType,
        radius: circleRadius, 
        data: featureDecoration.dataValuesArray, // data: feature.get("data") || [10,30,20], 
        colors: dataColors,
        rotateWithView: true,
        stroke: new Stroke({	
			color: [29, 29, 29, alpha],
            width: circleStrokeWidth
        })
    });

    var styles = [];

    adjustOffsetVector(layerConfig, featureDecoration, wholeCircleRadius);
    
    var geometryFunc = function() {
        let clusterCoords = cluster.getGeometry().getCoordinates();
        return new Point(clusterCoords.add( 
            featureDecoration.offsetVector
        ))
    };

    var regionFontSize = fontSize * 0.7;

    let labelPosition = clusteringSettings.labelPosition;

    /* Regions label */
    if( ArcheoUtilities.isValid(featureDecoration.regionName && labelPosition === "cluster") ) {

        var regionFillColor = tinycolor(colors.palette_primary_color_lightest).setAlpha(0.6 * alpha).toRgbString();
        var regionStrokeColor = tinycolor(colors.palette_primary_color).darken(10).setAlpha(alpha).toRgbString();

        var regionTextFontSize = regionFontSize;
        //var regionTextLength = featureDecoration.regionName.length;
        var regionLabelYPos = 3.5 * regionTextFontSize; // To regulate height - the more, the heighter

        var regionText = new Text({
            text: featureDecoration.regionName,
            font:  "italic " + regionTextFontSize + 'px sans-serif',
            fill: new Fill({
                color: regionStrokeColor//[0, 0, 0, alpha]
            }),
            stroke: new Stroke({
                color: regionFillColor, //[255, 255, 255, alpha],
                width: regionTextFontSize * 0.3
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
        let labelYPos = 3.5 * textFontSize; // To regulate height - the more, the heighter

        var layerNameText = new Text({
            text: layerConfig.settings.title,
            font:  textFontSize + 'px sans-serif',
            fill: new Fill({
                color: [0, 0, 0, alpha]
            }),
            stroke: new Stroke({
                color: [255, 255, 255, alpha],
                width: textFontSize * 0.3
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
            image: backgroundImage,
            zIndex: clusterZIndex
        }),
        new Style({
            geometry: geometryFunc,
            image: image,
            zIndex: clusterZIndex
        }),
        new Style({
            geometry: geometryFunc,
            text: text,
            zIndex: clusterZIndex
        })
    ]);

    let labelAppearance = layerConfig.style.piechartLabelsAppearance;

    

    if(labelAppearance === 'always') {
        createPiechartsLabels([cluster], ArcheoMap.getMapSelectDraggableLayer(), 'always');
    }

    if(labelAppearance === 'select' && featureDecoration.isSelected ) {
        createPiechartsLabels([cluster], ArcheoMap.getMapSelectDraggableLayer(), 'select');
    }

    return styles;
}


export default getPiechartStyle;