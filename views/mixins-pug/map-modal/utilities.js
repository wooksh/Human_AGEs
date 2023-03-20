function getTableData(features, tableAttributesDict) {
	let data = [];
	for(let i = 0; i < features.length; ++i) {
		let featureProperties = features[i].get('properties');

		let row = {
			id: featureProperties.id,
			place: 'site' in featureProperties ? featureProperties.site : featureProperties.place,
			dating: featureProperties.dating,
			state: true
		};

		tableAttributesDict._order.forEach((attributeId) => {
			let attributeInfo = tableAttributesDict[attributeId];

			if(attributeInfo.isOptgroup !== true) { /* Prevent general category to be fetched */
				if(attributeInfo.type === 'admixture') {
					let legend = ArcheoSession.getAdmixtureLegend(attributeId);

					let names = legend._order;
					let colors = names.map(name => legend[name].color);

					row[attributeId] = {
						values: ArcheoUtilities.getFeaturesAttributeValue(featureProperties[attributeId]),
						names: names,
						colors: colors
					};
				}
				else
					row[attributeId] = ArcheoUtilities.getFeaturesAttributeValue(featureProperties[attributeId]);
			}
		});

		data.push(row);
	}

	return data;
}


function getAttributeHeaderHTML(attributeName) {
	return `<i class="material-icons table-filter-icon trigger">filter_list</i> <span class="attribute-name">${attributeName}</span> <i class="material-icons table-order-icon trigger"></i>`;
}


function getPlotlyTraceDict(features, attributeId) {
	let results = features.map((feature) => { 
		let props = feature.get('properties');

		return {
			id: props.id,
			label: props.population || 'MISSING',
			x: props[attributeId] ? props[attributeId].value[0] : null,
			y: props[attributeId] ? props[attributeId].value[1] : null
		}
	});
	results = results.filter(result => result.x !== null);

	return results;
}



