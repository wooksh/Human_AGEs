import { questionsSearchEvent } from './search.js';


function initializeObjectAndEvents() {
    $(document).ready(function() {
        /* Initialize objects */

        /* Initialize events */
        questionsSearchEvent();
});
}


export default initializeObjectAndEvents;
