package port

import (
	"fmt"
	"github.com/Ydot19/ti-prep/api/adapter"
	"github.com/Ydot19/ti-prep/api/app"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
	"github.com/Ydot19/ti-prep/pkg/postgres"
)

type Options struct {
	PostgresOpts postgres.Options
}

func Factory(opts *Options) (rpc.NotesService, error) {
	db, err := adapter.NewDBConnection(&opts.PostgresOpts)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	pgRepoFactory := adapter.NewRepositoryFactoryFromDB(db)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize postgres repository: %w", err)
	}
	application := app.NewApplication(pgRepoFactory)
	service := NewNotesService(application)
	return service, err
}
