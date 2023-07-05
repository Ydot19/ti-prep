//go:build unit

package data_structures

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestSetInteger(t *testing.T) {
	// arrange
	intSet := NewSet[int]()

	// set is empty
	assert.Equal(t, 0, intSet.Size())
	assert.Equal(t, 0, len(intSet.Items()))

	// add items
	firstItem := 1
	secondItem := 2
	thirdItem := 3
	intSet.Add(firstItem).Add(secondItem).Add(thirdItem)

	assert.Equal(t, 3, intSet.Size())

	// add duplication item
	intSet.Add(firstItem)
	assert.Equal(t, 3, intSet.Size())

	// check has
	assert.True(t, intSet.Has(firstItem))
	assert.False(t, intSet.Has(39))

	// check delete
	assert.True(t, intSet.Delete(firstItem)) // exists in set
	assert.Equal(t, 2, intSet.Size())
	assert.False(t, intSet.Has(firstItem))

	assert.False(t, intSet.Delete(39)) // does not exist in set
	assert.Equal(t, 2, intSet.Size())

	// check clear
	intSet.Clear()
	assert.Equal(t, 0, intSet.Size())
}
