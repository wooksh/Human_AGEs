// Styles //
import './css/style.scss';
import 'Views/mixins-pug/textbox/style.scss';
import 'Views/mixins-pug/accordion-header/style.scss';
import 'Views/mixins-pug/toggle-arrow/style.scss';
import 'Views/mixins-pug/custom-button/style.scss';

// Scripts //
import initializeObjectAndEvents from './js/index.js';
import 'Views/mixins-pug/toggle-arrow/script.js';

/* Link .pug for assets injetion */
import './index.pug'


$(document).ready(function() {
    if( ArcheoUtilities.isValidNonEmptyString(questionId) ) {
        $(`#${questionId} .collapsable`).trigger('click');
    }

    /* Initialize objects and events */
    initializeObjectAndEvents();

    ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});