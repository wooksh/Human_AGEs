import {
    getSessionEntry,
    setSessionEntry,
    getLocalEntry,
    setLocalEntry,
	getTemporaryEntry,
    setTemporaryEntry,
    incrementTemporaryEntry
} from './utilities.js';

/*
Three levels of cache:

1. Temporal - not saved opon closing tab
2. Session - save until closing browser window
3. Local - save on the disk
*/


function loadSession(sessionDict = null) {
    let cloned = ArcheoUtilities.deepCloneObject( sessionDict );
    let currentSession = ArcheoSession.get();

    if( ArcheoUtilities.isValid(currentSession) ) {
        cloned = ArcheoUtilities.deepExtend(currentSession, cloned);
    }

    ArcheoSession.set(cloned);
}


function saveSession() {
    let session = ArcheoSession.get();
    let scope = Object.keys( session );
    
    scope.forEach((key) => {
        setSessionEntry(`session_${key}`, session[key], type = null)
    });
}


export {
    getSessionEntry,
    setSessionEntry,
    getLocalEntry,
    setLocalEntry,
	getTemporaryEntry,
    setTemporaryEntry,
    incrementTemporaryEntry,

	loadSession,
	saveSession	
};