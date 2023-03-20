import {promiseFetchRegionsBasicData} from 'Views/pages/map/js/events/ui/right-sidebar/utilities.js';
import {promiseIncorporatingRegionsIds} from 'Views/pages/map/js/events/ui/right-sidebar/clustering/utilities.js';


function initializeRegionEvents() {
    $("#regions-select").on('changed.bs.select', function(event) {
        let $select = $(event.target);
        let regionId = $select.val()[0] || null;
        let isRegionChoosen = ArcheoUtilities.isValid(regionId);

        /* Default clustering */
        let defaultClusterConfig = { method: {region: null, distance: null} };

        /* Region clustering */
        let clusterConfig = {
			method: {
				region: regionId,
                distance: null
			}
		};

        // Update session with new region setting
        ArcheoSession.get().clustering.features = {
			...ArcheoSession.get().clustering.features,
			...clusterConfig
		};

        if(isRegionChoosen) {
            promiseFetchRegionsBasicData(regionId).then((isFetchingSuccessful) => {
                if(isFetchingSuccessful) {
                    let featuresDict = ArcheoMap.getAllFeaturesDictGroupedByObjectId(window.datasetId);

                    let objectsIds = Object.keys(featuresDict);
                    let promises = [];

                    objectsIds.forEach((objectId) => {
                        promises.push( 
                            promiseIncorporatingRegionsIds(regionId, featuresDict[objectId], objectId) 
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

                        /*let areThereAnyRegionsForFeature = !ArcheoUtilities.isEmpty(window.entityFeature.regionsIds);

                        // If no regions were found for the entity //
                        if( !didAllSucceeded || !ArcheoUtilities.isValid(regionId) ) { // Fix for sampling: do not refresh regions layer on sampling, only load up ragions data for features
                            clusterConfig = defaultClusterConfig;
                            ArcheoSession.get().clustering.features.method = defaultClusterConfig.method;
                        }*/

                        ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
                            config: clusterConfig
                        });
                    });
                }
            });
        }
        else {
            ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
                config: clusterConfig
            });

            $("#region-wrapper").addClass('hidden');
        }
    });

    $("#region-wrapper").on('map-regions-updated', function(event) {
        let $wrapper = $(event.target);

        let session = ArcheoSession.get();
        let entityMapFeature = ArcheoMap.getMapLayerFeatures(window.layerId)[0];

        if(ArcheoUtilities.isValid(entityMapFeature)) {
            let regionId = entityMapFeature.getProperties().regionId;
            
            if(ArcheoUtilities.isValid(regionId)) {
                let regionData = ArcheoMap.getMapRegions()[regionId];

                let regionDatingString = 
                    ArcheoUtilities.isValid(regionData.dating) ?
                    '<br>(' +
                    ArcheoUtilities.getFormattedYear(regionData.dating.year_start) + 
                    '&nbsp;&nbsp;&#8212;&nbsp;&nbsp;' +
                    ArcheoUtilities.getFormattedYear(regionData.dating.year_end) +
                    ')' :
                    '';

                $('#region-name').html(regionData.name + regionDatingString);
            }
            else {
                $('#region-name').html('-');
            }
        }
        else {
            let defaultClusterConfig = { method: {region: null, distance: null} };
            session.clustering.features.method = defaultClusterConfig.method
            ArcheoEvents.broadcast(['cluster-strategy-change'], null, {
                config: defaultClusterConfig
            });

            $('#region-name').html('-');
        }

        $wrapper.removeClass('hidden');
    });

    $("#regions-list-wrapper").on('map-regions-updated', function(event) {
    
    });
}


export default initializeRegionEvents;