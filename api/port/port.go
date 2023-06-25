package port

import (
	"context"
	protoModel "github.com/Ydot19/ti-prep/api/codegen/model/v1"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
	"github.com/Ydot19/ti-prep/api/interfaces"
	"github.com/Ydot19/ti-prep/api/mapper"
)

type NotesService struct {
	app interfaces.Application
}

func NewNotesService(app interfaces.Application) rpc.NotesService {
	return &NotesService{
		app: app,
	}
}

func (n *NotesService) GetProblemCategories(ctx context.Context, req *rpc.GetProblemCategoriesRequest) (*rpc.GetProblemCategoriesResponse, error) {
	result, err := n.app.GetProblemCategories(ctx, int(req.Limit), int(req.Offset))
	if err != nil {
		return nil, err
	}
	var resp []*protoModel.Category
	for _, category := range result {
		protoCategory := mapper.CategoryToProto(&category)
		resp = append(resp, protoCategory)
	}

	return &rpc.GetProblemCategoriesResponse{
		Details: resp,
	}, nil
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
