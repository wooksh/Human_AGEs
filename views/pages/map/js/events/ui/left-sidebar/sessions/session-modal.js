import { createSessionElement } from './new-session/initialize-session.js';


function sessionModalEvents() {
    let $modal = $("#session-modal");

    $('#session-modal-button-confirm').on('click', function(event) {
        let actionType = $modal.attr('action');
        let sessionId = $modal.attr('sessionId');
        let fileName = $modal.attr('fileName');

        /* Get  session */
        let session = ArcheoCache.getSession(sessionId);

        /* Modify the session */
        let dataKeys = [];
        $.each( $modal.find('input[type="checkbox"]:not(:checked)'), function(index, el) {
            let dataName = $(el).attr('data-name');
            dataKeys.push( dataName );

            if(["datasets", "layers", "map"].has(dataName)) {
                delete session[dataName];
            }
            else if(dataName === 'colors__attributes') {
                ArcheoUtilities.traverseObj(session.legend.attributes, function(obj, key) {
                    if(key === 'color')
                        obj[key] = null;
                        //delete obj[key];// = null;
                });
            }
            else if(dataName === 'colors__regions') {
                ArcheoUtilities.traverseObj(session.legend.regions, function(obj, key) {
                    if(key === 'color')
                        obj[key] = null;
                        //delete obj[key];// = null;
                });
            }
            else if(dataName === 'filters__time') {
                delete session.filters.timeline;
            }
            else if(dataName === 'filters__attributes') {
                delete session.filters.attributes;

                ArcheoUtilities.traverseObj(session.legend.attributes, function(obj, key) {
                    if(key === 'filtered')
                        obj[key] = false;
                });
            }
            else if(dataName === 'filters__regions') {
                delete session.filters.regions;

                ArcheoUtilities.traverseObj(session.legend.regions, function(obj, key) {
                    if(key === 'filtered')
                        obj[key] = false;
                });
            }
            else if(dataName === 'clustering__features') {
                delete session.clustering.features;
            }
            else if(dataName === 'clustering__attributes') {
                delete session.clustering.attributes;

                ArcheoUtilities.traverseObj(session.legend.attributes, function(obj, key) {
                    if(key === 'group')
                        obj[key] = null;
                    else if(key === '_groups')
                        obj[key] = [];
                });
            }
        });

        /* Completely remove legend entry, if possible, to reduce session file size */
        if( 
            dataKeys.has('colors__attributes') && 
            dataKeys.has('colors__regions') && 
            dataKeys.has('filters__attributes') && 
            dataKeys.has('filters__regions') && 
            dataKeys.has('clustering__attributes')
        ) { 
            delete session.legend;
        }
        else if(
            dataKeys.has('colors__attributes') &&
            dataKeys.has('filters__attributes') &&
            dataKeys.has('clustering__attributes')
        ) {
            delete session.legend.attributes;
        }
        else if(
            dataKeys.has('colors__regions') && 
            dataKeys.has('filters__regions')
        ) {
            delete session.legend.regions;
        }

        /* Perform proper action */
        if(actionType === 'new-session') {
            createSessionElement(sessionId, session);
        }
        else if(actionType === 'import-session') {
            createSessionElement(sessionId, session);
        }
        else if(actionType === 'export-session') {
            if(!fileName.endsWith('.json'))
                fileName += '.json';

            ArcheoUtilities.saveJSON(session, fileName);
        }
        else if(actionType === 'update-session') {
            /* Update message */            
            $(`#${sessionId}.session .save-state-message-text`)
                .text(`Updated state at ${ ArcheoUtilities.getFormatedTime(session._meta.editDate) }`);

            ArcheoEvents.broadcast('update-session', null, {
                sessionId: sessionId,
                sessionInfo: session._meta
            });
        }

        /* Close modal */
        $modal.modal('hide');
    });


    $('#session-modal-select-all').on('click', function(event) {
        $modal.find('input[type="checkbox"]').prop('checked', true);
    });


    $('#session-modal-deselect-all').on('click', function(event) {
        $modal.find('input[type="checkbox"]').prop('checked', false);
    });
}


export default sessionModalEvents;