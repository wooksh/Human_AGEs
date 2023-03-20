import {initializeMetadata} from './new-session/initialize-session';


function updateSessionEvents() {
	$('html').on('update-session', '.session', function(event, data) {
		var $session = $(event.target);
		var sessionId = $session.attr('id');

		if(sessionId === data.sessionId) {
			initializeMetadata($session, data.sessionId, data.sessionInfo);
		}
	});
}


export default updateSessionEvents;