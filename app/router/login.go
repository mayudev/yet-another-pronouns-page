package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/handler/login"
)

func AddLoginRoutes(r fiber.Router) {
	r.Get("discord", login.DiscordLogin)
	r.Get("logout", login.RevokeToken)
}
