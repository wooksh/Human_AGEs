// Styles //
import './css/style.scss'
// Scripts //
import './js/index.js';
//import './js/turn.min.js'

/* Link .pug for assets injetion */
import './index.pug'


$(document).ready( function () {
    //ArcheoUtilities.setContentLoaded('#loading-page-wrapper', body);

    ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});