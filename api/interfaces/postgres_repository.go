package interfaces

import (
	"context"
	"github.com/Ydot19/ti-prep/api/models"
)

type PostgresRepository interface {
	GetCategoryDetails(ctx context.Context) ([]models.CategoryDetails, error)
}
