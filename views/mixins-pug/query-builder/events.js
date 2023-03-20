import getNormalizedQuery from './query-normalization.js';
import { createQueryBuilder } from './script.js';


function initializeResultsInputEvent($builderEl, lang) {
	$builderEl.on('afterCreateRuleInput.queryBuilder', function(e, rule) {
		let $preoperatorContainer = rule.$el.find('.rule-preoperator-container');
		let $resultContainer = rule.$el.find('.rule-value-container');

		if(rule.filter.id.startsWith('result_') && ! rule.filter.id.endsWith('relationship')) {
			let $componentSelect = $resultContainer.find('select.component-name');
			let $typeSelect = $resultContainer.find('select.result-type');

			$typeSelect.empty();

			if(rule.filter.id === 'result_admixture_component') {
				window.metadata.Admixture.id.forEach((el, i) => {
					let $option = $('<option/>', {value: `${ 'result_' + el.toLowerCase() }`});
					$option.text(window.metadata.Admixture.name[i])

					$typeSelect.append($option);
				});

				$typeSelect.on('changed.bs.select', (event) => {
					let admixtureTypeId = $typeSelect.val();
					$componentSelect.empty();

					if( ArcheoUtilities.isValidNonEmptyString(admixtureTypeId) ) {
						let componentsCount = parseInt(admixtureTypeId.split('_').getLast().split('k')[1])

						for(let i = 1; i <= componentsCount; ++i) {
							let $option = $('<option/>', {value: 'c' + i});
							$option.text('component #' + i)

							$componentSelect.append($option);
						}

						$componentSelect.selectpicker('refresh');
					}
				});
			}
			else if(rule.filter.id === 'result_pca_component') {
				window.metadata.PCA.id.forEach((el, i) => {
					let $option = $('<option/>', {value: `${ 'result_' + el.toLowerCase() }`});
					$option.text(window.metadata.PCA.name[i])

					$typeSelect.append($option);
				});
			}
			else if(rule.filter.id === 'result_umap_component') {
				window.metadata.UMAP.id.forEach((el, i) => {
					let $option = $('<option/>', {value: `${ 'result_' + el.toLowerCase() }`});
					$option.text(window.metadata.UMAP.name[i])

					$typeSelect.append($option);
				});
			}

			/* Initialize components select */
			$typeSelect.selectpicker('refresh');
			$componentSelect.selectpicker('refresh');
			$typeSelect.trigger('changed.bs.select');
		}
	});
}


function disableTitleTooltipsForSelects($builderEl, lang) {
	$builderEl.on('afterUpdateRuleFilter.queryBuilder', function(e, rule) {
		let $dropdownButt = rule.$el.find('.dropdown-toggle');
		$dropdownButt.tooltip();
		$dropdownButt.tooltip('disable');
	});
}


function initializeTooltips($builderEl, lang) {
	$builderEl.on('afterUpdateRuleFilter.queryBuilder', function(e, rule) {
		let tooltipEl = rule.$el.find('.archeo-tooltip').get(0);
		let $tooltip = $(rule.$el.find('.archeo-tooltip'));

		if(ArcheoUtilities.isValid(rule.filter)) {
			if(!tooltipEl._tippy) {
				tippy(tooltipEl, {
					placement: 'top-end',
					content: rule.filter.tooltip,
					interactive: true
				});
			}
			else {
				tooltipEl._tippy.setContent(rule.filter.tooltip);
			}

			$tooltip.removeClass('hidden');
		}
		else {
			$tooltip.addClass('hidden');
		}
	});
}


function createInitializeSearchableEvent($builderEl, lang) {
	$builderEl.on('afterCreateRuleInput.queryBuilder', function(e, rule) {
		// never display error for my custom filter

		let inputEl = rule.$el.find('.rule-value-container input.searcher');
		let filterEl = rule.$el.find('.rule-filter-container > .dropdown > select option:selected');

		let entityName = filterEl.attr('entity-name');
		
		let valueAttribute = filterEl.attr('value-attribute');
		let queryAttribute = filterEl.attr('label-attribute');
		let detailsAttribute = filterEl.attr('details-attribute');
		
		let isSearchable = ArcheoUtilities.exists( filterEl.attr('searchable') );

		//dropdownObj.selectpicker('render');
		
		if(isSearchable) {
			ArcheoSearcher.initialize(
				inputEl, entityName, valueAttribute, queryAttribute, detailsAttribute, lang, 
				function( event, ui ) {			
					inputEl.attr( 'searched-label', ui.item.label );
					inputEl.attr( 'searched-value', ui.item.value );
				},
				function( event, ui ) {
					let queryAttributeValue = inputEl.attr('searched-label');
					let label = ArcheoUtilities.isStringUndefined(queryAttributeValue) ? '' : queryAttributeValue;
		
					inputEl.val( label );
				}
				);
		}

		/* Render custom selects */
		rule.$el.find('.rule-value-container select').selectpicker('render');
	});
}


