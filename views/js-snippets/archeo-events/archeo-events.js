function setRoutes(broadcastRoutes) {
    window.broadcastRoutes = broadcastRoutes;
}


function getRoutes() {
    return window.broadcastRoutes;
}


/**
{
	event: <name>,
	$: <selector>
}
**/
function broadcast(events, casterSelector = null, data = {}, duration = null) {
	return new Promise((resolution, rejection) => {
		if(! ArcheoUtilities.isArray(events))
			events = [events];

		events.forEach(function(event){
			let routes = getRoutes();
			if(event in routes) {
				routes[event].forEach((selector) => {
					if( ! $(selector).is($(casterSelector)) )
						if( ArcheoUtilities.isValid(duration) )
							ArcheoUtilities.delayedTrigger(duration, selector, event, data).then((result) => {
								resolution(true);
							});
						else
							$(selector).trigger(event, data);
				});
			}
		});
	});
}


export {
    broadcast,
    setRoutes,
    getRoutes
}