SELECT_PROBLEM_BY_ID = """
    SELECT id, title, title_slug, difficulty, mastered
    FROM problems
    WHERE id = %s;
"""

SELECT_PROBLEM_CLASSIFICATIONS_BY_ID = """
    SELECT problem_id, classification
    FROM problem_attr
    WHERE problem_id = %s;
"""

SELECT_PROBLEMS_WITH_PAGINATION_AND_LIMIT = """
    SELECT *
    FROM problems
    OFFSET %s
    LIMIT %s;
"""

SELECT_COMPANIES = """
    SELECT *
    FROM company;
"""

SELECT_COMPANY_BY_ID = """
    SELECT *
    FROM company
    WHERE id = %s
"""

SELECT_COMPANIES_BY_PROBLEM_ID = """
    SELECT DISTINCT c.id as id, c.name as name
    FROM company c
    LEFT JOIN problem_to_company ptc 
    ON c.id = ptc.company_id
    WHERE ptc.problem_id = %s
"""


SELECT_PROBLEMS_BY_COMPANY_WITH_PAGINATION_AND_LIMIT = """
    SELECT p.id as id, p.title as title, p.title_slug as title_slug, p.difficulty as diifculty, p.mastered as mastered
    FROM problems p
    LEFT JOIN problem_to_company ptc 
    ON p.id = ptc.problem_id
    LEFT JOIN company c 
    ON ptc.company_id = c.id
    WHERE ptc.company_id = %s
    OFFSET %s
    LIMIT %s;
"""

SELECT_PROBLEMS_BY_CLASSIFICATION_WITH_PAGINATION_AND_LIMIT = """
    SELECT p.id as id, p.title as title, p.title_slug as title_slug, p.difficulty as diifculty, p.mastered as mastered
    FROM problems p
    LEFT JOIN problem_attr pa 
    ON p.id = pa.problem_id
    WHERE pa.classification = %s
    OFFSET  %s
    LIMIT %s;
"""

SELECT_CLASSIFICATIONS = """
    SELECT p.classification, count(p.*) as count
    FROM problem_attr p
    GROUP BY p.classification
    ORDER BY count DESC;
"""

SELECT_CLASSIFICATIONS_BY_COMPANY = """
    SELECT p.classification, count(p.*) as count
    FROM problem_attr p
    LEFT JOIN problem_to_company ptc 
    ON p.problem_id = ptc.problem_id
    WHERE ptc.company_id = %s
    GROUP BY p.classification
    ORDER BY count DESC;
"""

SELECT_CLASSIFICATION_BY_NAME = """
    SELECT p.classification, count(*) as count
    FROM problem_attr p
    WHERE classification = %s
    GROUP BY p.classification
"""
