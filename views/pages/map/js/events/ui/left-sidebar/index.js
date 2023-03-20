import initializeDatasetSelectEvents from './datasets-select.js';
import initializeQueryFiltersButtonEvents from './filters-button.js';
import initializeDatasetEvents from './datasets/update-layers.js';

import initializeQueryButtonEvents from './datasets/new-dataset/new-dataset.js';

import initializeSessionsEvents from './sessions/index.js';
import initializeUserInputEvents from './user-data/index.js';


function initializeLeftSidebarUIEvents() {
	/* Datasets */
	initializeDatasetEvents();

	/* Other */
	initializeDatasetSelectEvents();
	initializeQueryFiltersButtonEvents();

	initializeQueryButtonEvents();

	initializeSessionsEvents();
	initializeUserInputEvents();
}


export default initializeLeftSidebarUIEvents;