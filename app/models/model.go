package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Pronoun struct {
	gorm.Model `json:"-"`
	User       User      `json:"-"`
	UserID     uuid.UUID `gorm:"type:uuid" json:"userId"`
	Pronoun    string    `json:"pronoun"`
	Order      int       `json:"order"`
}

type User struct {
	gorm.Model
	ID         uuid.UUID `gorm:"type:uuid"`
	Username   string
	Platform   string
	PlatformID string
}
