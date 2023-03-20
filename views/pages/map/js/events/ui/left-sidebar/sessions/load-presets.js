import { createSessionElement } from './new-session/initialize-session.js';
import { isSessionAlreadyImported } from './utilities';


function sessionPresetsEvents() {
    $('#session-presets').on('changed.bs.select', async function(event) {
        //ArcheoUtilities.setContentLoading('#session-presets-wrapper').then(() => {
            let $select = $(event.target);
            let presetId = $select.val();
    
            $('#session-preset-warning-text').html('');
            $('#session-preset-error-text').html('');
    
            if( ArcheoUtilities.isValidNonEmptyString(presetId) ) {
                ArcheoRequests.requestStatic(`/sessions/${window.getLang()}/${presetId}.json`, 
                async function(fetchedSession) {
                    if( isSessionAlreadyImported(fetchedSession) ) {
                        $('#session-preset-warning-text').html('Session of such name has been already imported.');
                        //ArcheoUtilities.setContentLoaded('#session-presets-wrapper');
                    } else {
                        let isThisFirstLoadedSession = ArcheoCache.getSessionsDict()._order.length === 0;
    
                        let sessionId = ArcheoCache.addSession(fetchedSession);
    
                        if(sessionId !== false) {
                            createSessionElement(sessionId, fetchedSession).then(($session) => {
                                if(isThisFirstLoadedSession)
                                    $session.find('.session-activate').trigger('click');

                                //ArcheoUtilities.setContentLoaded('#session-presets-wrapper');
                            });
                        } else
                            $('#session-preset-error-text').html("Couldn't import the session, because the file is corrupted. Please contact the administrator");
                    }
                },
                async function (jqXHR, textStatus, errorThrown) {
                    $('#session-preset-error-text').html("Couldn't import the session, because the file is missing. Please contact the administrator");
                    console.error(`Request error, status: ${textStatus}, msg: ${errorThrown}, jqXHR: ${JSON.stringify(jqXHR)}`);
                    //ArcheoUtilities.setContentLoaded('#session-presets-wrapper');
                });
            }
        //});
    });
}

// 

export default sessionPresetsEvents;