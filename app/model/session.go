package model

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	Token         string    `gorm:"primaryKey"`
	UserID        uuid.UUID `gorm:"type:uuid"`
	Platform      string
	PlatformToken string
	Expires       time.Time
}

// IsExpired returns true if session has expired
func (s *Session) IsExpired() bool {
	return s.Expires.Before(time.Now())
}
