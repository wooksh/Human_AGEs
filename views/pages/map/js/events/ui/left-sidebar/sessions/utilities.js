function isSessionAlreadyImported(newSession) {
    let importedSessionsDict = ArcheoCache.getTemporaryEntry('importedSessions');
    let sessionsKeys = importedSessionsDict._order;

    for(var i = 0; i < sessionsKeys.length; ++i) {
        let sessionId = sessionsKeys[i];
        let session = importedSessionsDict[sessionId];

        if(newSession._meta.name === session._meta.name)
            return true;
    }

    return false;
}


function initializeSessionModal(action, sessionId, data = {}) {
    let $modal = $("#session-modal");

    $modal.attr('action', action);
    $modal.attr('sessionId', sessionId);

    Object.keys(data).forEach((key) => {
        $modal.attr(key, data[key]);    
    });

    $modal.modal('show');
}


export {
    isSessionAlreadyImported,
    initializeSessionModal
}