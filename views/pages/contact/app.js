// It must be imported before google maps from CDN loads up in a template
//import './js/googlemaps.js'; // Zastąp to OLem
// Styles //
import './css/style.scss';
// Scripts //
// import './js/index.js';

/* Link .pug for assets injetion */
import './index.pug'



$(document).ready(function() {
    ArcheoUtilities.setContentLoaded('#loading-page-wrapper', 'body');
});