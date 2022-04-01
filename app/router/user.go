package router

import (
	"github.com/gofiber/fiber/v2"
	userHandler "github.com/mayudev/yet-another-pronouns-page/app/handlers/user"
)

func SetupUserRoutes(router fiber.Router) {
	user := router.Group("/user")

	// Get a user
	user.Get("/:userId", userHandler.GetUser)
}
