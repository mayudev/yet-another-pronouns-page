package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/handler/login/discord"
)

func AddCallbackRoutes(r fiber.Router) {
	r.Get("discord", discord.DiscordCallback)
}
