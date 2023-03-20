
export default function()  {
	var dict = {
		"en": {
			"tooltips": {
				"remains_id": "Identifier of remains of the ancient person",
				"past_population_name": "Name of the population to which the ancient person belonged",
				"genetical_sex_relationship": "A flag indicating whether a genetical sex of the ancient person has been determined",
				"genetical_sex_name": "Name of the sex of the ancient person",
				"haplogroup_y_relationship": "A flag indicating whether a Y chromosome haplogroup of the ancient person has been determined",
				"haplogroup_y_name": "Name of the Y chromosome haplogroup of the ancient person",
				"haplogroup_mt_relationship": "A flag indicating whether a mitochondrial chromosome haplogroup of the ancient person has been determined",
				"haplogroup_mt_name": "Name of the mitochondrial chromosome haplogroup of the ancient person",
				"dating_time_period": "Dating of the ancient person's remains",
				"dating_time_period_length": "Dating span length of the ancient person's remains",
				"dating_type_name": "Method used to determine the remains' dating",
				"dating_culture_relationship": "A flag indicating whether the remains' dating overlaps with any archeological culture duration period",
				"dating_culture_name": "Name of an archeological culture, which duration period overlaps with the remains' dating",
				"use_phase_function_name": "Name of a function of the settlement phase, where and when the ancient person lived",
				"usephase_year": "Dating of the settlement phase, where and when the ancient person lived",
				"use_phase_period_length": "Dating span length of the settlement phase, where and when the ancient person lived",
				"use_phase_culture_relationship": "A flag indicating whether the dating of the settlement phase, where and when the ancient person lived, overlaps with any archeological culture duration period",
				"use_phase_from_culture_name": "Name of an archeological culture, which duration period overlaps with the settlement phase, where and when the ancient person lived",
				"use_phase_part_of_culture_relationship": "A flag indicating whether the settlement phase, where and when the ancient person lived, is archeologically determined to be a part of any known culture",
				"use_phase_part_of_culture_name": "Name of an archeological culture, which lasted during the settlement phase period, where and when the ancient person lived",
				"use_phase_part_of_period_relationship": "A flag indicating whether the settlement phase, where and when the ancient person lived, is archeologically determined to be a part of any archeological period",
				"use_phase_part_of_period_name": "Name of an archeological period, which lasted during the settlement phase period, where and when the ancient person lived",
				"archaeological_site_name": "Name of an archeological site where ancient person was burried or died",
				"archaeological_site_coordinates": "Spatial coordinates of an archeological site where ancient person was burried or died",
				"political_region_name": "Name of a contemporary political region, which overlaps or does not overlap with archeological site's position",
				"geographical_region_name": "Name of a contemporary political region, which overlaps or does not overlap with archeological site's position",
				"cultural_region_relationship": "A flag indicating whether the position of the archeological site overlaps with any known archeological culture region",
				"cultural_region_name": "Name of a region of an archeological culture, which overlaps or does not overlap with archeological site's position",
				"sample_id": "Identifier of a sample taken from the ancient person remains",				
				"result_admixture_relationship": "",
				"result_admixture_component": "",
				"result_umap_relationship": "",
				"result_umap_component": "",
				"result_pca_relationship": "",
				"result_pca_component": "",
				"source_name": "Name of a source in which information about the sample was officaly published",
				"source_date": "Publication date of a source in which information about the sample was officaly published",
				"source_author_name": "Name of a co-author of the data source or publication",
				"person_id": "Identifier of the contemporary person",
				"present_population_name": "Name of the population to which the contemporary person belong",
				"place_name": "Name of a sampling place where contemporary person live"
			},
			"optgroups": {
				"person": "Person",
				"remains": "Remains",
				"genetical_sex": "Genetical sex",
				"use_phase_part_of_period": "Archeological period",
				"archaeological_site": "Archeological site",
				"place": "Place of sampling",
				"use_phase": "Settlement phase",
				"sample": "Sample",
				"haplogroup_mt": "Haplogroup Mt",
				"haplogroup_y": "Haplogroup Y",
				"political_region": "Political region",
				"geographical_region": "Geographical region",
				"cultural_region": "Archeological culture region",
				"dating": "Dating",
				"dating_type": "Dating type",
				"source": "Source",
				"source_author": "Author",
				"dating_culture": "Archeological culture",
				"use_phase_from_culture": "Archeological culture",
				"use_phase_part_of_culture": "Archeological culture",
				
				"result_admixture": "Admixture results",
				"result_admixture_type": "Admixture analysis type",
				"result_pca": "PCA results",
				"result_pca_type": "PCA analysis type",
				"result_umap": "UMAP results",
				"result_umap_type": "UMAP analysis type",

				"present_population": "Population",
				"past_population": "Population"
			},
			"operators": {
				"inrange": "is in range of",
				"part_of": "is part of",
				"not_part_of": "is not part of",
				"distance__less": "distance to point is less than",
				"distance__less_or_equal": "distance to point is less or equal to",
				"distance__greater": "distance to point is greater than",
				"distance__greater_or_equal": "distance to point is greater or equal to",
				"timepoint__less": "is less than",
				"timepoint__less_or_equal": "is less or equal than", 
				"timepoint__greater": "is greater than",
				"timepoint__greater_or_equal": "is greater or equal than", 
				"timepoint__equal": "is equal to",
				"timepoint__not_equal": "is not equal to",
				"boolean_does": "does"
			},
			"operator_optgroups": {
				"date_interval": "Time period",
				"date_timepoint": "Time point"
			},
			"values": {
				"boolean": ["true", "false"],
				"relation_operator": [
					{ "value": "some", "label": "some" },
					{ "value": "none", "label": "none" },
					{ "value": "every", "label": "every" }
				],
				"relation_existence": [
					{ "value": true, "label": "exist" },
					{ "value": false, "label": "not exist" }
				]
			},
			"errors": {
				"min_max_length_exceeds": "Length of inputed value exceeds permitable length of {0} to {1} characters.",
				"min_max_number_order": "Second value should be greater than the first one",
				"min_max_number_exceeds": "Inputted value exceeds permitable value range of {0} to {1}.",
				"coordinates_empty": "All values must be provided",
				"coordinates_lat": "Latitude should have value between -90 and 90",
				"coordinates_long": "Longitude should have value between -180 and 180",
				"coordinates_dist": "Distance must be defined in range 0-1000000",
				"tree_not_selected": "You must select an item from the search results"
			},
			"attributes": {
				"date": "Time period",
				"period_length": "Period length",
				"name": "Name",
				"id": "ID",
				"age": "Age",
				"type": "Type",
				"coordinates": "Coordinates",
				"function": "Function",
				"level": "Level",
				"source_name": "Title",
				"source_author": "Author",
				"source_date": "Publication date",
				"component": "Component"
			},
			"placeholders": {
				"select": "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;--- choose a filter ---&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;",
				"search": "Search for an attribute...",
				"default": "Type in attribute value..."
			},
			"others": {
				"relation_exists": "does <span class='badge badge-secondary'>relationship</span> exist?"
			},
			"relations": {
				"from": "FROM",
				"from_time": "FROM TIME",
				"has": "HAS",
				"in": "IN",
				"is": "IS",
				"of": "OF",
				"part_of": "PART OF",
				"published_in": "PUBLISHED IN"
			}
		},
		"pl": {
			"optgroups": {
				"person": "Osoba",
				"remains": "Szczątki",
				"genetical_sex": "Płeć genetyczna",
				"use_phase_part_of_period": "Epoka archeologiczna",
				"archaeological_site": "Stanowisko archeologiczne",
				"place": "Miejsce próbkowania",
				"use_phase": "Faza użytkowania",
				"sample": "Próbka",
				"haplogroup_mt": "Haplogrupa Mt",
				"haplogroup_y": "Haplogrupa Y",
				"political_region": "Region polityczny",
				"geographical_region": "Region geograficzny",
				"cultural_region": "Region kultury archeologicznej",
				"dating": "Datowanie",
				"source": "Źródło",
				"source_author": "Autor",
				"dating_type": "Metoda datowania",
				"dating_culture": "Kultura archeologiczna",
				"use_phase_from_culture": "Kultura archeologiczna",
				"use_phase_part_of_culture": "Kultura archeologiczna",
				"result_admixture": "Wyniki analizy admiksji",
				"present_population": "Populacja",
				"past_population": "Populacja"
			},
			"operator_optgroups": {
				"date_interval": "Przedział czasu",
				"date_timepoint": "Punkt czasowy"
			},
			"operators": {
				"inrange": "jest w zasięgu",
				"part_of": "należy do",
				"not_part_of": "nie należy do",
				"distance__less": "distance to point is less than",
				"distance__less_or_equal": "distance to point is less or equal to",
				"distance__greater": "distance from point is greater than",
				"distance__greater_or_equal": "distance from point is greater or equal to",
				"boolean_does": ""
			},
			"values": {
				"boolean": ["prawda", "fałsz"],
				"some": "co najmniej jeden",
				"none": "żaden",
				"every": "każdy",
				"exist": "istnieje",
				"not_exist": "nie istnieje"
			},
			"errors": {
				"min_max_length_exceeds": "Length of inputted value exceeds permitable length of {0} to {1} characters.",
				"min_max_number_order": "Second value should be greater than the first one",
				"min_max_number_exceeds": "Inputted value exceeds permitable value range of {0} to {1}.",
				"coordinates_lat": "Latitude should have value between -90 and 90",
				"coordinates_long": "Longitude should have value between -180 and 180",
				"coordinates_dist": "Distance must be defined in range 0-1000000",
				"tree_not_selected": "You must select an item from the search results"
			},
			"placeholders": {
				"select": "--- nie wybrano ---",
				"search": "Szukaj atrybutu {0}...",
				"default": "Podaj wartość atrybutu {0}..."
			},
			"attributes": {
				"dating": "Przedział czasu",
				"period_length": "Szerokość przedziału",
				"name": "Nazwa",
				"id": "ID",
				"age": "Wiek",
				"division": "Jednostka administracyjna",
				"type": "Rodzaj",
				"coordinates": "Współrzędne",
				"function": "Funkcja",
				"level": "Poziom",
				"source_name": "Tytuł",
				"source_author": "Autor",
				"source_date": "Data publikacji",
				"component": "Składowa"
			},
			"others": {
				"relation_exists": "<span class='badge badge-secondary'>relacja</span>"
			},
			"relations": {
				"from": "JEST Z",
				"from_time": "POCHODZI Z",
				"has": "MA",
				"in": "W",
				"is": "JEST",
				"of": "Z",
				"part_of": "JEST CZĘŚCIĄ",
				"published_in": "OPUBLIKOWANY W"
			}
		}
	};

	/* For all languages ... */
	for(var lang in dict) {
		var suffix = "<span class='badge badge-primary'>attribute</span>&nbsp;";
		var prefix = "";
	
		/* Apply attributes badges */
		ArcheoUtilities.traverseObj(
			dict[lang].attributes, 
			(obj, key, val) => { obj[key] = typeof(val) === 'string' ? suffix + val + prefix : val; }
			);

		suffix = "<span class='badge badge-success'>entity</span>&nbsp;";
		prefix = "";

		/* Apply optgroups badges */
		/*ArcheoUtilities.traverseObj(
			dict[lang].optgroups, 
			(obj, key, val) => { obj[key] = typeof(val) === 'string' ? suffix + val + prefix : val; }
			);*/
	}




	return dict;
}