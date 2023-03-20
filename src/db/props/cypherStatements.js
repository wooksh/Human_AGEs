/* "coordinates" and "dating" are fields, that every mapable entity should output when queried */
/* In future generalize ArchaeologicalSite to Place */

/* Here should be only attributes, that makes easy map browsing, not detailed information reading */

exports.cypher_Person = `
    coordinates: JSON @cypher(statement:
        """MATCH (this)-[:IN]->(a:Place) RETURN {latitude: a.coordinates.latitude, longitude: a.coordinates.longitude}
        """)

    full_sample(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)<-[:OF]-(s:Sample)
        WITH s
        OPTIONAL MATCH (s)-[:OF]->(so:SampleOrigin)
        WITH s, so,
        apoc.any.property(so, \\"lang_\\" + $lang + \\"__name\\")  as sample_origin
        RETURN {
            internal_id: id(s),
            id: s.id, 
            origin: sample_origin
        };
        """)

    sources(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this) <-[:OF]- (:Sample) -[:PUBLISHED_IN]-> (ss:Source) -[:IS]-> (t:SourceType)
        WITH ss, t
        OPTIONAL MATCH (ss) <-[rel:OF]- (a:Author)
        WITH ss, a, rel,
        apoc.any.property(t, \\"lang_\\" + $lang + \\"__name\\") as type_name,
        t.id as type_id

        ORDER BY rel.order
        
        WITH ss, collect(a.name) as authors,
        type_name,
        type_id
        
        RETURN collect({
            type_id: type_id,
            type_name: type_name,
            name: ss.name,
            authors: authors,
            publisher: ss.publisher,
            date: ss.date,
            volume_and_issue: ss.volume_and_issue,
            pages: ss.pages,
            hyperlink: ss.hyperlink,
            id: ss.id
        });
        """)

    place(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this)-[:IN]->(a:Place)
            WITH
            apoc.any.property(a, \\"lang_\\" + $lang + \\"__name\\") as searched_name,
            a.coordinates.latitude as latitude,
            a.coordinates.longitude as longitude,
            a.id as id,
            apoc.any.property(a, \\"lang_\\" + a.default_lang + \\"__name\\") as default_name
            RETURN CASE NOT searched_name IS NULL
                WHEN TRUE THEN {name: searched_name, latitude: latitude, longitude: longitude, id: id}
                ELSE {name: default_name, latitude: latitude, longitude: longitude, id: id}
                END
        """)

    sex(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:IS]->(s:Sex)
        WITH s, apoc.any.property(s, \\"lang_\\" + $lang + \\"__name\\") as searched
            RETURN CASE NOT searched IS NULL
                WHEN TRUE THEN {value: searched}
                ELSE {value: apoc.any.property(s, \\"lang_\\" + s.default_lang + \\"__name\\") }
                END
        """)

    haplogroup_y(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:HAS]->(y:HaplogroupY) RETURN {value: y.name, index: y.treeIndex}
        """)

    haplogroup_mt(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:HAS]->(mt:HaplogroupMt) RETURN {value: mt.name, index: mt.treeIndex}
        """)

    admixture(type: String): JSON @cypher(statement:
        """MATCH (this)<-[:OF]-(:Sample)-[:HAS]->(r:Admixture)-[:IS]->(:AdmixtureResult {id: $type}) 
        
UNWIND RANGE(0, r.length) as i
WITH id(r) as idn, r['c' + i] as c
WITH idn, collect(c) as vector
        
        RETURN { value: vector }
        """)

    haplogroup_y_parent(depth: Int = 0): String @cypher(statement: """
        MATCH (this) -[:HAS]-> (n:HaplogroupY)
        RETURN CASE n.depth <= $depth
        WHEN true THEN 
            null
        WHEN false THEN
            [(n) -[:PART_OF*..100]-> (p {depth: $depth}) | p.name][0]
        END
        """)

    haplogroup_mt_parent(depth: Int = 0): String @cypher(statement: """
        MATCH (this) -[:HAS]-> (n:HaplogroupMt)
        RETURN CASE n.depth <= $depth
        WHEN true THEN 
            null
        WHEN false THEN
            [(n) -[:PART_OF*..100]-> (p {depth: $depth}) | p.name][0]
        END
        """)

    regionsIds(lang: String = "en", type: String = "countries"): JSON @cypher(statement: 
        """MATCH (this)-[:IN]->(a:Place)-[:IN*1..5]->(p:Region) -[:IS]-> (:Division {id: $type})
            RETURN collect(p.id)
        """)


    region_backup(lang: String = "en", type: String = "countries"): JSON @cypher(statement: 
        """ MATCH (this)-[:IN]->(a:Place)-[:IN*1..5]->(p:Region) -[:IS]-> (:Division {id: $type})
            WITH
            apoc.any.property(p, \\"lang_\\" + $lang + \\"__name\\") as searched_name,
            p.id as id,
            apoc.any.property(p, \\"lang_\\" + p.default_lang + \\"__name\\") as default_name,
            p.centroid as centroid
            RETURN CASE NOT searched_name IS NULL
                WHEN TRUE THEN {name: searched_name, id: id, centroid: [centroid.x, centroid.y]}
                ELSE {name: default_name, id: id, centroid: [centroid.x, centroid.y]}
                END
        """)

    admixtures(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this) <-[:OF]- (:Sample) -[:HAS]-> (a:Admixture) -[:IS]-> (r:ResultType)

UNWIND RANGE(0, a.length) as i
WITH r, a['c' + i] as c
WITH r, collect(c) as values

        WITH values,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__name\\") as admixture_type_name,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__description\\") as admixture_type_desc
        ORDER BY size(values)
        
        RETURN collect({
            name: admixture_type_name,
            desc: admixture_type_desc,
            values: values
        })
        """)

    umap(type: String): JSON @cypher(statement:
        """MATCH (this)<-[:OF]-(:Sample)-[:HAS]->(r:UMAP)-[:IS]->(:ResultType {id: $type}) 
        
UNWIND RANGE(0, r.length) as i
WITH id(r) as idn, r['c' + i] as c
WITH idn, collect(c) as vector
        
        RETURN { value: vector }
        """)


    umaps(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this) <-[:OF]- (:Sample) -[:HAS]-> (a:UMAP) -[:IS]-> (r:ResultType)

UNWIND RANGE(0, a.length) as i
WITH r, a['c' + i] as c
WITH r, collect(c) as values

        WITH values,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__name\\") as result_type_name,
        r.id as result_type_id

        ORDER BY size(values)
        
        RETURN collect({
            id: result_type_id,
            name: result_type_name,
            values: values
        })
        """)

    umap_types(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this) <-[:OF]- (:Sample) -[:HAS]-> (:UMAP) -[:IS]-> (r:ResultType)
        WITH apoc.any.property(r, \\"lang_\\" + $lang + \\"__name\\") as result_type_name,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__description\\") as result_type_desc,
        r.id as result_type_id
        ORDER BY result_type_name
        
        RETURN collect({
            id: result_type_id,
            name: result_type_name,
            desc: result_type_desc
        })
        """)

    pca(type: String): JSON @cypher(statement:
        """MATCH (this)<-[:OF]-(:Sample)-[:HAS]->(r:PCA)-[:IS]->(:ResultType {id: $type}) 

UNWIND RANGE(0, r.length) as i
WITH id(r) as idn, r['c' + i] as c
WITH idn, collect(c) as vector

        RETURN { value: vector }
        """)

    pcas(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this) <-[:OF]- (:Sample) -[:HAS]-> (a:PCA) -[:IS]-> (r:ResultType)

UNWIND RANGE(0, a.length) as i
WITH r, a['c' + i] as c
WITH r, collect(c) as values

        WITH values,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__name\\") as result_type_name,
        r.id as result_type_id
        ORDER BY size(values)
        
        RETURN collect({
            id: result_type_id,
            name: result_type_name,
            values: values
        })
        """)

    pca_types(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this) <-[:OF]- (:Sample) -[:HAS]-> (:PCA) -[:IS]-> (r:ResultType)
        WITH apoc.any.property(r, \\"lang_\\" + $lang + \\"__name\\") as result_type_name,
        apoc.any.property(r, \\"lang_\\" + $lang + \\"__description\\") as result_type_desc,
        r.id as result_type_id
        ORDER BY result_type_name
        
        RETURN collect({
            id: result_type_id,
            name: result_type_name,
            desc: result_type_desc
        })
        """)

    population(lang: String = "en"): String @cypher(statement:
        """ MATCH (this) -[:PART_OF]-> (p:Population) 
        RETURN p.name
        """)
`;


