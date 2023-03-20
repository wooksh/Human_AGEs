import initalizeMapOptionsEvents from './map-options.js';
import initializeSourceEvents from './source';
import initializeResultsEvents from './results';
import initializeDownloadEvents from './download';
import initializeRegionEvents from './regions.js';


function initializeUIEvents() {
    initalizeMapOptionsEvents();
    initializeSourceEvents();
    initializeResultsEvents();
    initializeDownloadEvents();
    initializeRegionEvents();
}


export default initializeUIEvents;