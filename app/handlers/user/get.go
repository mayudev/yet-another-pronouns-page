package userHandler

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

type User struct {
	ID       uuid.UUID        `json:"id"`
	Username string           `json:"username"`
	Pronouns []models.Pronoun `json:"pronouns"`
}

func GetUser(c *fiber.Ctx) error {
	db := database.DB
	var user models.User
	var pronouns []models.Pronoun

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

	db.Where("LOWER(username) = ?", strings.ToLower(query)).Find(&user)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{
			"status":  "error",
			"message": "User not found",
			"data":    nil,
		})
	}

	db.Where("user_id = ?", user.ID).Find(&pronouns)

	returnData := User{
		ID:       user.ID,
		Username: user.Username,
		Pronouns: pronouns,
	}

	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Users found",
		"data":    returnData,
	})
}
