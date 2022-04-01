package handlers

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/models"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

type Response struct {
	Status  string
	Message string
	Data    interface{}
}

func GetUser(c *fiber.Ctx) error {
	db := database.DB
	var user models.User

	query := c.Params("userId")

	if len(query) == 0 || len(query) > 32 || !util.ValidateUsername(query) {
		return c.Status(400).JSON(
			Response{
				Status:  "error",
				Message: "username incorrect",
				Data:    nil,
			},
		)
	}

	db.Where("username = ?", strings.ToLower(query)).Find(&user)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
			"data":    nil,
		})
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Users found",
		"data":    user,
	})
}
