package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/handler/login"
	"github.com/mayudev/yet-another-pronouns-page/app/handler/login/discord"
)

func AddLoginRoutes(r fiber.Router) {
	r.Get("discord", discord.DiscordLogin)
	r.Get("logout", login.RevokeToken)
}