exports.cypher_Remains = exports.cypher_Person + `
    dating: JSON @cypher(statement:
        """MATCH (this)-[:FROM_TIME]->(d:Dating)-[:IS]->(dt:DatingType) RETURN {
			year_start: d.dateFrom.year, 
			year_end: d.dateTo.year
        } ORDER BY d.dateFrom.year
        """)


    site(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this)-[:IN]->(a:ArchaeologicalSite)
            WITH
            apoc.any.property(a, \\"lang_\\" + $lang + \\"__name\\") as searched_name,
            a.coordinates.latitude as latitude,
            a.coordinates.longitude as longitude,
            a.id as id,
            apoc.any.property(a, \\"lang_\\" + a.default_lang + \\"__name\\") as default_name
            RETURN CASE NOT searched_name IS NULL
                WHEN TRUE THEN {name: searched_name, latitude: latitude, longitude: longitude, id: id}
                ELSE {name: default_name, latitude: latitude, longitude: longitude, id: id}
                END
        """)


    full_site(lang: String = "en"): JSON @cypher(statement:
        """ MATCH (this)-[:IN]->(a:ArchaeologicalSite)
            WITH a, 
            apoc.any.property(a, \\"lang_\\" + $lang + \\"__name\\") as searched_name,
            apoc.any.property(a, \\"lang_\\" + $lang + \\"__description\\") as searched_description,
            a.coordinates.latitude as latitude,
            a.coordinates.longitude as longitude,
            a.id as id
            WITH
            searched_name,
            searched_description,
            latitude,
            longitude,
            id,
            {name: NOT searched_name IS NULL, description: NOT searched_description IS NULL} as truth_dic,
            apoc.any.property(a, \\"lang_\\" + a.default_lang + \\"__name\\") as default_name,
            apoc.any.property(a, \\"lang_\\" + a.default_lang + \\"__description\\") as default_description
                RETURN CASE truth_dic
                    WHEN truth_dic.name = TRUE AND truth_dic.description = TRUE THEN 
                        {id: id, name: searched_name, description: searched_description, latitude: latitude, longitude: longitude}
                    WHEN truth_dic.name = TRUE THEN
                        {id: id, name: searched_name, description: default_description, latitude: latitude, longitude: longitude}
                    WHEN truth_dic.description = TRUE THEN
                        {id: id, name: default_name, description: searched_description, latitude: latitude, longitude: longitude}
                    ELSE
                        {id: id, name: default_name, description: default_description, latitude: latitude, longitude: longitude}
                END as site
        """)

    genetical_sex(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:IS_GENETICALLY]->(s:Sex)
        WITH s, apoc.any.property(s, \\"lang_\\" + $lang + \\"__name\\") as searched
            RETURN CASE NOT searched IS NULL
                WHEN TRUE THEN {name: searched}
                ELSE {value: apoc.any.property(s, \\"lang_\\" + s.default_lang + \\"__name\\") }
                END
        """)

    anthropological_sex(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:IS_ANTHROPOLOGICALLY]->(s:Sex)
        WITH s, apoc.any.property(s, \\"lang_\\" + $lang + \\"__name\\") as searched
            RETURN CASE NOT searched IS NULL
                WHEN TRUE THEN {name: searched}
                ELSE {value: apoc.any.property(s, \\"lang_\\" + s.default_lang + \\"__name\\") }
            END
        """)

    age: JSON @cypher(statement:
        """MATCH (this)
        RETURN CASE
        WHEN exists(this.ageFrom) AND this.ageFrom = this.ageTo THEN this.ageFrom
        WHEN exists(this.ageFrom) AND this.ageFrom <> this.ageTo THEN {from: this.ageFrom, to: this.ageTo}
        ELSE null
        END as ageCase
        """)

    developmental_stages(lang: String = "en"): JSON @cypher(statement:
        """MATCH (this)-[:IS]->(s:PhysicalDevelopmentStage)
        WITH this, 
        collect( apoc.any.property(s, \\"lang_\\" + $lang + \\"__name\\") ) as searcheds,
        collect( apoc.any.property(s, \\"lang_\\" + s.default_lang + \\"__name\\") ) as defaults
            RETURN CASE size(searcheds) > 0
                WHEN TRUE THEN {names: searcheds}
                ELSE {names: defaults }
                END
        """)
`;


