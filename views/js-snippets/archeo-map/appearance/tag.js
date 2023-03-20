import {Fill, Stroke, Circle, Style, Icon, Text} from 'ol/style';
import {getFeatureSize, getFeatureWeight, adjustOffsetVector} from './appearance-utilities';
import colors from 'Views/mixins-sass/_colors.scss';
import { interpolateColor, rgbObjToArray } from '../utilities';
import {Point} from 'ol/geom';

import {getUid} from 'ol/util';


function getTagStyle(layerConfig, cluster, resolution) {
	var clusterDecorationConfig = cluster.get('decoration');
	var clusteringSettings = ArcheoSession.get().clustering.features;
	var clusterUid = getUid(cluster);

	var clusterZIndex;
    if(clusterDecorationConfig.isHighlit || clusterDecorationConfig.isSelected)
        clusterZIndex = 1000000;
    else
        clusterZIndex = clusterDecorationConfig.zIndex;  

	clusterDecorationConfig = !clusterDecorationConfig ? {highlit: false, selected: false, label: ''} : clusterDecorationConfig;
	var alpha = clusterDecorationConfig.timeColor[3];

	if(clusterDecorationConfig.isHighlit === true) {
		alpha = 1;
	} else if(clusterDecorationConfig.isSelected === true)
		alpha = 1;

	clusterDecorationConfig.alpha = alpha;

	var fillOpacity = alpha;

	var showSize = layerConfig.style.cardinalityBySize;
	var showColor = layerConfig.style.cardinalityByColor;
	var showValue = layerConfig.style.cardinalityByValue;

	var featureColor = tinycolor( layerConfig.style.color );
	featureColor.setAlpha(alpha * featureColor.getAlpha());

	let lightFeatureColor = rgbObjToArray( tinycolor(featureColor.toRgb()).desaturate(30).lighten(30).toRgb() );
	featureColor = rgbObjToArray( featureColor.toRgb() );

	//clusterDecorationConfig.featureColor = featureColor;

	/* Calculate weight */
	let weight = getFeatureWeight(clusterDecorationConfig, layerConfig);

	var layerColor;
	if(showColor) {
		layerColor = interpolateColor(featureColor, lightFeatureColor, weight);
	} else {
		layerColor = featureColor;
	}

	layerColor = ArcheoUtilities.rgbaArrayToCssString( layerColor );
	clusterDecorationConfig.featureColor = layerColor;

	if(layerConfig.style.colorToggle === false) {
		layerColor = tinycolor(colors.palette_primary_color).setAlpha(alpha);
	}

	var styles = [];

	let mapScaleFactor = ArcheoMap.getMapScaleFactor();
	var minSize = layerConfig.style.size[0] * mapScaleFactor;
	var maxSize = layerConfig.style.size[1] * mapScaleFactor;
	var meanSize = (maxSize + minSize) / 2.0;

	clusterDecorationConfig.circleRadius = meanSize; // set pointer size

	var tagsTexts = clusterDecorationConfig.dataNamesArray.clone();
	var tagsCounts = clusterDecorationConfig.dataValuesArray.clone();

	/* Calculate cluster words statistics once in a loop */
	let maxTagCount = 0, minTagCount = Infinity; 
	let sumTagCount = clusterDecorationConfig.count;
	let wordMeanLength = 0, wordMaxLength = 0;
	for(var i = 0; i < tagsCounts.length; ++i) {
		if(maxTagCount < tagsCounts[i])
			maxTagCount = tagsCounts[i];
		
		if(minTagCount > tagsCounts[i])
			minTagCount = tagsCounts[i];

		wordMeanLength += tagsTexts[i].length;

		if(wordMaxLength < tagsTexts[i].length)
			wordMaxLength = tagsTexts[i].length;

		/* Add dot if neccessary */
		if(layerConfig.style.showFullStop === true)
			if(tagsTexts[i] !== 'MISSING' && tagsTexts[i] !== 'OTHER')
				tagsTexts[i] = tagsTexts[i] + ".";
	}

	wordMeanLength /= tagsTexts.length;

	if(layerConfig.style.showFullStop === true) {
		wordMeanLength += 1;
		wordMaxLength += 1;
	}

	/* Handle region name */
	const LABEL_SIZE_FACTOR = 0.9;
	var clusterCount = clusterDecorationConfig.count;

	let labelPosition = clusteringSettings.labelPosition;
	var regionName = clusterDecorationConfig.regionName;
	var regionSize = Math.max(1, clusterCount * LABEL_SIZE_FACTOR / 2);

	if( ArcheoUtilities.isValid(regionName) && labelPosition === "cluster" ) {
		tagsTexts.unshift(regionName);
		tagsCounts.unshift(regionSize);
	}

	/* Handle layer name */
	let layerName = layerConfig.settings.title;
	if(layerConfig.style.layerNameToggle === true) {
		tagsTexts.unshift(layerName);
		tagsCounts.unshift(regionSize);
	}

	/* Handle cluster count count */
	if(showValue) {
		let featuresCountText;
		if( layerConfig.style.valueDisplay === 'count' )
			featuresCountText = clusterCount.toString();
		else if( layerConfig.style.valueDisplay === 'weight' ) {
			featuresCountText = ArcheoUtilities.round(weight, 3).toString();
		}

		tagsTexts.push(featuresCountText);
		//tagsCounts.push(regionSize);
		tagsCounts.push( Math.max(1, clusterCount / 2) );
	}

	var wordCount = tagsTexts.length;
	var padding = maxSize * (layerConfig.style.padding || 0.15);

	var randomStepSize = (layerConfig.style.seed || .25);
	var paddedWordMaxLength = wordMaxLength * (maxSize + 2*padding + randomStepSize);
	var cloudRadius = Math.sqrt(wordCount * paddedWordMaxLength);
	cloudRadius = Math.ceil( cloudRadius / paddedWordMaxLength ) * paddedWordMaxLength * 2;

	/* Fix for single words not fitting in cloud canvas */
	cloudRadius += maxSize * 2; 

	var offsetBase = cloudRadius * 0.1;

	var cloudSize = [cloudRadius, cloudRadius];

	var words = [];

	adjustOffsetVector(layerConfig, clusterDecorationConfig, offsetBase);
    
    var geometryFunc = function() {
        let clusterCoords = cluster.getGeometry().getCoordinates();
        return new Point(clusterCoords.add( 
            clusterDecorationConfig.offsetVector
        ))
    }

	/* Render */
	var wordIncrement = (clusterDecorationConfig.isHighlit || clusterDecorationConfig.isSelected) ? 8 : 0;
	//var wordIncrement = 0;

	/* Calc words positions */ 
	//if( !ArcheoUtilities.isValid(clusterDecorationConfig.words) ) {

	let canvasCache = ArcheoCache.getTemporaryEntry('canvasCache')[ layerConfig.layerId ];

	if(!(clusterUid in canvasCache)) {
		canvasCache[clusterUid] = {
			cloudCanvas: document.createElement('canvas'),
			outlineCanvas: document.createElement('canvas'),
			textCanvas: document.createElement('canvas'),

			isDone: false
		};

		canvasCache[clusterUid].cloudCanvas.width = cloudSize[0];
		canvasCache[clusterUid].cloudCanvas.height = cloudSize[1];

		canvasCache[clusterUid].outlineCanvas.width = cloudSize[0];
		canvasCache[clusterUid].outlineCanvas.height = cloudSize[1];

		canvasCache[clusterUid].textCanvas.width = cloudSize[0];
		canvasCache[clusterUid].textCanvas.height = cloudSize[1];
	}

	if(canvasCache[clusterUid].isDone === false) {
		var cloudContext = canvasCache[clusterUid].cloudCanvas.getContext('2d');//state.context;
		var outlineContext = canvasCache[clusterUid].outlineCanvas.getContext('2d');//state.context;
		var textContext = canvasCache[clusterUid].textCanvas.getContext('2d');//state.context;

		var width = canvasCache[clusterUid].cloudCanvas.width;
		var height = canvasCache[clusterUid].cloudCanvas.height;
		var center = [width / 2, height / 2];
		var firstCoord = null;
		var firstWord = null;
		var offset = null;

		var layout = d3.layout.cloud()
			.size(cloudSize)
			.words(tagsTexts.map(function(d, i) {
				let text = d;

				if(showSize) {
					return {
						text: text, 
						//size: (clusterSize * (tagsCounts[i] / sumTagCount) + minSize) * layerConfig.style.fontSizeRatio,
						//size: (((clusterSize - minSize) * tagsCounts[i] / sumTagCount) + minSize) * layerConfig.style.fontSizeRatio,
						//size: ((maxSize - minSize) * getFeatureSize({count: tagsCounts[i]}, layerConfig) + minSize) * layerConfig.style.fontSizeRatio,
						//size: (tagsCounts[i] / sumTagCount) * clusterSize * 1,
						//size: (tagsCounts[i] / maxTagCount) * clusterSize * 1,
						size: ((weight * (maxSize - minSize) * tagsCounts[i] / sumTagCount) + minSize) * layerConfig.style.fontSizeRatio,
						rand: (new Math.seedrandom(d)).quick(),
						//count: tagsCounts[i]
					};
				} else {
					// Tags will be proportional to cluster, but not to all layer features //
					return {
						text: text, 
						size: (((maxSize - minSize) * tagsCounts[i] / sumTagCount) + minSize) * layerConfig.style.fontSizeRatio,
						rand: (new Math.seedrandom(d)).quick(),
						//count: tagsCounts[i]
					};
				}
			}))
			//.padding(padding)
			.padding(function(word) {
				if(ArcheoUtilities.isNumber(word.text))
					return padding * 4;
				else
					return padding;
			})
			//.rotate( function() { return 0.5; } )
			.rotate( 0 )
			//.rotate( function() { return (~~(Math.random() * 6) - 3) * 30; } )
			.font("sans-serif")
			.fontSize(function(word) { 
				return word.size; 
			})
			.spiral(layerConfig.style.strategy)
			//.random( function(d) { return (new Math.seedrandom(d.text)).quick(); } ) // random seed word
			.random( function(d) { return randomStepSize; } ) // random seed word
			//.random( function() { return Math.random(); } )
			.on("word", (word) => {
				//words = ws;
				clusterDecorationConfig.words = words;

				//// Prepare contexts ////
				cloudContext.globalAlpha = fillOpacity * layerConfig.style.drawingAlpha;
				cloudContext.outlineContext = fillOpacity * layerConfig.style.drawingAlpha;
				cloudContext.textContext = fillOpacity * layerConfig.style.drawingAlpha;

				var wordSize = word.size;

				//// Prepare some initial values ////
				if( ! ArcheoUtilities.isValid(firstCoord) ) {
					firstCoord = [word.x + (word.width / 4), word.y];
					firstWord = word;
				}

				/* Fix for browser zoom level */
				offset = (firstWord.size - firstWord.size * window.browserZoomLevel) * 6; // sqrt 2
				//offset = (firstWord.width - firstWord.width * window.browserZoomLevel); // sqrt 2			

				/* Setup tag final data */
				word.realX = parseInt(word.x - firstCoord[0] + offset);// + cloudRadius/2;
				word.realY = parseInt(word.y - firstCoord[1] + offset);// cloudRadius/2;

				if(word.text === regionName)
					word.realFont = "italic " + word.style + " " + word.weight + " " + ~~((wordSize + 1)) + "px " + word.font;
				else if(word.text === layerName)
					word.realFont = "bold " + word.style + " " + word.weight + " " + ~~((wordSize + 1)) + "px " + word.font;
				else
					word.realFont = word.style + " " + word.weight + " " + ~~((wordSize + 1)) + "px " + word.font;

				if(word.text === 'MISSING' || word.text === 'OTHER') {
					if(clusterDecorationConfig.isSelected) {
						word.outlineColor = `rgba(240, 240, 240, ${fillOpacity})`;
						word.fillColor = `rgba(15, 15, 15, ${fillOpacity})`;
					} else {
						word.outlineColor = `rgba(15, 15, 15, ${fillOpacity})`;
						word.fillColor = `rgba(255, 255, 255, ${fillOpacity})`;
					}

					if(word.text === 'MISSING')
						word.overlayColor = `rgba(55, 55, 55, ${fillOpacity})`;
					else if(word.text === 'OTHER')
						word.overlayColor = `rgba(115, 115, 115, ${fillOpacity})`;
				} else if(word.text === regionName) {
					if(clusterDecorationConfig.isSelected) {
						word.outlineColor = tinycolor(ArcheoSession.get().legend.regions.DEFAULT.color.stroke).setAlpha(fillOpacity).toRgbString();
						word.fillColor = tinycolor(ArcheoSession.get().legend.regions.DEFAULT.color.background).setAlpha(fillOpacity).toRgbString();

						word.overlayColor = `rgba(215, 215, 215, ${fillOpacity})`;
					} else {
						word.outlineColor = tinycolor(ArcheoSession.get().legend.regions.DEFAULT.color.background).setAlpha(fillOpacity).toRgbString();;
						word.fillColor = `rgba(15, 15, 15, ${fillOpacity})`;

						word.overlayColor = `rgba(255, 255, 255, ${fillOpacity})`;
					}
				} 
				else {
					if(clusterDecorationConfig.isSelected) {
						word.outlineColor = `rgba(35, 35, 35, ${fillOpacity})`;
						word.overlayColor = `rgba(215, 215, 215, ${fillOpacity})`;
						word.fillColor = `rgba(235, 235, 235, ${fillOpacity})`;

					} else {
						word.outlineColor = `rgba(240, 240, 240, ${fillOpacity})`;
						word.overlayColor = `rgba(255, 255, 255, ${fillOpacity})`;
						word.fillColor = `rgba(15, 15, 15, ${fillOpacity})`;
					}
				}

				word.cloudSizeRatio = 0.75;
				let cloudStrokeRatio = 1.65;
				if(word.text === regionName) {
					//word.cloudColor = tinycolor(colors.palette_primary_color_light).toRgbString();
					//word.cloudColor = tinycolor(ArcheoSession.get().legend.regions.DEFAULT.color.stroke).setAlpha(fillOpacity).toRgbString();
					word.cloudColor = tinycolor(ArcheoSession.get().legend.regions.DEFAULT.color.stroke).setAlpha(fillOpacity).toRgbString();
				} 
				else if(word.text === layerName) {
					word.cloudColor = tinycolor('rgb(15, 15, 15)').setAlpha(fillOpacity).toRgbString();
					cloudStrokeRatio = 1.5;
				}
				else {
					word.cloudColor = layerColor;
				}

				if(layerConfig.style.fontSizeRatio < 1)
					word.cloudSizeRatio *= 1.6/layerConfig.style.fontSizeRatio; //(1 - layerConfig.style.fontSizeRatio) * 2

				word.cloudSizeRatio *= 0.8;
				let pixelRatio = window.devicePixelRatio;

				// Draw cloud //
				if(! ArcheoUtilities.isNumber(word.text)) {
					// Position the tag //
					cloudContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
					cloudContext.translate(0,0);
					cloudContext.translate( word.realX + center[0], word.realY + center[1] );
					//context.rotate(word.rotate * Math.PI / 180);
					cloudContext.font = word.realFont;

					if(layerConfig.style.colorToggle === true) {
						// Changable cloud color //
						cloudContext.strokeStyle = word.cloudColor;
						cloudContext.lineWidth = parseInt((wordSize + wordIncrement) * word.cloudSizeRatio * cloudStrokeRatio * (layerConfig.style.outlineSizeRatio || 1));
						cloudContext.lineJoin = 'round';	
						cloudContext.lineCap = 'round';

						cloudContext.globalAlpha = fillOpacity * layerConfig.style.drawingAlpha;
						cloudContext.strokeText(word.text, 0, 0);
					}
				}

				// Draw outline //
				outlineContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				outlineContext.translate(0,0);
				outlineContext.translate( word.realX + center[0], word.realY + center[1] );
				//context.rotate(word.rotate* Math.PI / 180);
				outlineContext.font = word.realFont;
				
				// Apply unchangeble cloud fill //
				let factor = 1;
				if(ArcheoUtilities.isNumber(word.text)) {
					outlineContext.strokeStyle = word.cloudColor;
					factor = 1.3;
				} else
					outlineContext.strokeStyle = word.overlayColor;

				outlineContext.lineWidth = parseInt((wordSize + wordIncrement) * word.cloudSizeRatio * (layerConfig.style.backgroundSizeRatio || 1)) * factor; // * word.cloudSizeRatio);
				outlineContext.lineJoin = 'round';	
				outlineContext.lineCap = 'round';

				//outlineContext.globalAlpha = fillOpacity * layerConfig.style.drawingAlpha;
				outlineContext.globalAlpha = 1;
				outlineContext.strokeText(word.text, 0, 0);


				// Draw text //
				textContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				textContext.translate(0,0);
				textContext.translate( word.realX + center[0], word.realY + center[1] );
				//context.rotate(word.rotate * Math.PI / 180);
				textContext.font = word.realFont;

				textContext.lineJoin = 'round';	
				textContext.lineCap = 'round';

				// Unchangeble thin white overlay for the visibiliy //
				textContext.strokeStyle = word.outlineColor;
				textContext.lineWidth = parseInt(wordSize * 0.15);
				textContext.strokeText(word.text, 0, 0);
				
				// Write text //
				textContext.lineWidth = parseInt(wordSize);
				textContext.fillStyle = word.fillColor;

				textContext.globalAlpha = fillOpacity * layerConfig.style.drawingAlpha;
				textContext.fillText(word.text, 0, 0);
			})
			.on("end", (ws) => {
				canvasCache[clusterUid].isDone = true;
			});

		layout.start();
	}


	styles.push(
		new Style({
			geometry: geometryFunc,
			renderer: async function(coords, state) {


				if(clusterUid in canvasCache && canvasCache[clusterUid].isDone === true) {
					state.context.drawImage(canvasCache[clusterUid].cloudCanvas,
						coords[0] - center[0], coords[1] - center[1]);

					state.context.drawImage(canvasCache[clusterUid].outlineCanvas,
						coords[0] - center[0], coords[1] - center[1]);

					state.context.drawImage(canvasCache[clusterUid].textCanvas,
						coords[0] - center[0], coords[1] - center[1]);
				}
			},
			zIndex: clusterZIndex + 1
		}),
	);

    return styles;
}


export default getTagStyle;