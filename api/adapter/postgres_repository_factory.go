package adapter

import (
	"context"
	"github.com/Ydot19/ti-prep/api/interfaces"
	"github.com/Ydot19/ti-prep/pkg/postgres"
	"github.com/Ydot19/ti-prep/pkg/sqlstore"
	"github.com/jmoiron/sqlx"
)

type PostgresRepositoryFactory struct {
	Store sqlstore.Store
}

func NewDBConnection(opts *postgres.Options) (*sqlx.DB, error) {
	db, err := postgres.NewConnection(opts)
	if err != nil {
		return nil, err
	}
	return db, nil
}

func NewRepositoryFactoryFromDB(db *sqlx.DB) interfaces.PostgresRepositoryFactory {
	return &PostgresRepositoryFactory{
		Store: sqlstore.NewStore(db),
	}
}

func (f *PostgresRepositoryFactory) Autocommit() interfaces.PostgresRepository {
	return NewPostgresRepository(f.Store.CurrentTx())
}

func (f *PostgresRepositoryFactory) WithTx(ctx context.Context, cb func(interfaces.PostgresRepository, sqlstore.Transaction) error) error {
	return sqlstore.WithTx(ctx, f.Store, func(transaction sqlstore.Transaction) error {
		return cb(NewPostgresRepository(transaction), transaction)
	})
}
