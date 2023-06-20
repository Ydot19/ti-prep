package port_test

import (
	"context"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
	"github.com/Ydot19/ti-prep/api/fixtures"
	"github.com/Ydot19/ti-prep/api/port"
	"github.com/stretchr/testify/suite"
	"testing"
)

type PortIntegrationSuite struct {
	suite.Suite
	service rpc.NotesService
	ctx     context.Context
}

func TestPortIntegrationSuite(t *testing.T) {
	suite.Run(t, new(PortIntegrationSuite))
}

func (suite *PortIntegrationSuite) SetupSuite() {
	ctx := context.Background()
	suite.ctx = ctx
	pgOpts := fixtures.PostgresOptions()
	service, err := port.Factory(&port.Options{
		PostgresOpts: *pgOpts,
	})
	suite.Require().NoError(err)
	suite.service = service
}

func (suite *PortIntegrationSuite) TestGetProblemCategories() {
	// arrange
	var limit int32 = 10
	req := rpc.GetProblemCategoriesRequest{
		Limit: limit,
	}
	// act
	resp, err := suite.service.GetProblemCategories(suite.ctx, &req)
	// assert
	suite.Require().NoError(err)
	suite.LessOrEqual(len(resp.Details), int(limit))
}
