module.exports = `
MATCH (n:Culture), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Sex), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:PhysicalDevelopmentStage), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(n.treeIndex) + count(n.depth) + count(r) AS s
UNION
MATCH (n:ArchaeologicalPeriod), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(n.treeIndex) + count(n.depth) + count(r) AS s
UNION
MATCH (n:UsePhase), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n) + count(r) AS s
UNION
MATCH (n:ArchaeologicalSite), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Place), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:DatingType), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__name) + count(n.lang_pl__name) + count(r) AS s
UNION
MATCH (n:Dating), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n.lang_en__description) + count(n.lang_pl__description) + count(r) AS s
UNION
MATCH (n:Remains), OPTIONAL MATCH (n) -[r]-> () 
RETURN count(n) + count(r) AS s
`;