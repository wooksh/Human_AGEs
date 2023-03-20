//import queryBuilder from 'jQuery-QueryBuilder/dist/js/query-builder';

// ol/Map
import 'jQuery-QueryBuilder/dist/css/query-builder.default.min.css';
//import 'jQuery-QueryBuilder/src/main';
//import 'jQuery-QueryBuilder/src';
import 'jQuery-QueryBuilder/dist/js/query-builder';
//registerBuilderModule($); // Initialize it global jQuery
import { initializeQueryBuilderEvents } from './events';

import customOperators from './data/customOperators.js';
import getCustomTemplates from './data/customTemplates.js';
import getDatasetFilters from './config/getDatasetFilters.js';

import getLangDict from './data/getLang';


function createQueryBuilder(builderEl, lang, datasetInfo) {
    /*
			datasetName: datasetName,
			datasetId: datasetId,
			entity: entity
    */
   
	const langDict = getLangDict()[lang];
	const datasetFilters = getDatasetFilters(langDict);

    builderEl.queryBuilder({
		plugins: {
			//'bt-tooltip-errors',
            //'bt-tooltip-errors': { delay: 10 },
            'bt-selectpicker': {
                liveSearch: true,
				liveSearchNormalize: true,
				style: 'btn-inverse btn-xs'
            }
            //'not-group',
            //'unique-filter',
            //'filter-description',
            //'sortable'
        },
        operators: [
			...customOperators,
			'equal', 'not_equal', 'contains', 'not_contains',
			'less', 'less_or_equal', 'in', 'not_in',
			'greater', 'greater_or_equal', 'begins_with', 'not_begins_with'
		],
        filters: datasetFilters[datasetInfo.datasetId],
        optgroups: {
            ...langDict.operator_optgroups,
            ...langDict.optgroups
		},
        //rules: rules,
        lang_code: lang,
        default_condition: 'AND',
        display_errors: true,
        allow_empty: false, 
        allow_groups: 4,
		select_placeholder: langDict.placeholders.select,
		lang: langDict,
		templates: getCustomTemplates()
	});

    builderEl.attr('entity', datasetInfo.entity);

    initializeQueryBuilderEvents(builderEl, lang);
}


export {
	createQueryBuilder
};


/*
$('#btn-reset').on('click', function() {
    queryBuilder('reset');
});

$('#btn-set').on('click', function() {
    queryBuilder('setRules', rules_widgets);
});

$('#btn-get').on('click', function() {
    var result = queryBuilder('getRules');
    if (!$.isEmptyObject(result)) {
    }
});
*/
  