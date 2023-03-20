import colors from 'Views/mixins-sass/_colors.scss';


function clusterSettingSliderEventSetup(sliderObj, settingName, callerName = 'onChange') {
	$(sliderObj.input).on('update select-features-clustering cluster-strategy-change', function(event, data) {
		sliderObj.update({});
	});

	var eventFunction = async function(data) {
		let value;

		if(sliderObj.options.type === 'double')
			value = [data.from, data.to];
		else
			value = data.from;

		if(settingName === 'range')
			ArcheoEvents.broadcast(['cluster-setting-change', 'cluster-range-change'], null, {
				setting: settingName,
				value: value
			});
		else
			ArcheoEvents.broadcast(['cluster-setting-change'], null, {
				setting: settingName,
				value: value
			});
	};

	let updateDict = {};

	updateDict[ callerName ] = eventFunction;
	updateDict.onUpdate = eventFunction;

	sliderObj.update(updateDict);
}


function clusterConfigCheckboxEventSetup(selector, configName, refresh) {
	$(selector).on('select-features-clustering cluster-strategy-change', function(event, data) {
		$(selector).trigger('update');
	});
	
	$(selector).on('click update', function(event) {
		let config = {};

		if( event.type === 'click')
			/* The class did not managed to switch yet, so the check must be negated for true value */
			config[ configName ] = ! $(selector).hasClass('active'); // negation applied intentionally
		else
			config[ configName ] = $(selector).hasClass('active');

		ArcheoEvents.broadcast('cluster-config-change', null, {
			config: config,
			refresh: refresh
		});
	});
}


function clusterConfigRadiobuttonEventSetup(radiobuttonWrapper, configName) {
	$(radiobuttonWrapper).on('select-features-clustering cluster-strategy-change', function(event, data) {
		//$(checkboxObj).find("[checked='']").trigger('update');
		$(radiobuttonWrapper).trigger('update');
	});
	
	$(radiobuttonWrapper).on('change update', 'input', null, function(event) {
		var $input = $(event.target);

		let config = {};
		config[ configName ] = $input.attr('value');

		ArcheoEvents.broadcast('cluster-config-change', null, {
			config: config
		});
	});
}


function clusterRegionShowCheckboxEventSetup(selector, configName) {
	$(selector).on('select-features-clustering cluster-strategy-change', function(event, data) {
		$(selector).trigger('update');
	});
	
	// layer has changed event
	$(selector).on('click update', function(event) {
		let config = {};

		if( event.type === 'click')
			/* The class did not managed to switch yet, so the check must be negated for true value */
			config[ configName ] = ! $(selector).hasClass('active'); // negation applied intentionally
		else
			config[ configName ] = $(selector).hasClass('active');

		ArcheoEvents.broadcast(['cluster-region-show', 'cluster-config-change'], null, {
			config: config
		});
	});
}


/* Assign regions ids to objects */
function promiseIncorporatingRegionsIds(regionsTypeId, featuresDict, objectId) {
	return new Promise((resolution, rejection) => {		
		let featuresIds = Object.keys(featuresDict);

		var filters = {'id_in': featuresIds};
		var selectionSet = ['id', 'regionsIds(type: $type)'];
		var variablesDeclarations = {"$type": "String"};

		let query = ArcheoRequests.createGraphqlQuery(
			objectId, 
			selectionSet,
			filters,
			variablesDeclarations
		);

		let variables = {
			type: regionsTypeId
		};
  
		ArcheoRequests.queryGraphQL(query, (response) => {
			let regionsIds = response.data[objectId];

			/* Incorporate it with features */
			regionsIds.forEach((info) => {
				if(info.regionsIds.length > 0) {
					featuresDict[info.id].forEach((f) => {
						f.get('properties').regionsIds = info.regionsIds;
						f.set('regionsIds', info.regionsIds, true);
					});
				} else {
					featuresDict[info.id].forEach((f) => {
						f.get('properties').regionsIds = [];
						f.set('regionsIds', [], true);
					});
				}
			});

			resolution(true);
		},
		variables);
	});
}


export {
    clusterSettingSliderEventSetup,
    clusterConfigCheckboxEventSetup,
    clusterRegionShowCheckboxEventSetup,
    promiseIncorporatingRegionsIds,
	clusterConfigRadiobuttonEventSetup
}