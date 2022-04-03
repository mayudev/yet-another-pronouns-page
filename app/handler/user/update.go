package userHandler

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

type updateUser struct {
	Username string
	Bio      string
	Pronouns []model.Pronoun
}

func UpdateUser(c *fiber.Ctx) error {
	token := c.Cookies("session_token")
	wasModified := false

	session, err := middleware.GetSession(token)
	if err != nil {
		// This shouldn't ever happen so don't worry about it (or should it?)
		return c.SendStatus(401)
	}

	// Find currently logged user in DB
	user := model.User{}
	database.DB.Where("id = ?", session.UserID).First(&user)

	// Somehow, user is not in the database
	if user.ID == uuid.Nil {
		return c.Status(404).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "User not found",
		})
	}

	var updateUserData updateUser
	err = c.BodyParser(&updateUserData)
	if err != nil {
		return c.Status(400).JSON(util.ErrorMessage{
			Status:  "error",
			Message: "Bad request",
		})
	}

	// Username is to be updated
	if len(updateUserData.Username) > 1 {
		// Validate username
		if len(updateUserData.Username) > 32 ||
			!util.ValidateUsername(updateUserData.Username) {
			return c.Status(400).JSON(
				util.ErrorMessage{
					Status:  "error",
					Message: "Incorrect username",
				},
			)
		}

		// Check for conflicts
		var conflict []model.User
		database.DB.Where("LOWER(username) = ?", strings.ToLower(updateUserData.Username)).Find(&conflict)

		if len(conflict) > 0 {
			return c.Status(400).JSON(
				util.ErrorMessage{
					Status:  "error",
					Message: "Username taken",
				},
			)
		}

		// No conflict, update username
		user.Username = updateUserData.Username
		wasModified = true
	}

	// Bio is to be updated
	if len(updateUserData.Bio) > 0 {
		// Check max bio length
		if len(updateUserData.Bio) > 1000 {
			return c.Status(413).JSON(
				util.ErrorMessage{
					Status:  "error",
					Message: "Bio too long",
				},
			)
		}

		user.Bio = updateUserData.Bio
		wasModified = true
	}

	// Pronouns are to be updated
	var pronouns []model.Pronoun

	if len(updateUserData.Pronouns) > 0 {
		// Validate all passed data

		for i, k := range updateUserData.Pronouns {
			if k.Order != i || len(k.Pronoun) == 0 || len(k.Pronoun) > 32 || k.Type > 3 {
				return c.Status(400).JSON(
					util.ErrorMessage{
						Status:  "error",
						Message: "Incorrect order",
					},
				)
			}

			k.UserID = user.ID
			pronouns = append(pronouns, k)
		}

		// Delete all existing pronouns
		var oldPronouns model.Pronoun
		database.DB.Where("user_id = ?", user.ID).Unscoped().Delete(&oldPronouns)

		// Replace with new pronouns
		database.DB.Create(&pronouns)
	}

	// Update if user settings were modified (not just pronouns)
	if wasModified {
		database.DB.Save(&user)
	}

	returnData := model.UserResponse{
		User:     user,
		Pronouns: pronouns,
	}
	return c.Status(200).JSON(returnData)
}
