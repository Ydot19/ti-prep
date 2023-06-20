package mapper

import (
	protoModel "github.com/Ydot19/ti-prep/api/codegen/model/v1"
	"github.com/Ydot19/ti-prep/api/fixtures"
	"github.com/Ydot19/ti-prep/api/models"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCategoryToProto(t *testing.T) {
	// arrange
	const categoryName = "random tree"
	fromModel := fixtures.SampleCategory(categoryName)
	// act
	toProto := CategoryToProto(fromModel)
	// assert
	assert.Equal(t, categoryName, toProto.Name)
	assert.Equal(t, fromModel.DifficultyEasy.Mastered, int(toProto.Easy.Mastered))
	assert.Equal(t, fromModel.DifficultyEasy.Total, int(toProto.Easy.Total))

	assert.Equal(t, fromModel.DifficultyMedium.Mastered, int(toProto.Medium.Mastered))
	assert.Equal(t, fromModel.DifficultyMedium.Total, int(toProto.Medium.Total))

	assert.Equal(t, fromModel.DifficultyHard.Mastered, int(toProto.Hard.Mastered))
	assert.Equal(t, fromModel.DifficultyHard.Total, int(toProto.Hard.Total))
}

func TestDifficultyToProto(t *testing.T) {
	// arrange
	type testCase struct {
		description    string
		input          models.Difficulty
		expectedOutput protoModel.Difficulty
	}

	for _, scenario := range []testCase{
		{
			description:    "unknown difficulty",
			input:          models.DIFFICULTY_UNKNOWN,
			expectedOutput: protoModel.Difficulty_UNKNOWN,
		},
		{
			description:    "easy difficulty",
			input:          models.DIFFICULTY_EASY,
			expectedOutput: protoModel.Difficulty_EASY,
		},
		{
			description:    "medium difficulty",
			input:          models.DIFFICULTY_MEDIUM,
			expectedOutput: protoModel.Difficulty_MEDIUM,
		},
		{
			description:    "hard difficulty",
			input:          models.DIFFICULTY_HARD,
			expectedOutput: protoModel.Difficulty_HARD,
		},
	} {
		t.Run(scenario.description, func(t *testing.T) {
			// act
			actual := DifficultyToProto(scenario.input)
			// assert
			assert.Equal(t, scenario.expectedOutput, actual)
		})
	}
}
