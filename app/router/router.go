package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/mayudev/yet-another-pronouns-page/app/handlers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api", logger.New())

	// Setup /api/me route
	api.Get("/me", handlers.UserInfo)

	SetupUserRoutes(api)
	SetupLoginRouter(api)

}
