package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/handlers"
)

func SetupUserRoutes(router fiber.Router) {
	user := router.Group("/user")

	// Get a user
	user.Get("/:userId", handlers.GetUser)
}
