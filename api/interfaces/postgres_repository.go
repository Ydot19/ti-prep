package interfaces

import (
	"context"
	"github.com/Ydot19/ti-prep/api/models"
	"github.com/Ydot19/ti-prep/pkg/sqlstore"
)

type PostgresRepositoryFactory interface {
	Autocommit() PostgresRepository
	WithTx(ctx context.Context, cb func(PostgresRepository, sqlstore.Transaction) error) error
}

type PostgresRepository interface {
	GetCategoryDetails(ctx context.Context) ([]models.CategoryDetails, error)
}
