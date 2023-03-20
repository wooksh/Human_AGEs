import initializeTimeFilter from './time-filter.js';
import initializeLayersContainer from './layers-container.js';
import initializeClusteringStrategy from './clustering.js';
import initializeRegionFilter from './region-filter.js';
import initializeAttributeFilter from './attribute-filter.js';
import initializeAttributeClustering from './attribute-clustering.js';



function initializeRightSidebarElements() {
    initializeTimeFilter();
    initializeLayersContainer();
    initializeClusteringStrategy();
    initializeAttributeFilter();
    initializeAttributeClustering();
    initializeRegionFilter();
}


export default initializeRightSidebarElements;