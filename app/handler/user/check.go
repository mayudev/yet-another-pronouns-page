package userHandler

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

func CheckUsernameAvailable(c *fiber.Ctx) error {
	query := c.Params("username")

	if len(query) < 2 || len(query) > 32 || !util.ValidateUsername(query) {
		return c.Status(400).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Incorrect username",
		})
	}

	var conflict []model.User
	database.DB.Where("LOWER(username) = ?", strings.ToLower(query)).Find(&conflict)

	if len(conflict) > 0 {
		return c.Status(409).JSON(
			util.ErrorMessage{
				Status:  "error",
				Message: "Username taken",
			},
		)
	}

	return c.JSON(
		util.ErrorMessage{
			Status:  "success",
			Message: "Username available",
		},
	)

}
