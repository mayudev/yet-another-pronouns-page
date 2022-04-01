package router

import (
	"github.com/gofiber/fiber/v2"
	userHandler "github.com/mayudev/yet-another-pronouns-page/app/handler/user"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
)

func AddUserRoutes(r fiber.Router) {
	r.Get("/user/:username", userHandler.GetUserByUsername)
	r.Get("/id/:userID", userHandler.GetUserByID)
	r.Get("/me", middleware.SessionMiddleware, userHandler.GetCurrentUser)
}
