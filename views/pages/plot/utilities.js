import queriesData from './data/queriesData.json';


function registerAnalysisUtilities() {
	window.AnalysisUtilities = {};

    AnalysisUtilities.getSelectedResultsInfo = function() {
        return [
            $('#select-pca :selected').val(), // entityId
            $('#select-pca :selected').text() + '_' + $('#select-dataset :selected').val(), //resultTypeName
            $('#select-pca :selected').text() + ' ' + $('#select-dataset :selected').text() // resultTypeDisplayName
        ];
        /*
        return {
            entityId: $('#select-pca :selected').val(),
            resultTypeName: $('#select-pca :selected').text() + '_' + $('#select-dataset :selected').val(),
            resultTypeDisplayName: $('#select-pca :selected').text() + ' ' + $('#select-dataset :selected').text()
        }*/
    }

    // function was async before
    AnalysisUtilities.queryAndDisplayResults = function(plotId, entityId, resultTypeName, resultTypeDisplayName, plotlyOptions = {}) {
        return new Promise((resolution, rejection) => {
            setTimeout(() => { // Prevents error on plotId element not found in the DOM
                let resultsCache = ArcheoCache.getTemporaryEntry('resultsCache');
                let entityCache = resultsCache[resultTypeName];
            
                if( ! ArcheoUtilities.isValid(entityCache) ) {
                    let entityQueriesData = ArcheoRequests.getEntityQueryData( queriesData, entityId );
            
                    let filters = { 'this_is_resulttype': { 
                            'ResultType': {
                                'id': resultTypeName
                            }
                        }
                    };
            
                    let query = ArcheoRequests.createGraphqlQuery(
                        entityId, 
                        entityQueriesData['selectionSet'],
                        filters,
                        entityQueriesData['variablesDeclarations'] //{'$lang': 'String'}
                        );
            
                        ArcheoRequests.queryGraphQL(query, (response) => {	
                            let results = response.data[ entityId ];
                            results = results.map((result) => { return {
                                id: result.plot_data.sample_id,
                                label: result.plot_data.pop_name,
                                x: result.plot_data.points[0],
                                y: result.plot_data.points[1]
                            }});
            
                            resultsCache[resultTypeName] = results;
                            ArcheoUI.createPlotly(plotId, results, resultTypeDisplayName, plotlyOptions);
    
                            resolution(plotId);
                        });
                } else {
                    ArcheoUI.createPlotly(plotId, entityCache, resultTypeDisplayName, plotlyOptions);
                    resolution(plotId);
                }
            }, 1000);
        });
    }

}


export default registerAnalysisUtilities;