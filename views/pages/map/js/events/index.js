import initializeUIEvents from './ui/index.js';
import initializeMapEvents from './map/index.js';
import initializeGuideEvents from './guide.js';


function initializePageEvents() {
    initializeMapEvents();
    initializeUIEvents();
    initializeGuideEvents();
}


export default initializePageEvents;