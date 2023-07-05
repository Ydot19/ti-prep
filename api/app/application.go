package app

import (
	"context"
	"github.com/Ydot19/ti-prep/api/interfaces"
	"github.com/Ydot19/ti-prep/api/models"
	"math"
	"sort"
)

type application struct {
	pgRepo interfaces.PostgresRepositoryFactory
}

var _ interfaces.Application = (*application)(nil)

func NewApplication(pgRepo interfaces.PostgresRepositoryFactory) interfaces.Application {
	return &application{
		pgRepo: pgRepo,
	}
}

// GetProblemCategories returns the list of problem categories given some offset
func (app *application) GetProblemCategories(ctx context.Context, limit, offset int) (*models.ProblemCategories, error) {
	res, err := app.pgRepo.Autocommit().GetCategoryDetails(ctx)
	if err != nil {
		return nil, err
	}

	resNameIdx := make(map[string]int)
	counter := 0
	var categories []models.Category
	for _, categoryDetails := range res {
		temp := categoryDetails
		var category models.Category
		var itemIdx int
		if idx, ok := resNameIdx[categoryDetails.Name]; ok {
			category = categories[idx]
			itemIdx = idx
		} else {
			category = models.Category{
				Name: categoryDetails.Name,
			}
			categories = append(categories, category)
			resNameIdx[categoryDetails.Name] = counter
			itemIdx = counter
			counter += 1
		}

		if temp.Difficulty == models.DIFFICULTY_EASY {
			category.DifficultyEasy = &temp
		}

		if temp.Difficulty == models.DIFFICULTY_MEDIUM {
			category.DifficultyMedium = &temp
		}

		if temp.Difficulty == models.DIFFICULTY_HARD {
			category.DifficultyHard = &temp
		}
		categories[itemIdx] = category
	}

	/*
		Maps are not guaranteed to be sorted. This behavior of allowing sorting on arrays
		was observed un-documented behavior that is not guaranteed to exist.
	*/
	sort.SliceStable(categories, func(i, j int) bool {
		return categories[i].Name < categories[j].Name
	})

	size := len(categories)
	start := math.Min(float64(size), float64(offset))
	end := math.Min(start+float64(limit), float64(size))

	var hasNext bool
	if int(end) < size {
		hasNext = true
	}

	resp := &models.ProblemCategories{
		Details: categories[int(start):int(end)],
		HasNext: hasNext,
	}
	return resp, nil
}
