import { initializeSessionModal } from './utilities.js';


function sessionManagementEvents() {
    $('#load-session').on('click', function(event) {
        //$("#session-modal").modal('show');

        $('#load-session-input').trigger('click');
    });


    $('#load-session-input').on('change', function(event) {
        let input = event.target;
        let file = input.files[0];

        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = function (evt) {
                let importedSession = JSON.parse( evt.target.result );

                let sessionId = ArcheoCache.addSession(importedSession);
                if(sessionId !== false) {
                    initializeSessionModal('import-session', sessionId);

                    $('#load-session-error-text').html("");
                } else
                    $('#load-session-error-text').html("Couldn't import the session. Propably the imported file is corrupted. You may check the file with any online JSON validator.");
            }

            reader.onerror = function (evt) {
                alert("Unfortunately, you can't import the file, because your browser does not support FileAPI. Please update your browser to the newest version.");
            }
        }
    });


    $('#new-session-button').on('click', function (event) {
        let sessionName = $('#new-session').val();

        if( ArcheoUtilities.isValidNonEmptyString(sessionName) ) {
            $('#new-session-error-text').html('');
            let currentSession = ArcheoSession.get();
            let newSession = ArcheoUtilities.deepCloneObject( currentSession );

            newSession._meta.name = sessionName;
            newSession._meta.creationDate = ArcheoUtilities.getCurrentDateString();
            newSession._meta.editDate = newSession._meta.creationDate;

            let sessionId = ArcheoCache.addSession(newSession);

            if(sessionId !== false) {
                initializeSessionModal('new-session', sessionId);
            } else
                $('#new-session-error-text').html("Couldn't import the session. Please contact the administrator");
        } else
            $('#new-session-error-text').html('No session name has been provided');
    });
}


export default sessionManagementEvents;