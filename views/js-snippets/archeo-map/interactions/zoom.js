import {MouseWheelZoom} from 'ol/interaction';

import {platformModifierKeyOnly} from 'ol/events/condition';





function initializeMouseZoomInteraction() {
    const mouseZoom = new MouseWheelZoom({
        condition: platformModifierKeyOnly,
        handleEvent: (event) => {
            if (event.type === "wheel") {

            }

    
            return true;
        }
    })

    return mouseZoom;
}


export default initializeMouseZoomInteraction;