/* Personalized download calls */

exports.cypher_Remains += `
download(lang: String = "en"): JSON @cypher(statement:
    """MATCH (this) <-[:OF]- (sample:Sample) -[:OF]-> (sample_origin:SampleOrigin)
    WITH this, sample, sample_origin

OPTIONAL MATCH (sample) -[:HAS]-> (admixtures:Admixture) -[:IS]-> (ad_results:ResultType)
    WITH this, sample, sample_origin, admixtures, ad_results,
    apoc.any.property(ad_results, \\"lang_\\" + $lang + \\"__name\\") as ad_results_names
    ORDER BY ad_results_names
    WITH this, sample, sample_origin,
    collect(CASE NOT ad_results_names IS NULL 
        WHEN TRUE THEN ad_results_names
        ELSE apoc.any.property(ad_results, \\"lang_\\" + ad_results.default_lang + \\"__name\\") 
        END) as ad_results_names

OPTIONAL MATCH (this) -[:FROM_TIME]-> (dating:Dating) -[:IS]-> (dat_type:DatingType) 
    WITH this, sample, sample_origin, dating, dat_type, ad_results_names

OPTIONAL MATCH (this) -[:IS]-> (sex:Sex)
    WITH this, sex, sample, sample_origin, dating, dat_type, ad_results_names
OPTIONAL MATCH (this) -[:PART_OF]-> (pop:Population) 
    WITH this, sex, pop, sample, sample_origin, dating, dat_type, ad_results_names
OPTIONAL MATCH (this) -[:HAS]-> (hy:HaplogroupY) 
    WITH this, sex, pop, hy, sample, sample_origin, dating, dat_type, ad_results_names
OPTIONAL MATCH (this) -[:HAS]-> (hmt:HaplogroupMt) 
    WITH this, sex, pop, hy, hmt, sample, sample_origin, dating, dat_type, ad_results_names
MATCH (use:UsePhase) <-[:FROM_TIME]- (this) -[:IN]-> (place:Place)
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use, ad_results_names

OPTIONAL MATCH (use) -[:IS]-> (use_fun:UsePhaseFunction)
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, ad_results_names

OPTIONAL MATCH (place) -[:IN]-> (reg_pols:PoliticalRegion) -[:IS]-> (div_pols:Division)
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, reg_pols, ad_results_names,
    apoc.any.property(div_pols, \\"lang_\\" + $lang + \\"__name\\") as div_pols_names,
    apoc.any.property(reg_pols, \\"lang_\\" + $lang + \\"__name\\") as reg_pols_names
    ORDER BY div_pols_names
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, ad_results_names,
    collect(div_pols_names) as div_pols_names,
    collect(CASE NOT reg_pols_names IS NULL 
        WHEN TRUE THEN reg_pols_names
        ELSE apoc.any.property(reg_pols, \\"lang_\\" + reg_pols.default_lang + \\"__name\\") 
        END) as reg_pols_names


OPTIONAL MATCH (place) -[:IN]-> (reg_geos:GeographicalRegion) -[:IS]-> (div_geos:Division)
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, reg_pols_names, div_pols_names, reg_geos, ad_results_names,
    apoc.any.property(div_geos, \\"lang_\\" + $lang + \\"__name\\") as div_geos_names,
    apoc.any.property(reg_geos, \\"lang_\\" + $lang + \\"__name\\") as reg_geos_names
    ORDER BY div_geos_names
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, reg_pols_names, div_pols_names, ad_results_names,
    collect(div_geos_names) as div_geos_names,
    collect(CASE NOT reg_geos_names IS NULL 
        WHEN TRUE THEN reg_geos_names
        ELSE apoc.any.property(reg_geos, \\"lang_\\" + reg_geos.default_lang + \\"__name\\") 
        END) as reg_geos_names


OPTIONAL MATCH (place) -[:IN]-> (reg_culs:CulturalRegion) -[:IS]-> (div_culs:Division)
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, reg_pols_names, div_pols_names, reg_geos_names, div_geos_names, reg_culs, ad_results_names,
    apoc.any.property(div_culs, \\"lang_\\" + $lang + \\"__name\\") as div_culs_names,
    apoc.any.property(reg_culs, \\"lang_\\" + $lang + \\"__name\\") as reg_culs_names
    ORDER BY div_culs_names
    WITH this, sex, pop, hy, hmt, sample, sample_origin, place, dating, dat_type, use_fun, reg_pols_names, div_pols_names, reg_geos_names, div_geos_names, ad_results_names,
    collect(div_culs_names) as div_culs_names,
    collect(CASE NOT reg_culs_names IS NULL 
        WHEN TRUE THEN reg_culs_names
        ELSE apoc.any.property(reg_culs, \\"lang_\\" + reg_culs.default_lang + \\"__name\\") 
        END) as reg_culs_names


WITH this, sex, pop, hy, hmt, place, sample, dating, dat_type, ad_results_names,
reg_pols_names, div_pols_names, reg_geos_names, div_geos_names, reg_culs_names, div_culs_names,
apoc.any.property(sample_origin, \\"lang_\\" + $lang + \\"__name\\") as sample_origin_name,
apoc.any.property(sex, \\"lang_\\" + $lang + \\"__name\\") as sex_name,
apoc.any.property(dat_type, \\"lang_\\" + $lang + \\"__name\\") as dat_type_name,
apoc.any.property(use_fun, \\"lang_\\" + $lang + \\"__name\\") as usephase_function,

apoc.any.property(place, \\"lang_\\" + $lang + \\"__name\\") as place_name

WITH this, sex, pop, hy, hmt, place, sample, dating, dat_type, ad_results_names,
reg_pols_names, div_pols_names, reg_geos_names, div_geos_names, reg_culs_names, div_culs_names,
sample_origin_name,
sex_name,
dat_type_name,
usephase_function,

CASE NOT place_name IS NULL 
    WHEN TRUE THEN place_name 
    ELSE apoc.any.property(place, \\"lang_\\" + place.default_lang + \\"__name\\") 
    END as place_name

RETURN {
    sample_id: sample.id, 
    sample_origin: sample_origin_name,

    dating_from: dating.dateFrom.year,
    dating_to: dating.dateTo.year,
    dating_type: dat_type_name,

    regions_political: reg_pols_names,
    divisions_political: div_pols_names,

    regions_geographical: reg_geos_names,
    divisions_geographical: div_geos_names,

    regions_cultural: reg_culs_names,
    divisions_cultural: div_culs_names,

    sex: sex_name, 
    population_name: pop.name,
    haplogroup_y: hy.name, 
    haplogroup_mt: hmt.name,

    place_name: place_name,
    latitude: place.coordinates.y,
    longitude: place.coordinates.x
}
    """)
`;

