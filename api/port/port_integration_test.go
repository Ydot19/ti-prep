package port_test

import (
	"context"
	v1 "github.com/Ydot19/ti-prep/api/codegen/model/v1"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
	"github.com/Ydot19/ti-prep/api/fixtures"
	"github.com/Ydot19/ti-prep/api/port"
	"github.com/stretchr/testify/suite"
	"sort"
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
	var limit int32 = 5
	req := rpc.GetProblemCategoriesRequest{
		Limit:  limit,
		Offset: 0,
	}
	// act
	resp, err := suite.service.GetProblemCategories(suite.ctx, &req)
	// assert
	suite.Require().NoError(err)
	suite.True(resp.HasNext)
	suite.LessOrEqual(len(resp.Details), int(limit))
	for _, cat := range resp.Details {
		if cat.Easy != nil {
			suite.Equal(v1.Difficulty_EASY, cat.Easy.Difficulty)
		}

		if cat.Medium != nil {
			suite.Equal(v1.Difficulty_MEDIUM, cat.Medium.Difficulty)
		}

		if cat.Hard != nil {
			suite.Equal(v1.Difficulty_HARD, cat.Hard.Difficulty)
		}
	}

	suite.True(sort.SliceIsSorted(resp.Details, func(i, j int) bool {
		return resp.Details[i].Name < resp.Details[j].Name
	}))
}

func (suite *PortIntegrationSuite) TestGetProblemCategories_HasNext() {
	// arrange
	var Limit int32 = 25
	reqA := rpc.GetProblemCategoriesRequest{
		Limit:  Limit,
		Offset: 0,
	}

	reqB := rpc.GetProblemCategoriesRequest{
		Limit:  Limit * 10, // there is less than 100 categories
		Offset: 10,
	}

	// act & assert
	respA, err := suite.service.GetProblemCategories(suite.ctx, &reqA)
	suite.Require().NoError(err)
	suite.True(respA.HasNext)

	respB, err := suite.service.GetProblemCategories(suite.ctx, &reqB)
	suite.Require().NoError(err)
	suite.False(respB.HasNext)
}
