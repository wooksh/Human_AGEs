// Styles //
import './css/style.scss';
import 'Views/mixins-pug/custom-button/style.scss';
// Scripts //
import './js/index.js';
import './js/masonrySetup.js';
import initializeStepsEvents from './js/step.js';

/* Link .pug for assets injetion */
import './index.pug'


$(document).ready(function() {
    if( ArcheoUtilities.isValidNonEmptyString(exampleId) ) {
        $(`#${exampleId}`).trigger('click');
    }

    ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');

    initializeStepsEvents();
});