function createRulesTranslationEvent($builderEl, lang) {
	$builderEl.queryBuilder.extend({
		getGraphQL: function() {
			var rules = this.getRules();

			let $datasetSelect = $('#select-query-dataset :selected');

			let queryTemplate = {
				'database': $datasetSelect.attr('database'),
				'objects': $datasetSelect.attr('entity').toLowerCase(),
				'filters': getNormalizedQuery(rules),
				'lang': document.documentElement.lang
			};

			return queryTemplate;
			//return rules;
		}
	});
}

// 


function hookEventsForUIElements($builderEl, lang) {
	$builderEl.on('afterCreateRuleInput.queryBuilder', function(e, rule) {
		if (rule.filter.plugin == 'selectpicker') {
			rule.$el.find('.rule-value-container').find('.bootstrap-select').removeClass('form-control');
		}

		if(
			rule.filter.queryAttribute === 'time_period' || 
			rule.filter.queryAttribute === "date"
			) {
			if(rule.operator.type === 'between' ||  rule.operator.type === 'inrange') {
				let session = ArcheoSession.get();
				let timelineMinMax = [session.filters.timeline.minYear, session.filters.timeline.maxYear];

				ArcheoUI.initializeRangeSpinner(rule.$el, timelineMinMax, true, lang);
			}
			else {
				ArcheoUI.initializeYearInput(rule.$el, true, true, lang)
			}
		}
		else if( rule.filter.queryAttribute === 'age') {
			if(rule.operator.type === 'between' ||  rule.operator.type === 'inrange') {
				let minMax = [0, 125];

				ArcheoUI.initializeRangeSpinner(rule.$el, minMax, true, lang);
			}
			else {
				ArcheoUI.initializeYearInput(rule.$el, true, true, lang)
			}

			/*rule.$el.spinner({
				culture: window.getLang(),
				min: 0,
				max: 125,
				numberFormat: "n",
				step: 1
			});*/
		}
		else if(rule.filter.queryAttribute === 'component') {
			let minMax = rule.filter.tags.has("proportion") ? [0,1] : [-100,100];
			ArcheoUI.initializeRangeSpinner(rule.$el, minMax, true, lang);
		}
	});
}


function removeUnnecessaryDividers($builderEl, lang) {
	$builderEl.on('afterInit.queryBuilder', function(e) {
		/* Change 'add' buttons appearance */
		var $buttonAdd = $builderEl.find('.btn-success');
		$buttonAdd.removeClass(['btn-success', 'btn-xs']);
		$buttonAdd.addClass(['custom-button', 'palette-tertiary-light', 'no-focus', 'positive', 'mb-0']);

		var filters = $(e.target)[0].queryBuilder.settings.filters.filter(function(el, i, a) { return el.depth > 0 });
		var optgroups = filters.map(function(filter) { return filter.optgroup });

		var optgroupsDic = $(e.target)[0].queryBuilder.settings.optgroups;

		$(e.target).on('shown.bs.select', '.bootstrap-select > select', function() {
			optgroups.forEach(function(optgroup) {
				let label = optgroupsDic[ optgroup ][ lang ];
				$(`.bootstrap-select .dropdown-header > span:contains('${label}')`).parent().prev('.dropdown-divider').css("display", "none");
			});
		});

	});
}


function initializeQueryBuilderEvents($builderEl, lang) {
	hookEventsForUIElements($builderEl, lang);
	createInitializeSearchableEvent($builderEl, lang);
	createRulesTranslationEvent($builderEl, lang);
	removeUnnecessaryDividers($builderEl, lang);
	initializeResultsInputEvent($builderEl, lang);
	initializeTooltips($builderEl, lang);
	disableTitleTooltipsForSelects($builderEl, lang);
}




export { 
	initializeQueryBuilderEvents
};