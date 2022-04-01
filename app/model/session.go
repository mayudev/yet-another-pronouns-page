package model

import (
	"time"

	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	Token         string `gorm:"primaryKey"`
	Platform      string
	PlatformToken string
	Expires       time.Time
}

// IsExpired returns true if session has expired
func (s *Session) IsExpired() bool {
	return s.Expires.Before(time.Now())
}
