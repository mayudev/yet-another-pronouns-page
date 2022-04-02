package middleware

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

// NewSession generates a new token and creates a new session using it
func NewSession(platform string, platformToken string, userID uuid.UUID) (string, time.Time, error) {
	// Generate secure token
	b := make([]byte, 24)
	_, err := rand.Read(b)

	if err != nil {
		return "", time.Time{}, err
	}

	sessionToken := hex.EncodeToString(b)

	// Set expiry date
	expiresAt := time.Now().Add(120 * time.Minute)

	// Add session to database
	session := model.Session{
		Token:         sessionToken,
		UserID:        userID,
		Platform:      platform,
		PlatformToken: platformToken,
		Expires:       expiresAt,
	}

	result := database.DB.Create(&session)
	if result.Error != nil {
		return "", time.Time{}, err
	}

	return sessionToken, expiresAt, nil
}

// GetSession looks for associated session
func GetSession(sessionToken string) (model.Session, error) {
	var session model.Session

	result := database.DB.First(&session, "token = ?", sessionToken)

	if result.RowsAffected != 1 {
		return model.Session{}, errors.New("Not found")
	}

	if session.IsExpired() {
		// Delete from database
		database.DB.Unscoped().Delete(&session)

		return model.Session{}, errors.New("Token expired")
	}

	return session, nil
}

// DestroySessions destroys a session and returns it
func DestroySession(sessionToken string) (model.Session, error) {
	var session model.Session

	result := database.DB.First(&session, "token = ?", sessionToken)

	if result.RowsAffected != 1 {
		return model.Session{}, errors.New("Not found")
	}

	database.DB.Unscoped().Delete(&session)

	return session, nil
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
