import sessionPresetsEvents from './load-presets.js';
import sessionManagementEvents from './management.js';
import updateSessionEvents from './update-sessions.js';
import sessionModalEvents from './session-modal.js';


function initializeSessionsEvents() {
    sessionPresetsEvents();
    sessionManagementEvents();
    updateSessionEvents();
    sessionModalEvents();
}


export default initializeSessionsEvents;