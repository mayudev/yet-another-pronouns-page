package userHandler

import (
	"errors"
	"log"

	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/models"
)

// CreateUser created a new User record in database, associated with platform
func CreateUser(platform string, platformId string) (*models.User, error) {
	user := new(models.User)

	user.ID = uuid.New()
	user.Platform = platform
	user.PlatformID = platformId

	result := database.DB.Create(&user)

	if result.Error != nil {
		log.Println("Couldn't create user", result.Error)
		return user, errors.New("Couldn't create user")
	}

	return user, nil
}
