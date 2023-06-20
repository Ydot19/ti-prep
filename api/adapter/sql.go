package adapter

const SelectCategoryDetails = `
	SELECT pc.category as name,
		   p.difficulty,
		   COUNT(CASE WHEN mastered THEN 1 ELSE NULL END) as mastered,
		   count(*) as total
	FROM problems as p
	LEFT JOIN problem_category as pc
	ON p.id = pc.problem_id
	GROUP BY pc.category, p.difficulty
	ORDER BY category DESC
`
