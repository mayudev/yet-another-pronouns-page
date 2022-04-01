package handlers

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/api"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	userHandler "github.com/mayudev/yet-another-pronouns-page/app/handlers/user"
	"github.com/mayudev/yet-another-pronouns-page/app/models"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

func UserInfo(c *fiber.Ctx) error {
	// Check if token and token_type cookies are present
	token := c.Cookies("token")
	token_type := c.Cookies("token_type")

	if len(token) == 0 || len(token_type) == 0 {
		// Send 401 Unauthorized if any cookie is missing
		return c.Status(401).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Missing cookie",
		})
	}

	if token_type == "discord" {
		userInfo, err := api.FetchDiscordUserInfo(token)
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

				return c.Status(300).JSON(util.ErrorMessage{
					Status:  "error",
					Message: "Internal server error",
				})
			}
		}

		db := database.DB

		user := &models.User{}
		db.Where("platform = ? AND platform_id = ?", "discord", userInfo.ID).First(&user)

		// User is not registered
		if user.ID == uuid.Nil {
			createdUser, err := userHandler.CreateUser("discord", userInfo.ID)

			if err != nil {
				return c.Status(500).JSON(util.ErrorMessage{
					Status:  "error",
					Message: "Couldn't register user",
				})
			}

			return c.JSON(createdUser)
		}

		return c.JSON(user)
	} else {
		return c.Status(400).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Incorrect token_type cookie",
		})
	}
}
