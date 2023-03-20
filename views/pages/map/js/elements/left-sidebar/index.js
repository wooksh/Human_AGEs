import initializeDatasetsContainer from './datasets-container.js';
import initializeSessionsContainer from './sessions-container.js';
import initializeQueryBuilder from './query-builder.js';


function initializeLeftSidebarElements() {
    initializeSessionsContainer();
    initializeQueryBuilder();
    initializeDatasetsContainer();
}


export default initializeLeftSidebarElements;