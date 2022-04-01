package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model `json:"-"`
	ID         uuid.UUID `gorm:"type:uuid" json:"id"`
	Username   string    `json:"username"`
	Platform   string    `json:"-"`
	PlatformID string    `json:"-"`
}

type UserResponse struct {
	User
	Pronouns []Pronoun `json:"pronouns"`
}
