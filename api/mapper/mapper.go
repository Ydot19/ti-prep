package mapper

import (
	protoModel "github.com/Ydot19/ti-prep/api/codegen/model/v1"
	"github.com/Ydot19/ti-prep/api/models"
)

func CategoryToProto(from *models.Category) *protoModel.Category {
	if from == nil {
		return nil
	}
	return &protoModel.Category{
		Name:   from.Name,
		Easy:   categoryDetailsToCategoryCompletion(from.DifficultyEasy),
		Medium: categoryDetailsToCategoryCompletion(from.DifficultyMedium),
		Hard:   categoryDetailsToCategoryCompletion(from.DifficultyHard),
	}
}

func categoryDetailsToCategoryCompletion(details *models.CategoryDetails) *protoModel.CategoryCompletion {
	if details == nil {
		return nil
	}
	return &protoModel.CategoryCompletion{
		Difficulty: DifficultyToProto(details.Difficulty),
		Mastered:   int32(details.Mastered),
		Total:      int32(details.Total),
	}
}

func DifficultyToProto(from models.Difficulty) protoModel.Difficulty {
	var res protoModel.Difficulty
	switch from {
	case models.DIFFICULTY_EASY:
		res = protoModel.Difficulty_EASY
	case models.DIFFICULTY_MEDIUM:
		res = protoModel.Difficulty_MEDIUM
	case models.DIFFICULTY_HARD:
		res = protoModel.Difficulty_HARD
	default:
		res = protoModel.Difficulty_UNKNOWN
	}
	return res
}
