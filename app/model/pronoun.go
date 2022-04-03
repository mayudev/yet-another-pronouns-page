package model

import (
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
	"gorm.io/gorm"
)

type Pronoun struct {
	gorm.Model `json:"-"`
	User       User             `json:"-"`
	UserID     uuid.UUID        `gorm:"type:uuid" json:"-"`
	Pronoun    string           `json:"pronoun"`
	Order      int              `json:"order"`
	Type       util.PronounType `json:"type"`
}
