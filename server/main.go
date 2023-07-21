package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pterm/pterm"
	"kinderspielstadt.de/core-server/pkg/middlewares"
	"kinderspielstadt.de/core-server/pkg/utils"
)

func main() {
	pterm.Info.Println("Loading environment variables...")
	utils.LoadEnv()
	pterm.Info.Println("Starting PocketBase server...")
	app := pocketbase.New()

	app.OnBeforeServe().Add(middlewares.ServeSPA(utils.GetEnv("WEBAPP", "./webapp")))

	if err := app.Start(); err != nil {
		pterm.Fatal.Println(err)
	}

}
