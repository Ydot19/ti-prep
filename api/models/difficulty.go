package models

import (
	"database/sql/driver"
	"fmt"
	"strings"
)

type Difficulty int8

const (
	DIFFICULTY_UNKNOWN Difficulty = iota
	DIFFICULTY_EASY
	DIFFICULTY_MEDIUM
	DIFFICULTY_HARD
)

func (d Difficulty) String() string {
	str := "unknown"
	switch d {
	case DIFFICULTY_EASY:
		str = "easy"
	case DIFFICULTY_MEDIUM:
		str = "medium"
	case DIFFICULTY_HARD:
		str = "hard"
	}
	return str
}

func (d *Difficulty) Scan(value any) error {
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("value not of type string")
	}
	switch strings.ToLower(str) {
	case DIFFICULTY_EASY.String():
		*d = DIFFICULTY_EASY
	case DIFFICULTY_MEDIUM.String():
		*d = DIFFICULTY_MEDIUM
	case DIFFICULTY_HARD.String():
		*d = DIFFICULTY_HARD
	default:
		return fmt.Errorf("failed to scan value to enum (val=%v)", value)
	}

	return nil
}

func (d Difficulty) Value() (driver.Value, error) {
	return d.String(), nil
}
