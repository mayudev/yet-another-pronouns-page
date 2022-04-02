package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Pronoun struct {
	gorm.Model `json:"-"`
	User       User      `json:"-"`
	UserID     uuid.UUID `gorm:"type:uuid" json:"-"`
	Pronoun    string    `json:"pronoun"`
	Order      int       `json:"order"`
	Primary    bool
}
