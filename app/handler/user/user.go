package userHandler

import (
	"errors"
	"fmt"
	"log"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/api"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

func getUser(by string, query string) (model.UserResponse, int) {
	db := database.DB
	var user model.User
	var pronouns []model.Pronoun

	if by == "username" {
		// Find user in database
		db.Where("LOWER(username) = ?", strings.ToLower(query)).Find(&user)

		// User does not exist
		if user.ID == uuid.Nil {
			return model.UserResponse{}, 404
		}
	} else {
		// By ID
		db.Where("ID = ?", query).Find(&user)

		if user.ID == uuid.Nil {
			return model.UserResponse{}, 404
		}
	}

	// Find user pronouns
	db.Where("user_id = ?", user.ID).Find(&pronouns)

	returnData := model.UserResponse{
		User:     user,
		Pronouns: pronouns,
	}

	return returnData, 0
}

func GetUserByID(c *fiber.Ctx) error {
	query := c.Params("userID")

	returnData, code := getUser("id", query)
	if code != 0 {
		return c.Status(404).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "User not found",
		})
	}

	return c.JSON(returnData)
}

// GetUserByUsername returns user information (auth not required)
func GetUserByUsername(c *fiber.Ctx) error {
	query := c.Params("username")

	// Validate query
	if len(query) == 0 || len(query) > 32 || !util.ValidateUsername(query) {
		return c.Status(400).JSON(
			util.ErrorMessage{
				Status:  "error",
				Message: "Incorrect username",
			},
		)
	}

	returnData, code := getUser("username", query)

	if code != 0 {
		return c.Status(404).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "User not found",
		})
	}

	return c.JSON(returnData)
}

// GetCurrentUser returns information about currently logged user (auth required)
func GetCurrentUser(c *fiber.Ctx) error {
	token := c.Cookies("session_token")

	session, err := middleware.GetSession(token)
	if err != nil {
		// This shouldn't ever happen so don't worry about it (or should it?)
		return c.SendStatus(401)
	}

	if session.Platform == "discord" {
		// TODO remove discord api request
		userInfo, err := api.FetchDiscordUserInfo(session.PlatformToken)
		if err != nil {
			// Check if it's a FetchError
			// If yes, it means API response. Assuming the user is unauthorized
			if err, ok := err.(*util.FetchError); ok {
				return c.Status(401).JSON(util.ErrorMessage{
					Status:  "error",
					Message: fmt.Sprint(err.StatusCode),
				})
			} else {
				// Log the error to console
				log.Println(err)

				return c.Status(500).JSON(util.ErrorMessage{
					Status:  "error",
					Message: "Internal server error",
				})
			}
		}

		db := database.DB

		user := model.User{}
		db.Where("platform = ? AND platform_id = ?", "discord", userInfo.ID).First(&user)

		// User does not exist (should have been registered on login)
		if user.ID == uuid.Nil {
			if err != nil {
				return c.Status(404).JSON(util.ErrorMessage{
					Status:  "error",
					Message: "User not found",
				})
			}
		}

		// Find user pronouns
		var pronouns []model.Pronoun
		db.Where("user_id = ?", user.ID).Find(&pronouns)

		returnData := model.UserResponse{
			User:     user,
			Pronouns: pronouns,
		}

		return c.JSON(returnData)
	} else {
		return c.Status(400).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Incorrect platform",
		})
	}
}

// createUser creates a new User record in database, associated with platform
func CreateUser(platform string, platformId string) (*model.User, error) {
	user := new(model.User)

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
