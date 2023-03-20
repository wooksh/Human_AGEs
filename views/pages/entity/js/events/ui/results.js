import colors from 'Views/mixins-sass/_colors.scss';


function createAdmixturePlot(admixtureId, admixtureName, admixtureValues) {
	let newAdmixtureElement = $(`#result-chart-template`).clone();

    /* Assign new dataset id */
    newAdmixtureElement.attr('id', admixtureId + '_result-chart');
    
	/* Initialize piechart */
    let $plot = newAdmixtureElement.find('.plot');
    let labels = ArcheoSession.get().legend.attributes[admixtureId]._order;
    //let colors = labels.map((label) => tinycolor(ArcheoSession.get().legend.attributes[admixtureId][label].color).toHexString() );
    //let dataColors = labels.map((label) => ArcheoSession.get().legend.attributes[admixtureId][label].color );

    // Filter out special attributes
    labels = labels.filter(value => value !== "MISSING" && value !== "OTHER");

	ArcheoUI.initializeChart($plot, [Math.max(150, 30 * admixtureValues.length), 150], admixtureValues, labels, {
        title: admixtureName,
        type: 'bar',
        colors: colors.palette_primary_color
    });

    /* Initialize label */
    let $label = newAdmixtureElement.find('.label');
    $label.text(admixtureName);

    /* Show element */
	newAdmixtureElement.removeClass('hidden');

    return newAdmixtureElement;
}


function initializeAdmixtureEvents() {
    $('#admixtures-wrapper .collapsable').on('click', function(event) {
        let $wrapper = $(event.target).parent();
        let $content = $wrapper.find('.object-content');
        let areResultPresent = $wrapper.find('.plot').length > 0;
        let noDataAvailable = $wrapper.find('.no-results').length > 0;
        let $loadingContent = $wrapper.find('.loading-content');

        if(areResultPresent === false && noDataAvailable === false) {
            let datasetId = ArcheoCache.getTemporaryEntry('entityDatasetId');
            let admixtureIds = window.metadata.Admixture.id;
            let admixtureNames = window.metadata.Admixture.name;

            let isLoaded = false;
            let promises = [];
            for(let i = 0; i < admixtureIds.length; ++i) {
                let admixtureId = admixtureIds[i];
                let admixtureName = admixtureNames[i];
                
                let promise = ArcheoRequests.incorporateAttributes({
                    datasetId: datasetId,
                    attributeId: admixtureId,
                    attributeType: 'admixture',
                });

                promises.push(promise);

                promise.then((success) => {
                    if(success === true && ArcheoUtilities.isValid(window.entityFeature[admixtureId]) ) {
                        let admixtureValues = window.entityFeature[admixtureId].value;
                        let newAdmixtureElement = createAdmixturePlot(admixtureId, admixtureName, admixtureValues);

                        if(isLoaded === false) {
                            $loadingContent.parent().removeClass('loading');
                            isLoaded = true;

                            setTimeout(function() {
                                $loadingContent.parent().remove();
                                $content.append(newAdmixtureElement);
                            }, 200); // 2ms is the duration of ease out in the style; animation happens when removing class .loading
                        }
                        else
                            $content.append(newAdmixtureElement);
                    }
                });
            }

            Promise.all(promises).then(() => {
                if(isLoaded === false) {
                    $loadingContent.remove();
                    $content.append( $('<div>', {text: "No results available", class: "no-results"}) )
                }
            });
        }    
    });
}


function createUMAPPlot($content, UMAPId, UMAPName, plotlyOptions = {}) {//, UMAPName, UMAPValues) {
    let newUMAPElement = $(`#result-scatterplot-template`).clone();

    /* Assign new dataset id */
    let plotId = UMAPId + '_result-scatterplot';

    newUMAPElement.attr('id', `${plotId}_wrapper`);

	/* Initialize piechart */
    let $plot = newUMAPElement.find('.plot');
    $plot.attr('id', plotId);

    newUMAPElement.appendTo($content);

    plotlyOptions = {featureId: window.entityFeature.id, ...plotlyOptions};

    return AnalysisUtilities.queryAndDisplayResults(plotId, 'UMAP', UMAPId, UMAPName, plotlyOptions);
}


function initializeUMAPEvents() {
    $('#umap-wrapper .collapsable').on('click', function(event) {
        let $wrapper = $(event.target).parent();
        let $content = $wrapper.find('.object-content');
        let areResultPresent = $wrapper.find('.plot').length > 0;
        let noDataAvailable = $wrapper.find('.no-results').length > 0;

        let promises = [];
        if(areResultPresent === false && noDataAvailable === false) {
            window.entityFeature.umap_types.forEach((UMAPType) => {
                let promise = createUMAPPlot($content, UMAPType.id, UMAPType.name);
                promises.push(promise);
                
                promise.then((plotId) => {
                    let $plotWrapper = $(`#${plotId}`).parent('.result-scatterplot');

                    setTimeout(function() {
                        $plotWrapper.removeClass('hidden');
                    }, 200);
                });
            });

            let $loading = $content.children('.loading-results-wrapper');
            if(promises.length > 0) {
                Promise.all(promises).then(() => {
                    if($loading.length > 0) {
                        $loading.removeClass('loading');
                        $loading.remove();
                    }
                });
            }
            else {
                $loading.remove();
                $content.append( $('<div>', {text: "No results available", class: "no-results"}) )
            }
        }
    });
}


function createPCAPlot($content, PCAId, PCAName) {//, PCAName, UMAPValues) {
    let newPCAElement = $(`#result-scatterplot-template`).clone();

    /* Assign new dataset id */
    let plotId = PCAId + '_result-scatterplot';

    newPCAElement.attr('id', `${plotId}_wrapper`);

	/* Initialize piechart */
    let $plot = newPCAElement.find('.plot');
    $plot.attr('id', plotId);

    newPCAElement.appendTo($content);
    //newPCAElement.removeClass("hidden");

    let plotlyOptions = {featureId: window.entityFeature.id};
    
    return AnalysisUtilities.queryAndDisplayResults(plotId, 'PCA', PCAId, PCAName, plotlyOptions);
}


function initializePCAEvents() {
    $('#pca-wrapper .collapsable').on('click', function(event) {
        let $wrapper = $(event.target).parent();
        let $content = $wrapper.find('.object-content');
        let areResultPresent = $wrapper.find('.plot').length > 0;
        let noDataAvailable = $wrapper.find('.no-results').length > 0;

        let promises = [];
        if(areResultPresent === false && noDataAvailable === false) {
            window.entityFeature.pca_types.forEach((PCAType) => {
                let promise = createPCAPlot($content, PCAType.id, PCAType.name);
                promises.push(promise);
                
                promise.then((plotId) => {
                    let $plotWrapper = $(`#${plotId}`).parent('.result-scatterplot');

                    setTimeout(function() {
                        $plotWrapper.removeClass('hidden');
                    }, 200);
                });
            });

            let $loading = $content.children('.loading-results-wrapper');
            if(promises.length > 0) {
                Promise.all(promises).then(() => {
                    if($loading.length > 0) {
                        $loading.removeClass('loading');
                        $loading.remove();
                    }
                });
            }
            else {
                $loading.remove();
                $content.append( $('<div>', {text: "No results available", class: "no-results"}) )
            }
        }
    });
}


function initializeResultsEvents() {
    initializeAdmixtureEvents();
    initializeUMAPEvents();
    initializePCAEvents();
}


export default initializeResultsEvents;