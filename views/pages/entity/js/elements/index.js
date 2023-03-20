import initializeMapElements from './map.js';
import initializeResultsElements from './results.js';
//import initializeMapLegend from './legend.js';


function initializePageElements() {
    initializeMapElements();

    ArcheoUI.initializeYearTexts();

    initializeResultsElements();
}


export default initializePageElements;