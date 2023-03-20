import initializeInteractiveMap from './map.js';
import {initializeTimeline, initializeTimelineRange} from './timeline.js';
import initializeSidebars from './sidebars.js';
import initializePresentSwitch from './present-switch.js';

import initializeRightSidebarElements from './right-sidebar/index.js';
import initializeLeftSidebarElements from './left-sidebar/index.js';

import initializeModals from './modal.js';

import initializeMapLegend from './legend.js';

import {initializeGuide} from './guide.js';

import initializeTooltips from './tooltips.js';

import initializeToolboxElements from './toolbox.js';


function initializePageElements() {
    new Promise((resolution, rejection) => {
        initializeInteractiveMap();

        initializeMapLegend();
    
        initializeTimeline('#timeline');
        initializeTimelineRange('#timeline-range');
    
        initializeSidebars();
    
        initializePresentSwitch();
    
        initializeLeftSidebarElements();
     
        initializeRightSidebarElements();
    
        ArcheoUI.initializeYearTexts();
    
        initializeModals();

        initializeGuide();

        initializeTooltips();

        initializeToolboxElements();
        
        resolution(true);
    });
}


export default initializePageElements;