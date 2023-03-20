import { 
	promiseIncorporatingRegionsIds,
	clusterSettingSliderEventSetup,
	clusterConfigCheckboxEventSetup,
	clusterRegionShowCheckboxEventSetup,
	clusterConfigRadiobuttonEventSetup
} from '../utilities';

import {
	promiseFetchRegionsBasicData
} from '../../utilities';


function initializeClusteringStrategyEvents() {
	/* Change clustering mode setting */

	let distanceWrapper = $('#distance-clustering-wrapper');
	let clusteringWrapper = $('#region-clustering-wrapper');
	let settingsWrapper = $('#cluster-settings-wrapper');

	$('#clustering-mode-select').on('dataset-sampled dataset-shuffled', function() {
		ArcheoMap.triggerLayerStyleFunction();
	});

	$('#clustering-mode-select').on('dataset-sampled dataset-add dataset-shuffled', function(event, data) {
		let datasetId = data.datasetId;
		let regionsTypeId = ArcheoSession.get().clustering.features.method.region;

		if(ArcheoUtilities.isValid(regionsTypeId)) {
			let featuresDict = ArcheoMap.getAllFeaturesDictGroupedByObjectId(datasetId);

			let objectsIds = Object.keys(featuresDict);
			let promises = [];

			objectsIds.forEach((objectId) => {
				promises.push( 
					promiseIncorporatingRegionsIds(regionsTypeId, featuresDict[objectId], objectId) 
				);
			});

			Promise.all(promises).then( (successFlags) => {
				let didAllSucceeded = true;
				successFlags.forEach((hasSucceeded) => {
					if(!hasSucceeded) {
						didAllSucceeded = false;
						console.error('[ERROR] Regions have not been fetched');
						return false;
					}
				});

				if( didAllSucceeded ) { // Fix for sampling: do not refresh regions layer on sampling, only load up ragions data for features
					ArcheoMap.triggerClusterFilters();
					ArcheoMap.triggerLayerStyleFunction();
				}
			});
		}
	});

	$('#clustering-mode-select').on('changed.bs.select', function (event, data) {
		let datasetId = ArcheoUtilities.isValid(data) ? data.datasetId : null;

		var $select = $(event.target);
		var values = $select.selectpicker().val();

		let distance = values.filter((strategy) => strategy.startsWith('distance'))[0] || null;
		let region = values.filter((strategy) => strategy.startsWith('region'))[0] || null;

		if( ArcheoUtilities.isValid(distance) )
			distance = distance.split('__')[1];

		if( ArcheoUtilities.isValid(region) )
			region = region.split('__')[1];

		let clusterConfig = {
			method: {
				distance: distance,
				region: region
			}
		};

		ArcheoSession.get().clustering.features = {
			...ArcheoSession.get().clustering.features,
			...clusterConfig
		};
		
		if(! ArcheoUtilities.isValid(distance) && ! ArcheoUtilities.isValid(region))
			settingsWrapper.hide();

		/* Update UI */
		if(ArcheoUtilities.isValid(distance)) {
			distanceWrapper.removeClass('hidden');
			settingsWrapper.show();
		} else
			distanceWrapper.addClass('hidden');

		if(ArcheoUtilities.isValid(region)) {
			clusteringWrapper.removeClass('hidden');
			settingsWrapper.show();
		} else
			clusteringWrapper.addClass('hidden');

		if( ArcheoUtilities.isValid( clusterConfig.method.region ) ) {
			let regionsTypeId = clusterConfig.method.region;

			if(regionsTypeId === 'world') {
				ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
					config: clusterConfig
				});
			} else {
				promiseFetchRegionsBasicData(regionsTypeId).then((isFetchingSuccessful) => {
					if(isFetchingSuccessful) {
						let featuresDict = ArcheoMap.getAllFeaturesDictGroupedByObjectId(datasetId);

						let objectsIds = Object.keys(featuresDict);
						let promises = [];

						objectsIds.forEach((objectId) => {
							promises.push( 
								promiseIncorporatingRegionsIds(regionsTypeId, featuresDict[objectId], objectId) 
							);
						});

						Promise.all(promises).then( (successFlags) => {
							let didAllSucceeded = true;
							successFlags.forEach((hasSucceeded) => {
								if(!hasSucceeded) {
									didAllSucceeded = false;
									console.error('[ERROR] Regions have not been fetched');
									return false;
								}
							});

							
							if( didAllSucceeded ) { // Fix for sampling: do not refresh regions layer on sampling, only load up ragions data for features
								ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
									config: clusterConfig
								});
							}
						});
					}
				});
			}
		} else {
			ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
				config: clusterConfig
			});
		}

	});

	/* Change clustering distance setting */
	clusterSettingSliderEventSetup($('#clustering-slider').data("ionRangeSlider"), 'range', 'onFinish');
	
	/* Change clustering distance setting */
	clusterSettingSliderEventSetup($('#distance-slider').data("ionRangeSlider"), 'distance', 'onFinish');

	/* Change clusters at centroid placement setup */
	clusterConfigCheckboxEventSetup('#cluster-at-centroid', 'useCentroids', true);

	/* Change clusters at centroid placement setup */
	clusterRegionShowCheckboxEventSetup('#region-show', 'showRegions');	

	/* Change clusters labels placement */
	clusterConfigRadiobuttonEventSetup('#region-label-position', 'labelPosition', false); // refresh = false


	/* Initialize session */
	initializeSessionLoadEvents();
}