/*

//entity
//database
//entity_id
//database_id

    political_region
    geographical_region
    cultural_region

    JESZCZE TYPY

    admixture
pca
    umap

    sample_id
    sample_origin

sources_names
sources_types
sources_links
sources_years

    dating_method

use_phase_culture
    use_phase_function

DOKOŃCZ!
Może podziel to na adnotację i wyniki analizy genomicznej?
*/

exports.cypher_Person += `
download: JSON @cypher(statement:
    """MATCH (this) <-[:OF]- (sample:Sample) 
    OPTIONAL MATCH (this) -[:IS]-> (sex:Sex) WITH this, sex, sample
    OPTIONAL MATCH (this) -[:PART_OF]-> (pop:Population) WITH this, sex, pop, sample
    OPTIONAL MATCH (this) -[:HAS]-> (hy:HaplogroupY) WITH this, sex, pop, hy, sample
    OPTIONAL MATCH (this) -[:HAS]-> (hmt:HaplogroupMt) WITH this, sex, pop, hy, hmt, sample
    MATCH (this) -[:IN]-> (place:Place) WITH this, sex, pop, hy, hmt, place, sample
    RETURN {
        sample_id: sample.id, 
        sex: sex.lang_en__name, 
        population_name: pop.name,
        haplogroup_y: hy.name, 
        haplogroup_mt: hmt.name,
        place_name: place.lang_en__name,
        latitude: place.coordinates.y,
        longitude: place.coordinates.x
    }
    """)
`;

