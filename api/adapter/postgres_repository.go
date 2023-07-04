package adapter

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/Ydot19/ti-prep/api/interfaces"
	"github.com/Ydot19/ti-prep/api/models"
	"github.com/Ydot19/ti-prep/pkg/sqlstore"
)

type PostgresRepository struct {
	store sqlstore.Transaction
}

func NewPostgresRepository(tx sqlstore.Transaction) interfaces.PostgresRepository {
	return &PostgresRepository{
		store: tx,
	}
}

func (repo *PostgresRepository) GetCategoryDetails(ctx context.Context) ([]models.CategoryDetails, error) {
	rows, err := repo.store.CurrentTx().QueryxContext(ctx, SelectCategoryDetails)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return []models.CategoryDetails{}, nil
		}
		return nil, fmt.Errorf("selecting category details from database failed: %w", err)
	}
	defer rows.Close()

	var results []models.CategoryDetails
	loopStopper := 2_000 // no chance there are more than 2k categories, so this is an infinite loop stooper
	for rows.Next() && loopStopper > 0 {
		var res models.CategoryDetails
		if err := rows.StructScan(&res); err != nil {
			return nil, fmt.Errorf("failed to scan row to struct: %w", err)
		}
		results = append(results, res)
		loopStopper--
	}

	return results, nil
}
