package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Pronoun struct {
	gorm.Model
	User    User
	UserID  uuid.UUID `gorm:"type:uuid"`
	Pronoun string
	Order   int
}

type User struct {
	gorm.Model
	ID         uuid.UUID `gorm:"type:uuid"`
	Username   string
	Platform   string
	PlatformID string
}
