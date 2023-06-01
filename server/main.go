package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pterm/pterm"
	"kinderspielstadt.de/core-server/pkg/utils"
)

func main() {
	pterm.Info.Println("Loading environment variables...")
	utils.LoadEnv()
	pterm.Info.Println("Starting PocketBase server...")
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		pterm.Fatal.Println(err)
	}

}
