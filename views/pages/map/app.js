// Connect Styles for Webpack to bundle them (for dynamicaly generated content) //
import './css/map-modals.scss';
import './css/sidebar.scss';
import './css/legend.scss';
import './css/style.scss';
import 'Views/mixins-pug/map-modal/style.scss';
//import 'ol/ol.css'; // rem

// Scripts //
/*
import { initializeSidebars } from "./js/sidebars.js";
import { initializeModals } from "./js/map-modals.js";
import { initializeInteractiveMap } from "./js/interactive-map/map.js";
import { initializeQueryFiltersButton } from './js/left-sidebar/query-filters-button.js';
import { initializeDatasetSelect } from './js/left-sidebar/select-dataset.js';
import { initializeQueryButton } from './js/left-sidebar/query-button';

import { initializeAppearanceDataset } from './js/right-sidebar/select-dataset';

import { initializeNewLayerButton } from './js/right-sidebar/new-layer-button';
import { initializeNewStrategyButton } from './js/right-sidebar/clustering';

import { initializeTimeFilter } from './js/right-sidebar/time-filter.js';
import { initializeTimeline } from './js/timeline.js'

import { initializeRightSidebarUIEvents } from './js/right-sidebar/events';

import { initializeAttributesEvents } from './js/interactive-map/events/attributes';
*/


// Elements //

// Events //
import initializePageEvents from './js/events/index.js';
import initializePageElements from './js/elements/index.js';

// Session //
import defaultLangSessions from './js/session/data/lang_defaults.js';
import {
	registerSessionFunctions
} from './js/session/index.js';

import {
	cacheInitialization,
	registerCacheFunctions
} from './js/cache/index.js';


// Events //
import broadcastRoutes from './js/events/broadcastRoutes.json';


// Register pug-Mixins //
import 'Views/mixins-pug/tooltip/style.scss';

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

import 'Views/mixins-pug/spectrum-color-input/style.scss';

import 'Views/mixins-pug/gradient-input/style.scss';

//import 'Views/mixins-pug/icon-checkbox/style.scss';
import 'Views/mixins-pug/textbox/style.scss';

import 'Views/mixins-pug/switch/style.scss';
import 'Views/mixins-pug/switch/script.js';

import 'Views/mixins-pug/timeline/style.scss';

import 'Views/mixins-pug/query-builder/style.scss';

/* Link .pug for assets injetion */
import './index.pug';

import registerMapUtilities from './utilities';


$(document).ready(function() {
	/*** Register MapUtilities ***/
	registerMapUtilities();

	/*** Initialize page session functions ***/
	registerSessionFunctions();

	window.sessionStorage.clear();

	/*** #0 -- Register events broadcast routes ***/
	ArcheoEvents.setRoutes( broadcastRoutes );	

	/*** Setup temporary cache entries ***/
	registerCacheFunctions();
	cacheInitialization();

	/*** #1 -- Set blank session ***/
	let defaultSession = defaultLangSessions[ getLang() ];
	ArcheoSession.set( defaultSession );

	//if( ! ArcheoUtilities.exists( document.documentElement.lang ) )
	//	document.documentElement.lang = 'en';

	/* Global getLang function */
	//window.getLang = () => { return document.documentElement.lang };

    /*** #2 -- Initialize elements ***/

	/*** Initialize static UI Elements  ***/
	initializePageElements();

	/*** Initialize static UI Events ***/
	initializePageEvents();

	/* Prepare guide to auto-launch */
	let shouldGuideLaunch = localStorage.getItem('mapGuideHide') != "true";
	if(shouldGuideLaunch && !ArcheoUtilities.isValidNonEmptyString(window.example)) {
		$("#guide-button").one('session-load', function(e) {
			$(e.target).trigger('click');
		});
	}

	let shouldHidePrompt = localStorage.getItem('mapGuidePromptHide') == "true";
	if(!shouldHidePrompt && !ArcheoUtilities.isValidNonEmptyString(window.example)) {
		$("#guide-prompt").removeClass('hidden');
	}

	

	/*** Initialize dynamically generated content ***/
	new Promise(async (resolution, rejection) => {
		$('#session-presets').selectpicker('val', window.example || 'default');
		resolution(true);
	})

	/* Initialize session options in the UI */
	//ArcheoEvents.broadcast('session-load');

	ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});
