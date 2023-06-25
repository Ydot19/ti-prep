package app

import (
	"context"
	"github.com/Ydot19/ti-prep/api/interfaces"
	"github.com/Ydot19/ti-prep/api/models"
	"math"
)

type application struct {
	pgRepo interfaces.PostgresRepository
}

var _ interfaces.Application = (*application)(nil)

func NewApplication(postgresRepository interfaces.PostgresRepository) interfaces.Application {
	return &application{
		pgRepo: postgresRepository,
	}
}

func (app *application) GetProblemCategories(ctx context.Context, limit, offset int) ([]models.Category, error) {
	res, err := app.pgRepo.GetCategoryDetails(ctx)
	if err != nil {
		return nil, err
	}

	resMap := make(map[string]map[models.Difficulty]*models.CategoryDetails)
	for _, result := range res {
		categoryDetails, ok := resMap[result.Name]
		if !ok {
			categoryDetails = make(map[models.Difficulty]*models.CategoryDetails)
		}
		categoryDetails[result.Difficulty] = &result
		resMap[result.Name] = categoryDetails
	}

	var resp []models.Category
	for categoryName, detailsMap := range resMap {
		details := models.Category{
			Name: categoryName,
		}

		if easyDetails, ok := detailsMap[models.DIFFICULTY_EASY]; ok {
			details.DifficultyEasy = easyDetails
		}
		if mediumDetails, ok := detailsMap[models.DIFFICULTY_MEDIUM]; ok {
			details.DifficultyMedium = mediumDetails
		}
		if hardDetails, ok := detailsMap[models.DIFFICULTY_HARD]; ok {
			details.DifficultyHard = hardDetails
		}

		resp = append(resp, details)
	}

	size := len(resp)
	start := math.Min(float64(size), float64(offset))
	end := math.Min(start+float64(limit), float64(size))
	return resp[int(start):int(end)], nil
}