function initializeSessionLoadEvents() {
	/* Session initialization events */
	$('#clustering-mode-select').on('session-load', function(event) {
		/* Save current values before they get overwritten by mode select */
		let rangeValue = ArcheoSession.get().clustering.features.range;
		let distanceValue = ArcheoSession.get().clustering.features.distance;
		let useCentroids = ArcheoSession.get().clustering.features.useCentroids;
		let showRegions = ArcheoSession.get().clustering.features.showRegions;
		let labelPosition = ArcheoSession.get().clustering.features.labelPosition;
		
		/* Initialize cluster at centroid */
		ArcheoUI.toggleCheckbox($('#cluster-at-centroid'), useCentroids);

		/* Initialize region show */
		ArcheoUI.toggleCheckbox($('#region-show'), showRegions);

		/* Initialize label position */
		ArcheoUI.toggleRadiobutton($('#region-label-position'), labelPosition);

		var $select = $(event.target);
		var methods = ArcheoSession.get().clustering.features.method;
		var values = [];

		if( ArcheoUtilities.isValidNonEmptyString(methods.distance) )
			values.push('distance__' + methods.distance);

		if( ArcheoUtilities.isValidNonEmptyString(methods.region) )
			values.push('region__' + methods.region);

		$('#clustering-slider').one("cluster-strategy-change", function() {
			$('#clustering-slider').data("ionRangeSlider").update({ 
				from: rangeValue
			});
		})

		$('#distance-slider').one("cluster-strategy-change", function() {
			$('#distance-slider').data("ionRangeSlider").update({ 
				from: distanceValue
			});
		})

		/* Update the select */
		$select.selectpicker('val', values);
	});


	/*$('#cluster-at-centroid').on('session-load', function(event) {
		let $obj = $(event.target);
		let state = ArcheoSession.get().clustering.features.useCentroids;

		ArcheoUI.toggleCheckbox($obj, state);
	});


	$('#region-show').on('session-load', function(event) {
		let $obj = $(event.target);
		let state = ArcheoSession.get().clustering.features.showRegions;

		ArcheoUI.toggleCheckbox($obj, state);
	});


	$('#region-label-position').on('session-load', function(event) {
		let $obj = $(event.target);
		let state = ArcheoSession.get().clustering.features.labelPosition;

		ArcheoUI.toggleRadiobutton($obj, state);
	});*/
}


export default initializeClusteringStrategyEvents;