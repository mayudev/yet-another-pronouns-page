package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

type Session struct {
	Platform      string
	PlatformToken string
	Expiry        time.Time
}

// IsExpired returns true if session has expired
func (s *Session) IsExpired() bool {
	return s.Expiry.Before(time.Now())
}

// Sessions stores active sessions
var Sessions = map[string]Session{}

// NewSession generates a new token and creates a new session using it
func NewSession(platform string, platformToken string) (string, time.Time, error) {
	// Generate secure token
	b := make([]byte, 32)
	_, err := rand.Read(b)

	if err != nil {
		return "", time.Time{}, err
	}

	sessionToken := hex.EncodeToString(b)

	// Set expiry date
	expiresAt := time.Now().Add(120 * time.Minute)

	Sessions[sessionToken] = Session{
		Platform:      platform,
		PlatformToken: platformToken,
		Expiry:        expiresAt,
	}

	return sessionToken, expiresAt, nil
}

// GetSession looks for associated session
func GetSession(sessionToken string) (Session, error) {
	v, ok := Sessions[sessionToken]

	if !ok {
		return Session{}, errors.New("Not found")
	}

	if v.IsExpired() {
		delete(Sessions, sessionToken)
		return Session{}, errors.New("Token expired")
	}

	return v, nil
}

// SessionMiddleware verifies if user is currently authenticated
func SessionMiddleware(c *fiber.Ctx) error {
	token := c.Cookies("session_token")

	if len(token) == 0 {
		return c.Status(401).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "User not authenticated",
		})
	}

	// Try to find a valid session in memory
	_, err := GetSession(token)

	if err != nil {
		return c.Status(401).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Session expired",
		})
	}

	return c.Next()
}
