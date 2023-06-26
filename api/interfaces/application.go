package interfaces

import (
	"context"
	"github.com/Ydot19/ti-prep/api/models"
)

type Application interface {
	GetProblemCategories(ctx context.Context, limit, offset int) (*models.ProblemCategories, error)
}
