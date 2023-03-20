function initializeClusteringStrategy() {
	/* Spatial clustering mode select */
	var $clusteringModeSelect = $('#clustering-mode-select');
	$clusteringModeSelect.selectpicker();

	/* Spatial clustering range slider */
	ArcheoUI.initializeSlider($('#clustering-slider'), {
		min: 1,
		max: 5000000,
		step: 1,
		type: 'single',
		postfix: 'km'
	});

	/* Spatial cluster in-between distance slider */
	ArcheoUI.initializeSlider($('#distance-slider'), {
		min: 0.0,
		max: 1.0,
		step: 0.01,
		type: 'single',
		prettify: function(x) {
			if(x === 0) 
				return 'centroid';
			else if(x === 1) 
				return 'origin';
			return x;
		},
		//onChange: changeMinMaxLabels,
		//onUpdate: changeMinMaxLabels,
		//onFinish: changeMinMaxLabels
	});

	//changeMinMaxLabels( $('#distance-slider').data("ionRangeSlider").result );
}


export default initializeClusteringStrategy;