import { createQueryBuilder } from 'Views/mixins-pug/query-builder/script.js';


function initializeQueryBuilder() {
    $('#query-builder').on('selected-dataset-update', function(event, datasetInfo) {
        let $builderEl = $(event.target);

        if(ArcheoUtilities.isValid($builderEl.queryBuilder))
            $builderEl.queryBuilder('destroy');

        createQueryBuilder( $builderEl, lang, datasetInfo );
    });
}


export default initializeQueryBuilder;