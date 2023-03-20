import initializeMapEvents from './map/index.js';
import initializeUIEvents from './ui/index.js';


function initializePageEvents() {
    initializeMapEvents();
    initializeUIEvents();
}


export default initializePageEvents;