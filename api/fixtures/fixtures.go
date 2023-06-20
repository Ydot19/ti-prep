package fixtures

import (
	"github.com/Ydot19/ti-prep/api/models"
	"github.com/Ydot19/ti-prep/pkg/postgres"
)

func PostgresOptions() *postgres.Options {
	return &postgres.Options{
		Host:                         "localhost",
		Port:                         5432,
		Username:                     "coder",
		Password:                     "codes",
		DBName:                       "prep",
		MaxOpenConns:                 20,
		MaxIdleConns:                 10,
		MaxConnectionLifetimeSeconds: 60,
		MaxConnectionIdleSeconds:     20,
		PingTimeoutSeconds:           1,
	}
}

func SampleCategory(categoryName string) *models.Category {
	return &models.Category{
		Name: categoryName,
		DifficultyEasy: &models.CategoryDetails{
			Name:       categoryName,
			Difficulty: models.DIFFICULTY_EASY,
			Mastered:   10,
			Total:      240,
		},
		DifficultyMedium: &models.CategoryDetails{
			Name:       categoryName,
			Difficulty: models.DIFFICULTY_MEDIUM,
			Mastered:   2,
			Total:      120,
		},
		DifficultyHard: &models.CategoryDetails{
			Name:       categoryName,
			Difficulty: models.DIFFICULTY_HARD,
			Mastered:   0,
			Total:      12,
		},
	}
}
