package app

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	"github.com/mayudev/yet-another-pronouns-page/app/router"
)

type App struct {
}

func (a *App) Start(port int) {
	// Start a new fiber app
	app := fiber.New()

	// Connect to the database
	database.ConnectDB()

	// Setup the API router
	router.SetupRoutes(app)

	// Serve web interface
	app.Static("/", "./build")
	app.Static("/*", "./build")

	// Listen on specified port
	app.Listen(":" + strconv.Itoa(port))
}
