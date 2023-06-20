package models

type CategoryDetails struct {
	Name       string     `db:"name"`
	Difficulty Difficulty `db:"difficulty"`
	Mastered   int        `db:"mastered"`
	Total      int        `db:"total"`
}

type Category struct {
	Name             string
	DifficultyEasy   *CategoryDetails
	DifficultyMedium *CategoryDetails
	DifficultyHard   *CategoryDetails
}
