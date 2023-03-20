import initializeRightSidebarUIEvents from './right-sidebar/index.js';
import initializeLeftSidebarUIEvents from './left-sidebar/index.js';

import submitQueryBuilderFiltersEvent from './query-builder-submit.js';
import initializeSidebardsHandlesEvents from './sidebars-handles.js';

import initializeMapLegendEvents from './legend.js';

import initializeDownloadButtonEvents from './download-button.js';


function initializeUIEvents() {
    initializeLeftSidebarUIEvents();
    initializeRightSidebarUIEvents();

    submitQueryBuilderFiltersEvent();
    initializeSidebardsHandlesEvents();

    initializeMapLegendEvents();

    initializeDownloadButtonEvents();
}


export default initializeUIEvents;