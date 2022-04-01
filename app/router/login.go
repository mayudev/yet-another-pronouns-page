package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/handlers"
)

func SetupLoginRouter(router fiber.Router) {
	discord := router.Group("/discord")

	// Login
	discord.Get("/login", handlers.DiscordLogin)

	// Callback
	discord.Get("/callback", handlers.DiscordCallback)

	// Logout
	discord.Get("/logout", handlers.DiscordLogout)
}