exports.cypher_ArchaeologicalSite = `
`;


exports.cypher_UsePhase = `
    coordinates: JSON @cypher(statement:
        """MATCH (this)-[:IN]->(a:ArchaeologicalSite) RETURN {latitude: a.coordinates.latitude, longitude: a.coordinates.longitude}
        """)

    dating: JSON @cypher(statement:
        """MATCH (this) RETURN {
            year_start: this.dateFrom.year, year_end: this.dateTo.year
        } ORDER BY d.dateFrom.year
        """)
`;


exports.cypher_Result = `
    plot_data: JSON @cypher(statement:
        """
        MATCH (this) <-[:HAS]- (s:Sample) -[:OF]-> (r) -[:PART_OF]-> (p:Population)
        WITH this, s, r, p

UNWIND RANGE(0, this.length) as i
WITH s, r, p, this['c' + i] as c
WITH s, r, p, collect(c) as vector

        RETURN {
            is_present: p.is_present,
            pop_name: p.name,
            country: p.country_annotation,
            region: p.region_annotation,
            remains_or_person_id: r.id,
            sample_id: s.id,
			points: vector
        }
    """)
`;


exports.cypher_Region = `
	division(lang: String = "en"): String @cypher(statement: """MATCH (this) -[:IS]-> (division:Division)
	WITH division, apoc.any.property(division, 'lang_' + $lang + '__name') as searched
	RETURN CASE NOT searched IS NULL
		WHEN TRUE THEN searched
		ELSE apoc.any.property(division, 'lang_' + division.default_lang + '__name')
	END""")

    dating: JSON @cypher(statement:
        """ MATCH (this) WITH this RETURN CASE exists(this.dateFrom)
            WHEN TRUE THEN {
                year_start: this.dateFrom.year, 
                year_end: this.dateTo.year
            }
            ELSE {
                year_start: null, 
                year_end: null
            }
        END
        """)
`;
/*
time(): JSON @cypher(statement: """MATCH (this) 
    
""")
*/

exports.cypher_Polygon = `
    pointsArray: JSON @cypher(statement: """
        MATCH (this) WITH this UNWIND this.points as point WITH [point.x, point.y] as point RETURN collect(point) 
    """)
`;

exports.cypher_PolygonHole = `
    pointsArray: JSON @cypher(statement: """
        MATCH (this) WITH this UNWIND this.points as point WITH [point.x, point.y] as point RETURN collect(point) 
    """)
`;


exports.cypher_PoliticalRegion = exports.cypher_Region;


exports.cypher_GeographicalRegion = exports.cypher_Region;