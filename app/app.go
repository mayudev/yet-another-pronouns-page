package app

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type App struct {
}

func (a *App) Start(port int) {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("hello go")
	})

	app.Listen(":" + strconv.Itoa(port))
}
