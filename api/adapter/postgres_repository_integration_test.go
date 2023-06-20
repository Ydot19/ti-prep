//go:build integration

package adapter_test

import (
	"context"
	"github.com/Ydot19/ti-prep/api/adapter"
	"github.com/Ydot19/ti-prep/api/fixtures"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestGetCategoryDetails(t *testing.T) {
	// arrange
	ctx := context.Background()
	postgresRepo, err := adapter.NewPostgresRepository(fixtures.PostgresOptions())
	require.NoError(t, err)

	// act
	resp, err := postgresRepo.GetCategoryDetails(ctx)

	// assert
	require.NoError(t, err)
	assert.NotEmpty(t, resp)
}
