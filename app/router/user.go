package router

import (
	"github.com/gofiber/fiber/v2"
	userHandler "github.com/mayudev/yet-another-pronouns-page/app/handler/user"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
)

func AddUserRoutes(r fiber.Router) {
	// Get user by username
	r.Get("/user/:username", userHandler.GetUserByUsername)

	// Get user by ID
	r.Get("/id/:userID", userHandler.GetUserByID)

	// Get current user
	r.Get("/me", middleware.SessionMiddleware, userHandler.GetCurrentUser)

	// Update current user
	r.Post("/me", middleware.SessionMiddleware, userHandler.UpdateUser)
}
