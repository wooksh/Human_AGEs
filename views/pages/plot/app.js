/*import 'Views/mixins-pug/toggle-arrow/script.js';
import 'Views/mixins-pug/icon-text-list/script.js';
import 'Views/mixins-pug/dropdown/script.js';
import 'Views/mixins-pug/switch/script.js';*/

// Styles //
import 'Views/mixins-pug/dropdown/style.scss';
import './css/style.scss';
// Scripts //
import 'Views/mixins-pug/dropdown/script.js';


import initializePageEvents from './js/events/index.js';
import initializePageElements from './js/elements/index.js';
import registerAnalysisUtilities from './utilities';

import defaultLangSessions from './js/session/data/lang_defaults.js';
import {
  registerSessionFunctions,
  //initializeSessionState
} from "Views/pages/plot/js/session/index.js"

/* Link .pug for assets injetion */
import './index.pug';


$( document ).ready(function() { 
  /*** Register plot Utilities  ***/
  registerAnalysisUtilities();

  /*** Initialize page session functions ***/
	registerSessionFunctions();

  /* Setup cache */
  ArcheoCache.setTemporaryEntry('resultsCache', {});

  /* Initialize session */
  let defaultSession = defaultLangSessions[ getLang() ];
	ArcheoSession.set( defaultSession );

  /*** Initialize static UI Elements  ***/
  initializePageElements();

	/*** Initialize static UI Events ***/
	initializePageEvents();

  AnalysisUtilities.queryAndDisplayResults('plot-pca', ...AnalysisUtilities.getSelectedResultsInfo());

  ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});