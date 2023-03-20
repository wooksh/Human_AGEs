module.exports = `
MATCH (n:Culture) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Sex) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:PhysicalDevelopmentStage) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:ArchaeologicalPeriod) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:UsePhase) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.function) + count(r) AS s
UNION
MATCH (n:ArchaeologicalSite) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Place) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Dating) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:Remains) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:Polygon) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:HaplogroupY) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:HaplogroupMt) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:Region) WITH n OPTIONAL MATCH (n) -[r]-> (p) 
RETURN count(n) + count(r) AS s
`;