import initializeClusteringStrategyEvents from './clustering/features/clustering.js';
import initializeAttributeClusteringEvents from './clustering/attribute/index.js';

import distanceSliderRangeEvents from './clustering/features/distance-slider';

import initializeLayerColorChangeEvents from './layers/color.js';
import initializeNewLayerButtonEvents from './layers/new-layer/new-layer.js';
import initializeTimelineEvents from './filters/time/index.js';
import initializeAttributeFilterEvents from './filters/attribute/index.js';
import initializeRegionFilterEvents from './filters/region/index.js';

 
function initializeRightSidebarUIEvents() {
    initializeTimelineEvents();
	initializeClusteringStrategyEvents();
    initializeAttributeClusteringEvents();
    distanceSliderRangeEvents();
    initializeLayerColorChangeEvents();
    initializeNewLayerButtonEvents();
    initializeAttributeFilterEvents();
    initializeRegionFilterEvents();
}


export default initializeRightSidebarUIEvents;