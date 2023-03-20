function loadAllData(datasetId, samplingRatio = 1.0, shuffle = false) { // dataSource
	var features = ArcheoCache.getDatasetFeatures(datasetId);

	if(shuffle === true)
		features.shuffle();

	/* Sample */
	features = ArcheoUtilities.sampleArray(features, samplingRatio);

	ArcheoMap.setDataSourceFeatures(datasetId, features);

	return features;
}


function updateSessionWithTimeData(data) {
	let timelineInfo = ArcheoSession.get().filters.timeline;

	timelineInfo.yearTo = data.yearTo || timelineInfo.yearTo;
	timelineInfo.yearFrom = data.yearFrom || timelineInfo.yearFrom;
	timelineInfo.minYear = data.minYear || timelineInfo.minYear;
	timelineInfo.maxYear = data.maxYear || timelineInfo.maxYear;

	return data;
}


export {
	loadAllData,
	updateSessionWithTimeData
};