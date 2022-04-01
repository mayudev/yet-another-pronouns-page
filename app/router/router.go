package router

import "github.com/gofiber/fiber/v2"

func SetupRoutes(app *fiber.App) {
	// Public routes
	api := app.Group("api/v1")
	AddUserRoutes(api)

	// Login API
	login := app.Group("api/login")
	AddLoginRoutes(login)

	// Login callback API
	callback := app.Group("api/callback")
	AddCallbackRoutes(callback)
}
