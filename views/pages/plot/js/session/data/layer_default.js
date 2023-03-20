export default {
	/* Source oprtions, need to reassign them */
	//"entityType": "",	
	//"iconUrl": "",
	"positionOffsetRatio": 3.0,
	"positionOffsetRelativeToggle": true,
	"displayLabelProperty": true,

	/* Point-based representations settings */
	"cardinalityByValue": true,
	"cardinalityBySize": true,
	"cardinalityByColor": false,

	/* Size settings */
	"size": [16, 40],
	"fontSizeRatio": 1.0,

	/* Weight settings */
	"weightGrowth": "linear", // ["linear", "polynomial", exponential]
	"weightGrowthFactor": 1.0,
	"weightScalingFactor": 1.0,
	"standardisationMethod": "max", // ["none", "total", "max"]
	"valueDisplay": "count", // ["count", "weight"]
	"blur": 100,
	"radius": 100,
	"drawingAlpha": 1.0,

	/* Blending modes */
	"blendingMode": "normal",
	"layerNameToggle": false,
	"color": '',
	"gradient": null,
	"colorToggle": true,
	"pointerToggle": true,
	"angle": '',

	/* Features visibility/filtering; Could be only for heatmap and points */
	"componentValues": {
		"special": {
			"MISSING": false,
			"OTHER": true
		},
		"data": "selectAll"
	},

	/* Piecharts/Tags settings */
	"piechartLabelsAppearance": "hover",
	"piechartLabelsShowPercent": false,
	"piechartLabelsShowCountData": true,
	"piechartLabelsSizeRatio": 1,
	"piechartLabelsOffsetRatio": 1,
	"otherRatio": 0.01,
	"otherCount": 0,
	"bodyToggle": true,

	/* Tags settings */
	"showFullStop": false,
	"padding": 7,
	"seed": 0.25,
	"outlineSizeRatio": 1,
	"backgroundSizeRatio": 1,
	"strategy": "archimedean"
}; 