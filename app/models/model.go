package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Pronoun struct {
	gorm.Model
	Pronoun string
	Order   int
}

type User struct {
	gorm.Model
	UserID   uuid.UUID `gorm:"type:uuid"`
	Username string
	Platform string
}
