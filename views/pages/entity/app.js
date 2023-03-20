// Styles //
import './css/style.scss';
import 'Views/mixins-pug/map-modal/style.scss';

//import 'ol/ol.css';
// Scripts //
import initializePageEvents from './js/events/index.js';
import initializePageElements from './js/elements/index.js';

// Session //
import defaultLangSessions from './js/session/data/lang_defaults.js';
import {
	registerSessionFunctions,
    initializeSessionState
} from './js/session/index.js';

// Register pug-Mixins //
import 'Views/mixins-pug/toggle-arrow/style.scss';
import 'Views/mixins-pug/toggle-arrow/script.js';
import 'Views/mixins-pug/accordion-header/style.scss';

import 'Views/mixins-pug/icon-text-list/style.scss';
import 'Views/mixins-pug/icon-text-list/script.js';

import 'Views/mixins-pug/icon-radiobuttons/style.scss';

import 'Views/mixins-pug/dropdown/style.scss';
import 'Views/mixins-pug/dropdown/script.js';

import 'Views/mixins-pug/custom-button/style.scss';

import 'Views/mixins-pug/years-range-spinner/style.scss';

//import 'Views/mixins-pug/icon-checkbox/style.scss';
import 'Views/mixins-pug/textbox/style.scss';

import registerAnalysisUtilities from 'Views/pages/plot/utilities.js';

/* Link .pug for assets injection */
import './index.pug';

import {
	cacheInitialization,
	registerCacheFunctions
} from './js/cache/index.js';

import {
    createDataset,
    createLayer,
    setLayerDataset,
    setLayerAttribute
} from './js/entity.js';

import broadcastRoutes from './js/events/broadcastRoutes.json';


/* 'entityData' is variable from router */
$(document).ready(function() {
    /* Initialize Analysis Utilities */
    registerAnalysisUtilities();

    /*** Initialize page session functions ***/
	registerSessionFunctions();

	window.sessionStorage.clear();

	/*** #0 -- Register events broadcast routes ***/
	ArcheoEvents.setRoutes( broadcastRoutes );	

	/*** Setup temporary cache entries ***/
	registerCacheFunctions();
	cacheInitialization();

	/*** #1 -- Set session ***/
    /*** Set default session ***/

	let defaultSession = defaultLangSessions[ getLang() ];
	ArcheoSession.set( defaultSession );

    /*** Fetch the entity ***/
    let datasetId = 'entity';
    window.datasetId = datasetId;
    ArcheoCache.setTemporaryEntry('entityDatasetId', datasetId);

    /*** #2 -- Initialize elements ***/
	/*** Initialize static UI Elements  ***/
	initializePageElements();

	/*** Initialize static UI Events ***/
	initializePageEvents();

    /*** Initialize map features ***/
    let features = [window.entityFeature];
    createDataset(datasetId,  features);
    let layerId = createLayer();
    window.layerId = layerId;

    setLayerDataset(layerId, datasetId);

    initializeSessionState(window.entityFeature);

    setLayerAttribute(layerId, {
        attributeId: 'id',
        attributeName: 'ID',
        attributeType: 'value'
    });

	/* Initialize session options in the UI */
	//ArcheoEvents.broadcast('session-load');

	ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});