function createDatasetTableToModal($modalContent, modalCount, datasetId, features, tableAttributesDict, tableParams = {}) {
	return new Promise((resolution, rejection) => {
		let newDatasetElement = $(`#features-dataset-template`).clone();
		/* Assign new dataset id */
		newDatasetElement.attr('id', `${datasetId}-features-${modalCount}`);
		newDatasetElement.attr('dataset-id', datasetId);
		newDatasetElement.find('.accordion-header').attr('data-target', `#${datasetId}-features-${modalCount}-accordion`);
		newDatasetElement.find('.collapse').attr('id', `${datasetId}-features-${modalCount}-accordion`);

		/* Initialize download button */
		let downloadButt = newDatasetElement.find('#file_download');
		downloadButt.attr('id', `${datasetId}-${modalCount}-features_file_download`);
		downloadButt.next().attr('for', `${datasetId}-${modalCount}-features_file_download`);
		
		downloadButt.on('click', function(event) {

		});

		let datasetInfo = ArcheoSession.get().datasets[ datasetId ];
		let databaseName = datasetInfo.databaseName;
		let entityName = datasetInfo.entityName;

		/* Initialize dataset name */
		let $header = newDatasetElement.find('.accordion-header .header-text');
		$header.html(datasetInfo.name);

		/* Initialize search */
		let $search = newDatasetElement.find('#features-dataset-search');
		$search.attr('id', `${datasetId}-${modalCount}-features-dataset-search`);

		/* Initialize table */
		let $table = newDatasetElement.find('.table');

		/* Prepare columns */
		let columns = [];
		let columnId = 0;

		tableAttributesDict._order.forEach((attributeId) => {
			let attributeInfo = tableAttributesDict[attributeId];

			let config = {
				field:  attributeId,
				title: getAttributeHeaderHTML(attributeInfo.name),
				searchable: true,
				sortable: true,
				switchable: true,
				visible: attributeInfo.visible
			}

			columnId = columns.length;
			if(attributeInfo.type === 'admixture') {
				config = {...config,
					searchable: false,
					title:  `<span class="attribute-name">${attributeInfo.name}</span> <i class="material-icons table-order-icon trigger"></i>`,
					formatter: (attributeData, row, rowIndex, field) => {
						if(attributeData.values === 'MISSING')
							return 'MISSING';
						else {
							let $piechart = $('<div/>', {
								class: "piechart",
								'row-index': rowIndex,
								field: field
							});

							return $piechart[0].outerHTML;
						}
					},
					sorter: (fieldA, fieldB, rowA, rowB) => {
						let fieldAIds = fieldA.values.argSortNumbers();
						let fieldBIds = fieldB.values.argSortNumbers();

						return fieldAIds.compNumbers(fieldBIds);
					}
 				}
			}

			columns.push(config);	
		});

		/* Prepare data */
		let data = getTableData(features, tableAttributesDict);

		$table.bootstrapTable({
			pagination: true,
			clickToSelect: true,
			pageList: [10, 25, 50, 100, 500],
			checkboxHeader: true,
			idField: "id",
			maintainMetaData: true,
			rowStyle: () => ({
				classes: 'table-row'
			}),
			
			columns: [{
				checkbox: true,
				field: 'state'
			},{
				field: 'id',
				sortable: true,
				title: 'ID',
				searchable: true,
				switchable: false,
				formatter: (value) => {
					if(ArcheoUtilities.isValid(datasetInfo.isCustom))
						return value;
					else
						return `<a href="/en/db/${encodeURIComponent(databaseName)}/entity/${encodeURIComponent(entityName)}/${encodeURIComponent(value)}">${value}</a>`
				}
			}, 
			{
				field: 'place',
				sortable: true,
				title: datasetInfo.isPresent == false ? 'Site' : 'Place',
				searchable: true,
				switchable: true,
				formatter: (value) => {
					return value.name
				}
			}, 
			{
				field: 'dating',
				sortable: true,
				searchable: false,
				switchable: true,
				title: getAttributeHeaderHTML('Dating'), // LANG
				formatter: (dating) => {
					if(ArcheoUtilities.isValid(dating)) {
						let yearStart = dating.year_start;
						let yearEnd = dating.year_end;

						return ArcheoUtilities.getFormattedYear(yearStart) + ' &mdash; ' + ArcheoUtilities.getFormattedYear(yearEnd);
					}
					else
						return "present"; // LANG						
				},
				sorter: (datingA, datingB) => {
					return parseInt(datingA.year_start) - parseInt(datingB.year_start) || parseInt(datingA.year_end) - parseInt(datingB.year_end);
				}
			},
			...columns],

			data: data
		});

		/* Move search element */
		let $toolbar = $table.parents('.bootstrap-table').find('.fixed-table-toolbar');
		$search.parent().parent().detach().appendTo($toolbar);

		/* Generate content for the columns toggle dropdown */
		//let toggleableAttributes = [ 'place', 'dating', ...Object.keys(tableAttributesDict)];
		let toggleableAttributes = tableAttributesDict._order;

		let $columnsDropdown = newDatasetElement.find('.column-toggle-dropdown .dropdown-menu');
		let $attributesTypes = {};
		for(var j = 0; j < toggleableAttributes.length; ++j) {
			let attributeId = toggleableAttributes[j];
			let attributeData = tableAttributesDict[ attributeId ];
			let isAttributeType = attributeData.isOptgroup;

			if(isAttributeType === true) {
				let $attributeType = $('#column-toggle-dropdown-attribute-type-template').clone();
				$attributeType.find('.attribute-type-wrapper').text(attributeData.name);
				$attributesTypes[attributeId] = $attributeType.find('.dropdown-menu');

				$attributeType.appendTo($columnsDropdown);
				$attributeType.removeClass('hidden');
				$attributeType.removeAttr('id');
			}
			else {
				let $attribute = $('#column-toggle-dropdown-attribute-template').clone();
				$attribute.find('label').text(attributeData.name);
				$attribute.attr('attribute-id', attributeId);
				$attribute.find('input[type=checkbox]').prop("checked", attributeData.visible);

				if(attributeData.parent) {
					$attribute.appendTo($attributesTypes[attributeData.parent]);
				} else {
					$attribute.appendTo($columnsDropdown);
				}

				$attribute.removeClass('hidden');
				$attribute.removeAttr('id');
			}
		}

		/* Handle loading missing data */
		function handleLoadMissingData(attributeId, checked) {
			return new Promise((resolution, rejection) => {
				if(checked === true) {
					let anyFeatureProperties = features[0].get('properties');
					let attributeValue = anyFeatureProperties[attributeId];
					let isAttributeAvailable = ArcheoUtilities.isValid( attributeValue );
					let isAttributeIncorportable = attributeId in tableAttributesDict;
	
					if(isAttributeIncorportable) {
						/* Hide column if the data is absent */
						if(isAttributeAvailable === false)
							$table.bootstrapTable('hideColumn', attributeId);
	
						ArcheoRequests.incorporateAttributes({
							datasetId: datasetId,
							attributeId: attributeId,
							attributeType: tableAttributesDict[attributeId] ? tableAttributesDict[attributeId].type : ''
						}).then(() => {
							// Load data again //
							let data = getTableData(features, tableAttributesDict);
							$table.bootstrapTable('load', data);
	
							resolution(true);
						});
					} else
						resolution(true);
				}
			});
		}

		$columnsDropdown.on('change', 'input[type=checkbox]', function(e) {
			let $checkbox = $(e.target);
			let status = $checkbox.is(":checked");
			let $wrapper = $checkbox.parent();
			let attributeName = $checkbox.siblings('label').text();
			let attributeId = $wrapper.attr('attribute-id');
			let attributeTypeName = tableAttributesDict[attributeId].type;

			if(status === true)
				handleLoadMissingData(attributeId, true).then(() => {
					if(attributeTypeName == 'pca' || attributeTypeName == 'umap') {
						let plotId = `${attributeId}_${parseInt(Math.random() * 10000)}`;
						let $tableWrapper = $table.parent();
						//let $samplesSection = $table.parents('.samples-section');

						let $plot = $('<div>', {
							id: plotId,
							class: `${attributeId} plot`, 
							//text: attributeId,
							"attribute-id": attributeId
						}).appendTo($tableWrapper);

						ArcheoRequests.incorporateAttributes({
							datasetId: datasetId,
							attributeId: 'population',
							attributeType: ''
						}).then(() => {
							/* Create plotly plot with all features data */
							let allDatasetFeatures = ArcheoMap.getDatasetFeatures(datasetId);
							let results = getPlotlyTraceDict(allDatasetFeatures, attributeId);
							ArcheoUI.createPlotly(plotId, results, attributeName, {opacity: 0.4, showLegend: false});

							/* Create plotly trace with highlit cluster's features */
							results = getPlotlyTraceDict(features, attributeId);

							ArcheoUI.addPlotlyTrace(plotId, results, {});
						});
					}
					else
						$table.bootstrapTable('showColumn', attributeId);
				});
			else {
				if(attributeTypeName == 'pca' || attributeTypeName == 'umap') {
					$table.find('.plot').remove();
				}
				else
					$table.bootstrapTable('hideColumn', attributeId);
			}
		});

		$table.on('mouseenter mouseout', '.table-row', function(event) {
			let rowId = parseInt( $(event.target).parent('.table-row').attr('data-index') );
			let featureData = $table.bootstrapTable('getData')[rowId];

			$table.find('.js-plotly-plot').each(function() {
				let plotId = $(this).attr('id');
				let attributeId = $(this).attr('attribute-id');

				if(ArcheoUtilities.isArray(featureData[attributeId]) && event.type === "mouseenter") {
					let featureTraceData = {
						id: featureData.id,
						x: featureData[attributeId][0],
						y: featureData[attributeId][1]
					}

					ArcheoUI.hoverPlotlyFeature(plotId, true, featureTraceData);
				}
				else {
					ArcheoUI.hoverPlotlyFeature(plotId, false);
				}
			});
		});

		/* Pass sort event on proper custom icon click */
		$table.on('click', '.table-order-icon', function(event) {
			let $el = $(event.target);
			if($el.hasClass('table-order-icon')) {
				$el.parent().removeClass('both');
				return true;
			} else
				return false;
		});

		/* Handle filtering */
		$table.on('click', '.table-filter-icon', function(event) {
			let $el = $(event.target);

			if($el.hasClass('active')) {
				$el.removeClass('active');
				$search.attr('placeholder', `Filter by attributes...`);
				$search.removeProp('attribute');
			} else {
				/* Clear styling for all filter icons */
				$table.find('.table-filter-icon').removeClass('active');
				$el.addClass('active');

				let $header = $el.parents('th[data-field]');
				let attributeId = $header.attr('data-field');
				let attributeName = $header.find('.attribute-name').text();

				$search.attr('placeholder', `Filter by ${attributeName}...`);
				$search.prop('attribute-id', attributeId);
			}

			return false;
		});

		/* Handle filter events */
		$search.on('input update', function(event) {
			let attributeId = $search.prop('attribute-id');
			let searchValue = $search.val()

			if( ArcheoUtilities.isValidNonEmptyString(searchValue) ) {
				if( ArcheoUtilities.isValid(attributeId) ) {
					$table.bootstrapTable('filterBy', {
						[attributeId]: searchValue
					},{
						filterAlgorithm: 'and'
					});
				} 
				else {
					$table.bootstrapTable('filterBy', {
						common: searchValue
					},{
						filterAlgorithm: (row, filters) => {
							let isFound = false;

							for(let key in row) {
								if(key !== 'state')
									isFound = row[key].startsWith(filters.common) || isFound
							}

							return isFound;
						}
					});
				}
			}
			else {
				$table.bootstrapTable('filterBy', {}, {filterAlgorithm: 'and'});
			}
		})

		/* Handle piecharts generation */
		$table.on('post-body.bs.table update', function (event, data) {
			$table.find('.piechart').each((index, el) => {

				let $canvas = $('<canvas/>', {
					width: 50,
					height: 50
				});

				$canvas[0].width = 50;
				$canvas[0].height = 50;

				$canvas.appendTo(el);

				let rowIndex = parseInt( el.getAttribute('row-index') );
				let field = el.getAttribute('field');

				let admixtureData = data[rowIndex][field];

				new Chart(
					$canvas[0],
					{
					  type: 'pie',
					  data: {
						labels: admixtureData.names,
						  datasets: [{
							//label: 'My First Dataset',
							data: admixtureData.values,
							backgroundColor: admixtureData.colors,
							hoverOffset: 0,
							borderWidth: 1,
							borderColor: '#000'
						  }]
					 	},
						options: {
							responsive: false,
							plugins: {
								legend: {
									display: false
								},
							},
							animation: {
								duration: 0
							}
						}
					}
				);
			});			
		});


		$table.bootstrapTable('load', data);

		$modalContent.append(newDatasetElement);
		newDatasetElement.removeClass('hidden');

		/* Trigger certain attributes as in params */
		if('visible' in tableParams) {
			tableParams.visible.forEach((attributeId) => {
				$table.trigger('column-switch.bs.table', [attributeId, true]);
			});
		}

		resolution(newDatasetElement);
	});
}


export {
    createDatasetTableToModal
}