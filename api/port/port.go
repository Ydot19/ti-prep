package port

import (
	"context"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
)

type NotesService struct {
}

func NewNotesService() rpc.NotesService {
	return &NotesService{}
}

func (n *NotesService) GetProblemCategories(ctx context.Context, request *rpc.GetProblemCategoriesRequest) (*rpc.GetProblemCategoriesResponse, error) {
	return nil, nil
}

func (n *NotesService) GetProblemsByCategory(ctx context.Context, request *rpc.GetProblemsByCategoryRequest) (*rpc.GetProblemsByCategoryResponse, error) {
	return nil, nil
}

func (n *NotesService) GetProblemById(ctx context.Context, request *rpc.GetProblemByIdRequest) (*rpc.GetProblemByIdResponse, error) {
	return nil, nil
}

func (n *NotesService) GetProblemNotesById(ctx context.Context, request *rpc.GetProblemNotesByIdRequest) (*rpc.GetProblemNotesByIdResponse, error) {
	return nil, nil
}

func (n *NotesService) GetImplementationNotesById(ctx context.Context, request *rpc.GetImplementationNotesByIdRequest) (*rpc.GetImplementationNotesByIdResponse, error) {
	return nil, nil
}

func (n *NotesService) CreateOrUpdateProblemDetails(ctx context.Context, request *rpc.CreateOrUpdateProblemDetailsRequest) (*rpc.CreateOrUpdateProblemDetailsResponse, error) {
	return nil, nil
}

func (n *NotesService) CreateOrUpdateProblemNotes(ctx context.Context, request *rpc.CreateOrUpdateProblemNotesRequest) (*rpc.CreateOrUpdateProblemNotesResponse, error) {
	return nil, nil
}

func (n *NotesService) GetAlgorithmCategories(ctx context.Context, request *rpc.GetAlgorithmCategoriesRequest) (*rpc.GetAlgorithmCategoriesResponse, error) {
	return nil, nil
}

func (n *NotesService) GetAlgorithmsByCategory(ctx context.Context, request *rpc.GetAlgorithmsByCategoryRequest) (*rpc.GetAlgorithmsByCategoryResponse, error) {
	return nil, nil
}

func (n *NotesService) CreateOrUpdateAlgorithm(ctx context.Context, request *rpc.CreateOrUpdateAlgorithmRequest) (*rpc.CreateOrUpdateAlgorithmResponse, error) {
	return nil, nil
}
