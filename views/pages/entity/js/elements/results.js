function initializeAdmixtureResults() {
    $('#admixtures-wrapper .object-content').sortable({
		placeholder: "sortable-placeholder",
		//handle: ".handle",
		delay: 250,
		opacity: 0.7
	});

    //ArcheoCache.setTemporaryEntry('entityLayerId');
}


function initializeUMAPResults() {
    $('#umap-wrapper .object-content').sortable({
		placeholder: "sortable-placeholder",
		//handle: ".handle",
		delay: 250,
		opacity: 0.7
	});
}


function initializePCAResults() {
    $('#pca-wrapper .object-content').sortable({
		placeholder: "sortable-placeholder",
		delay: 250,
		opacity: 0.7
	});
}


function initializeResultsElements() {
    initializeAdmixtureResults();
	initializeUMAPResults();
	initializePCAResults();
}


export default initializeResultsElements;