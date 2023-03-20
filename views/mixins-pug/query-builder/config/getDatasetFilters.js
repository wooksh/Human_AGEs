import getAttributesTemplates from './getAttributesTemplates.js';
import getValidators from './getValidators.js';
import getCustomInputs from './getCustomInputs.js';

import operatorsSets from '../data/operatorsSets.json';

export default function(langDict) {
	const validators = getValidators(langDict);
	const customInputs = getCustomInputs(langDict);
	const attributesTemplates = getAttributesTemplates(langDict, validators, customInputs);

	var currentYear = new Date().getFullYear();

	return {
		'RemainsAADR': [
			//'remains': [
			{
				...attributesTemplates.text_id,
				optgroup: 'remains',
				field: 'remains',
				id: 'remains_id',
				root: true,
				depth: 0,
				tags: ['searchable'],
				input: customInputs.search,
				tooltip: langDict.tooltips.remains_id
			},
			/*
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_y_name
			*/
			/* description */
			//],
			//'population' 
			{
				...attributesTemplates.text_name,
				optgroup: 'past_population',
				field: 'past_population',
				id: 'past_population_name',
				depth: 1,
				relation: langDict.relations.part_of,
				relation_previous: langDict.optgroups.remains,
				tags: ['searchable'],
				input: customInputs.search,
				tooltip: langDict.tooltips.past_population_name
			},
			//'genetical_sex': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_relationship',
				depth: 1,
				relation: langDict.relations.is,
				relation_previous: langDict.optgroups.remains,
				tooltip: langDict.tooltips.genetical_sex_relationship
			},
			{
				...attributesTemplates.select_name,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_name',
				values: window.metadata.Sex.name,
				tags: ['translatable'],
				depth: 1,
				tooltip: langDict.tooltips.genetical_sex_name
			},
			//'hy': [ relation_exists
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_relationship',
				depth: 1,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.remains,
				tooltip: langDict.tooltips.haplogroup_y_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_y_name
			},
			//],
			//'hmt': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_relationship',
				depth: 1,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.remains,
				tooltip: langDict.tooltips.haplogroup_mt_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_mt_name
			},
			//],
			//'dating': [
			{
				...attributesTemplates.number_date,
				optgroup: 'dating',
				field: 'dating',
				id: 'dating_time_period',
				depth: 1,
				relation: langDict.relations.from_time,
				relation_previous: langDict.optgroups.remains,
				tooltip: langDict.tooltips.dating_time_period
			},
			{
				...attributesTemplates.period_length,
				optgroup: 'dating',
				field: 'dating',
				id: 'dating_time_period_length',
				depth: 1,
				tooltip: langDict.tooltips.dating_time_period_length
			},
			//'dating_type': [
			{
				...attributesTemplates.select_name,
				label: langDict.attributes.type,
				optgroup: 'dating_type',
				field: 'dating_type',
				id: 'dating_type_name',
				values: window.metadata.DatingType.name,
				tags: ['translatable'],
				depth: 2,
				relation: langDict.relations.is,
				relation_previous: langDict.optgroups.dating,
				tooltip: langDict.tooltips.dating_type_name
			},
			//'dating_culture': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'dating_culture',
				field: 'dating_culture',
				id: 'dating_culture_relationship',
				depth: 2,
				relation: langDict.relations.from_time,
				relation_previous: langDict.optgroups.dating,
				tooltip: langDict.tooltips.dating_culture_relationship
			},
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.name,
				optgroup: 'dating_culture',
				field: 'dating_culture',
				id: 'dating_culture_name',
				tags: ['searchable', 'translatable', 'relations_filter'],
				input: customInputs.search,
				depth: 2,
				tooltip: langDict.tooltips.dating_culture_name
			},
			//],
			//'phase': [
			{ // multiple rels?
				...attributesTemplates.select_name,
				label: langDict.attributes.function,
				optgroup: 'use_phase',
				field: 'use_phase_function',
				id: 'use_phase_function_name',
				values: window.metadata.UsePhaseFunction.name,
				tags: ['translatable'],
				relation: langDict.relations.from,
				relation_previous: langDict.optgroups.remains,
				depth: 1,
				tooltip: langDict.tooltips.use_phase_function_name
			},
			/*{
				...attributesTemplates.number_date,
				optgroup: 'use_phase',
				field: 'use_phase',
				id: 'usephase_year',
				depth: 1,
				tooltip: langDict.tooltips.usephase_year
			},
			{
				...attributesTemplates.period_length,
				optgroup: 'use_phase',
				field: 'use_phase',
				id: 'use_phase_period_length',
				depth: 1,
				tooltip: langDict.tooltips.use_phase_period_length
			},*/
			/*
			//'use_phase_from_culture': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'use_phase_from_culture',
				field: 'use_phase_from_culture',
				id: 'use_phase_culture_relationship',
				depth: 2,
				relation: langDict.relations.from_time,
				relation_previous: langDict.optgroups.use_phase,
				tooltip: langDict.tooltips.use_phase_culture_relationship
			},
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.name,
				optgroup: 'use_phase_from_culture',
				field: 'use_phase_from_culture',
				id: 'use_phase_from_culture_name',
				tags: ['searchable', 'translatable', 'relations_filter'],
				input: customInputs.search,
				depth: 2,
				tooltip: langDict.tooltips.use_phase_from_culture_name
			},
			//'use_phase_part_of_culture': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'use_phase_part_of_culture',
				field: 'use_phase_part_of_culture',
				id: 'use_phase_part_of_culture_relationship',
				depth: 2,
				relation: langDict.relations.part_of,
				relation_previous: langDict.optgroups.use_phase,
				tooltip: langDict.tooltips.use_phase_part_of_culture_relationship
			},
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.name,
				optgroup: 'use_phase_part_of_culture',
				field: 'use_phase_part_of_culture',
				id: 'use_phase_part_of_culture_name',
				tags: ['searchable', 'translatable', 'relations_filter'],
				input: customInputs.search,
				depth: 2,
				tooltip: langDict.tooltips.use_phase_part_of_culture_name
			},
			//'period': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'use_phase_part_of_period',
				field: 'use_phase_part_of_period',
				id: 'use_phase_part_of_period_relationship',
				depth: 2,
				relation: langDict.relations.part_of,
				relation_previous: langDict.optgroups.use_phase,
				tooltip: langDict.tooltips.archaeological_period_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'use_phase_part_of_period',
				field: 'use_phase_part_of_period',
				id: 'use_phase_part_of_period_name',
				tags: ['searchable', 'translatable', 'relations_filter'],
				input: customInputs.search,
				depth: 2,
				tooltip: langDict.tooltips.archaeological_period_name
			},*/
			//'site': [
			{
				...attributesTemplates.text_name,
				optgroup: 'archaeological_site',
				field: 'archaeological_site',
				id: 'archaeological_site_name',
				tags: ['translatable', 'searchable'],
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.remains,
				depth: 1,
				tooltip: langDict.tooltips.archaeological_site_name,
				input: customInputs.search
			},
			{
				...attributesTemplates.point_coords,
				optgroup: 'archaeological_site',
				field: 'archaeological_site',
				id: 'archaeological_site_coordinates',
				depth: 1,
				tooltip: langDict.tooltips.archaeological_site_coordinates
			},
			//'politregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'political_region',
				field: 'political_region',
				id: 'political_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.archaeological_site,
				tooltip: langDict.tooltips.political_region_name
			},
			//'geographicalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'geographical_region',
				field: 'geographical_region',
				id: 'geographical_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.archaeological_site,
				tooltip: langDict.tooltips.geographical_region_name
			},
			//'culturalregion': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'cultural_region',
				field: 'cultural_region',
				id: 'cultural_region_relationship',
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.archaeological_site,
				tooltip: langDict.tooltips.cultural_region_relationship
			},
			{
				...attributesTemplates.text_name,
				optgroup: 'cultural_region',
				field: 'cultural_region',
				id: 'cultural_region_name',
				tags: ['searchable', 'translatable', 'relations_filter'],
				input: customInputs.search,
				depth: 2,
				tooltip: langDict.tooltips.cultural_region_name
			},
			//],
			//'sample': [
			{
				...attributesTemplates.text_id,
				optgroup: 'sample',
				field: 'sample',
				id: 'sample_id',
				relation: langDict.relations.of,
				relation_direction: 'left',
				relation_previous: langDict.optgroups.remains,
				depth: 1,
				tooltip: langDict.tooltips.sample_id,
				tags: ['searchable'],
				input: customInputs.search,
			},
			//'result_type': Admixture [
			//'admixturetype': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'result_admixture',
				field: 'result_admixture',
				id: 'result_admixture_relationship',
				tags: ['proportion'],
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_admixture_type_relationship
			},
			{
				...attributesTemplates.component,
				optgroup: 'result_admixture',
				field: 'result_admixture',
				id: 'result_admixture_component',
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_admixture_component
			},	

			//'pcatype': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'result_pca',
				field: 'result_pca',
				id: 'result_pca_relationship',
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_pca_type_relationship
			},
			{
				...attributesTemplates.component,
				optgroup: 'result_pca',
				field: 'result_pca',
				id: 'result_pca_component',
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_pca_component
			},			
			//'umaptype': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'result_umap',
				field: 'result_umap',
				id: 'result_umap_relationship',
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_umap_type_relationship
			},
			{
				...attributesTemplates.component,
				optgroup: 'result_umap',
				field: 'result_umap',
				id: 'result_umap_component',
				depth: 2,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.result_umap_component
			},	
			//'source': [
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.source_name,
				optgroup: 'source',
				field: 'source',
				id: 'source_name',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.published_in,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.source_name
			},
			{
				...attributesTemplates.number_date,
				valueAttribute: 'date',
				queryAttribute: 'date',
				label: langDict.attributes.source_date,
				operators: operatorsSets.number,
				validation: { callback: validators.min_max_number(2000, currentYear) },
				optgroup: 'source',
				field: 'source',
				tags: ['contemporary'],
				id: 'source_date',
				depth: 2,
				tooltip: langDict.tooltips.source_date
			},
			// Author
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.name,
				optgroup: 'source_author',
				field: 'source_author',
				id: 'source_author_name',
				tags: ['searchable', 'relations_filter'],
				input: customInputs.search,
				depth: 3,
				relation: langDict.relations.of,
				relation_direction: 'left',
				relation_previous: langDict.optgroups.source,
				tooltip: langDict.tooltips.source_author_name
			}
		],
		'PersonAADR': [
			//'person': [
			{
				...attributesTemplates.text_id,
				optgroup: 'person',
				field: 'person',
				id: 'person_id',
				root: true,
				depth: 0,
				tooltip: langDict.tooltips.person_id,
				tags: ['searchable'],
				input: customInputs.search
			},
			/* description */
			//],
			//'population' 
			{
				...attributesTemplates.text_name,
				optgroup: 'present_population',
				field: 'present_population',
				id: 'present_population_name',
				depth: 1,
				relation: langDict.relations.part_of,
				relation_previous: langDict.optgroups.person,
				tags: ['searchable'],
				input: customInputs.search,
				tooltip: langDict.tooltips.present_population_name
			},
			//'genetical_sex': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_relationship',
				depth: 1,
				relation: langDict.relations.is,
				relation_previous: langDict.optgroups.person,
				tooltip: langDict.tooltips.genetical_sex_relationship
			},
			{
				...attributesTemplates.select_name,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_name',
				values: window.metadata.Sex.name,
				tags: ['translatable'],
				depth: 1,
				tooltip: langDict.tooltips.genetical_sex_name
			},
			//'hy': [ relation_exists
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_relationship',
				depth: 1,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.person,
				tooltip: langDict.tooltips.haplogroup_y_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_y_name
			},
			//],
			//'hmt': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_relationship',
				depth: 1,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.person,
				tooltip: langDict.tooltips.haplogroup_mt_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_mt_name
			},
			//'place': [
			{
				...attributesTemplates.text_name,
				optgroup: 'place',
				field: 'place',
				id: 'place_name',
				tags: ['translatable', 'searchable'],
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.person,
				depth: 1,
				tooltip: langDict.tooltips.place_name,
				input: customInputs.search
			},
			{
				...attributesTemplates.point_coords,
				optgroup: 'place',
				field: 'place',
				id: 'place_coordinates',
				depth: 1,
				tooltip: langDict.tooltips.place_coordinates
			},
			//'politregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'political_region',
				field: 'political_region',
				id: 'political_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.political_region_name
			},
			//'geographicalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'geographical_region',
				field: 'geographical_region',
				id: 'geographical_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.geographical_region_name
			},
			//'culturalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'cultural_region',
				field: 'cultural_region',
				id: 'cultural_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.cultural_region_name
			},
			//],
			//'sample': [
			{
				...attributesTemplates.text_id,
				optgroup: 'sample',
				field: 'sample',
				id: 'sample_id',
				relation: langDict.relations.of,
				relation_direction: 'left',
				relation_previous: langDict.optgroups.person,
				depth: 1,
				tooltip: langDict.tooltips.sample_id,
				tags: ['searchable'],
				input: customInputs.search
			},
			//'result_type': Admixture [
			//'admixturetype': [
				{
					...attributesTemplates.relation_exists,
					optgroup: 'result_admixture',
					field: 'result_admixture',
					id: 'result_admixture_relationship',
					tags: ['proportion'],
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_admixture_type_relationship
				},
				{
					...attributesTemplates.component,
					optgroup: 'result_admixture',
					field: 'result_admixture',
					id: 'result_admixture_component',
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_admixture_component
				},	
	
				//'pcatype': [
				{
					...attributesTemplates.relation_exists,
					optgroup: 'result_pca',
					field: 'result_pca',
					id: 'result_pca_relationship',
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_pca_type_relationship
				},
				{
					...attributesTemplates.component,
					optgroup: 'result_pca',
					field: 'result_pca',
					id: 'result_pca_component',
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_pca_component
				},			
				//'umaptype': [
				{
					...attributesTemplates.relation_exists,
					optgroup: 'result_umap',
					field: 'result_umap',
					id: 'result_umap_relationship',
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_umap_type_relationship
				},
				{
					...attributesTemplates.component,
					optgroup: 'result_umap',
					field: 'result_umap',
					id: 'result_umap_component',
					depth: 2,
					relation: langDict.relations.has,
					relation_previous: langDict.optgroups.sample,
					tooltip: langDict.tooltips.result_umap_component
				},	
			//'source': [
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.source_name,
				optgroup: 'source',
				field: 'source',
				id: 'source_name',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.published_in,
				relation_previous: langDict.optgroups.sample,
				tooltip: langDict.tooltips.source_name
			},
			{
				...attributesTemplates.number_date,
				label: langDict.attributes.source_date,
				operators: operatorsSets.number,
				validation: { callback: validators.min_max_number(2000, currentYear) },
				optgroup: 'source',
				field: 'source',
				tags: ['contemporary'],
				id: 'source_time_period',
				depth: 2,
				tooltip: langDict.tooltips.source_time_period
			},
			// Author
			{
				...attributesTemplates.text_name,
				label: langDict.attributes.name,
				optgroup: 'source_author',
				field: 'source_author',
				id: 'source_author_name',
				tags: ['searchable', 'relations_filter'],
				input: customInputs.search,
				depth: 3,
				relation: langDict.relations.of,
				relation_direction: 'left',
				relation_previous: langDict.optgroups.source,
				tooltip: langDict.tooltips.source_author_name
			}
		],
		/*'PersonGMP': [
			//'person': [
			{
				...attributesTemplates.text_id,
				optgroup: 'person',
				field: 'person',
				id: 'person_id',
				root: true,
				depth: 0
			},
			{
				...attributesTemplates.age,
				optgroup: 'person',
				field: 'person',
				id: 'person_age',
				root: true
			},
			//],
			//'genetical_sex': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_relationship',
				depth: 1
			},
			{
				...attributesTemplates.select_name,
				optgroup: 'genetical_sex',
				field: 'genetical_sex',
				id: 'genetical_sex_name',
				values: window.metadata.Sex.name,
				tags: ['translatable'],
				depth: 1
			},
			//'hy': [ relation_exists
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_relationship',
				depth: 1
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_y',
				field: 'haplogroup_y',
				id: 'haplogroup_y_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1
			},
			//],
			//'hmt': [
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_relationship',
				depth: 1
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1
			},
			//'site': [
			{
				...attributesTemplates.text_name,
				optgroup: 'place',
				field: 'place',
				id: 'place_name',
				tags: ['translatable']
			},
			{
				...attributesTemplates.point_coords,
				optgroup: 'place',
				field: 'place',
				id: 'place_coordinates'
			},
			//'politregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'political_region',
				field: 'political_region',
				id: 'political_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 1
			},
			//'geographicalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'geographical_region',
				field: 'geographical_region',
				id: 'geographical_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 1
			},
			//'culturalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'cultural_region',
				field: 'cultural_region',
				id: 'cultural_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 1
			},
			//],
			//'sample': [
			{
				...attributesTemplates.text_id,
				optgroup: 'sample',
				field: 'sample',
				id: 'sample_id'
			}
		],*/
		'PersonEMPOP': [
			//'person': [
			{
				...attributesTemplates.text_id,
				optgroup: 'person',
				field: 'person',
				id: 'person_id',
				root: true,
				depth: 0,
				tooltip: langDict.tooltips.person_id
			},
			// hmt //
			{
				...attributesTemplates.relation_exists,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_relationship',
				depth: 1,
				relation: langDict.relations.has,
				relation_previous: langDict.optgroups.person,
				tooltip: langDict.tooltips.haplogroup_mt_relationship
			},
			{
				...attributesTemplates.tree_name,
				optgroup: 'haplogroup_mt',
				field: 'haplogroup_mt',
				id: 'haplogroup_mt_name',
				detailsAttribute: 'synonym',
				tags: ['searchable'],
				input: customInputs.search,
				depth: 1,
				tooltip: langDict.tooltips.haplogroup_mt_name
			},
			//'place': [
			{
				...attributesTemplates.point_coords,
				optgroup: 'place',
				field: 'place',
				id: 'place_coordinates',
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.person,
				depth: 1,
				tooltip: langDict.tooltips.place_coordinates
			},
			//'politregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'political_region',
				field: 'political_region',
				id: 'political_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.political_region_name
			},
			//'geographicalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'geographical_region',
				field: 'geographical_region',
				id: 'geographical_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.geographical_region_name
			},
			//'culturalregion': [
			{
				...attributesTemplates.text_name,
				optgroup: 'cultural_region',
				field: 'cultural_region',
				id: 'cultural_region_name',
				tags: ['searchable', 'translatable'],
				input: customInputs.search,
				depth: 2,
				relation: langDict.relations.in,
				relation_previous: langDict.optgroups.place,
				tooltip: langDict.tooltips.cultural_region_name
			}
			//],
			//'sample': [
			/*{
				...attributesTemplates.text_id,
				optgroup: 'sample',
				field: 'sample',
				id: 'sample_id',
				relation: langDict.relations.of,
				relation_direction: 'left',
				relation_previous: langDict.optgroups.person,
				depth: 1
			}*/
		],

	};
}