import Feature from 'ol/Feature';
import {Fill, Stroke, Style, Text} from 'ol/style';
import { interpolateColor } from '../utilities';
import {Point} from 'ol/geom';


const LABEL_OFFSET_MULTIPLIER = 2.25;


function getPiechartLabelsFeatures(cluster) {
    let clusterDecoration = cluster.get('decoration');

    var layerId = cluster.get('layerId');
    var layerConfig = ArcheoSession.get().layers[layerId];
    
    var isAdmixture = layerConfig.attributeType === 'admixture';
    let showPercentages = layerConfig.style.piechartLabelsShowPercent;

    var sum = clusterDecoration.dataValuesArray.sum();
    var data = clusterDecoration.dataValuesArray;
    var dataTexts = clusterDecoration.dataNamesArray;
    var dataColors = clusterDecoration.dataColorsArray;
    var clusterGeometry = cluster.getGeometry();

	/* Apply alpha */
	dataColors = dataColors.map((rgbaString, i) => {
        let dataColor = tinycolor( rgbaString );
	    dataColor.setAlpha(clusterDecoration.alpha);

	    return dataColor.toRgbString();
	});

    var features = [];
    
    var s = 0;
    for (var i=0; i<data.length; i++) {
        var d = Math.round(data[i] * 1000) / 1000;
        var rotation = (2*s+d)/sum * Math.PI ;//- Math.PI/2;
        var v = Math.round(d/sum*10000);
        var percent = Math.round(10000 * d/sum) / 100;
        
        var ratioText = showPercentages === true || isAdmixture === true ? percent + '%' : d;



        if (v>0) {
            let featureGeometry = clusterGeometry.clone();

            let labelFeature = new Feature({
                geometry: featureGeometry
            });
            
            labelFeature.set('decoration', {
                //text: (v/100)+"% (" + dataTexts[i] + ")",
                text: dataTexts[i],
                ratio: "(" + ratioText + ")",
                strokeColor: dataColors[i],
                clusterDecoration: clusterDecoration,
                cluster: cluster,
                offsetVector: [0,0],
                rotation: rotation,
                clusterCoords: clusterGeometry.getCoordinates(),
                position: [0,0]
            });

            labelFeature.set('type', 'piechartLabel');

            features.push(labelFeature);
        }
        s += d;
    }

    return features;
}


function piechartLabelsStyle() {
    return (feature, resolution) => {
        let featureDecoration = feature.get('decoration');

        var cluster = featureDecoration.cluster;

        var layerId = cluster.get('layerId');
        var layerConfig = ArcheoSession.get().layers[layerId];

        if(layerConfig.settings.visible === false)
            return new Style(null);

        let showCountData = layerConfig.style.piechartLabelsShowCountData;

        let sizeRatio = layerConfig.style.piechartLabelsSizeRatio;
        let offsetRatio = layerConfig.style.piechartLabelsOffsetRatio;

        //var clusterDecoration = featureDecoration.clusterDecoration;
        var clusterDecoration = cluster.get('decoration');
        var fontSize = clusterDecoration.fontSize;
        var alpha = clusterDecoration.alpha;
        var zIndex = clusterDecoration.zIndex

        var labelSize = fontSize * 0.6 * sizeRatio;
        var isLeft = featureDecoration.rotation < Math.PI;

        let mapScaleFactor = ArcheoMap.getMapScaleFactor();
        var offset = clusterDecoration.circleRadius * LABEL_OFFSET_MULTIPLIER * offsetRatio;

        featureDecoration.position = [
            Math.sin(featureDecoration.rotation) * offset * resolution * mapScaleFactor,
            Math.cos(featureDecoration.rotation) * offset * resolution * mapScaleFactor
        ];

        let tinyStrokeColor = tinycolor(featureDecoration.strokeColor).toRgb();
        let strokeColor = [tinyStrokeColor.r, tinyStrokeColor.g, tinyStrokeColor.b, alpha];

        let featureColor = interpolateColor( 
            strokeColor, 
            [255, 255, 255, alpha/1.5], 
            0.25);

        var geometryFunc = function() {
            let clusterCoords = cluster.getGeometry().getCoordinates();
            return new Point(clusterCoords.add( 
                featureDecoration.clusterDecoration.offsetVector
            ))
        }

        var ratioText = '';
        if(showCountData === true)
            if(isLeft)
                ratioText = featureDecoration.ratio + ' ';
            else
                ratioText = ' ' + featureDecoration.ratio;


        return [
            /* Background */
            /*new Style({
                zIndex: 900000,
                text: new Text({
                    font:  labelSize + 'px sans-serif',
                    text: isLeft ? featureDecoration.ratio + " " + featureDecoration.text : featureDecoration.text + " " + featureDecoration.ratio, 
                    textAlign: (isLeft ? "left":"right"),
                    textBaseline: "middle",
                    rotation: featureDecoration.rotation % (Math.PI) - Math.PI/2,
                    offsetX: (isLeft ? offset : -offset),
                    stroke: new Stroke({
                        color: [255, 255, 255, alpha],
                        width: 
                        labelSize
                    }),
                    fill: new Fill({ color: [255, 255, 255, alpha] })
                })
            }),*/

            /* Proper text */
            new Style({
                geometry: geometryFunc,
                zIndex: zIndex + 9000,
                text: new Text({
                    font:  labelSize + 'px sans-serif',
                    text: isLeft ? ratioText + featureDecoration.text : featureDecoration.text + ratioText, /* d.toString() */
                    textAlign: (isLeft ? "left":"right"),
                    textBaseline: "middle",
                    rotation: featureDecoration.rotation % (Math.PI) - Math.PI/2,
                    offsetX: (isLeft ? offset : -offset),
                    stroke: new Stroke({
                        color: featureColor,
                        width: labelSize * 0.45
                    }),
                    fill: new Fill({ color: [0, 0, 0, alpha] })
                })
            })
        ];
    }
}


export {getPiechartLabelsFeatures, piechartLabelsStyle};