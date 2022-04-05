package userHandler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/handler/login"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

func DeleteUser(c *fiber.Ctx) error {
	token := c.Cookies("session_token")

	session, err := middleware.DestroySession(token)
	if err != nil {
		// This shouldn't ever happen so don't worry about it (or should it?)
		return c.SendStatus(401)
	}

	if session.Platform == "discord" {
		// Try to log the user out
		// It will fail if the Discord token is not valid
		err = login.DiscordLogout(session.PlatformToken)

		if err != nil {
			return c.Status(401).JSON(util.ErrorMessage{
				Status:  "error",
				Message: "Session has expired",
			})
		}
	} else {
		return c.Status(400).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Incorrect platform",
		})
	}

	// Delete user from database

	// Delete related pronouns
	database.DB.Unscoped().Where("user_id = ?", session.UserID).Delete(&model.Pronoun{})

	// Delete user
	result := database.DB.Unscoped().Where("id = ?", session.UserID).Delete(&model.User{})

	if result.RowsAffected == 0 {
		return c.Status(500).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Internal server error",
		})
	}

	return c.Status(200).JSON(util.ErrorMessage{
		Status:  "success",
		Message: "User deleted",
	})
}
