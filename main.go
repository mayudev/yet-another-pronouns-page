package main

import "github.com/mayudev/yet-another-pronouns-page/app"

func main() {
	app := app.App{}
	app.Start(8080)
}
