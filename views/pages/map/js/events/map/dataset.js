import { loadAllData, updateSessionWithTimeData } from './utilities.js'; 


function dataSourcesTimeFilteringEvent() {
	$('#map').on('time-filter-update', function(event, data) {
		updateSessionWithTimeData(data);

		//ArcheoLegend.clearLegend();
		ArcheoMap.triggerClusterFilters(null, true);
		ArcheoMap.triggerLayerStyleFunction();
	});
}


$('#map').on('time-present-filter-update', function(event, data) {
	updateSessionWithTimeData(data);

	//ArcheoLegend.clearLegend();
	ArcheoMap.triggerClusterFilters();
	ArcheoMap.triggerLayerStyleFunction();
});


function addDataSourceEvent() {
	$('#map').on('dataset-add', function(event, data) {
		/* Create map source object */
		var datasetConfig = ArcheoSession.get().datasets[ data.datasetId ];
		var isPresent = datasetConfig.isPresent;
		var samplingRatio = datasetConfig.samplingRatio;

		ArcheoMap.addSource(data.datasetId);

		loadAllData(data.datasetId, samplingRatio);
	});
}


function initializeDatasetEvents() {
	dataSourcesTimeFilteringEvent();
	addDataSourceEvent();
}


export default initializeDatasetEvents;