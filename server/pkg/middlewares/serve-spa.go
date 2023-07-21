package middlewares

import (
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pterm/pterm"
)

func ServeSPA(webAppPath string) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
		pterm.Info.Print("Serving SPA from ", webAppPath)
		subFs := echo.MustSubFS(e.Router.Filesystem, webAppPath)
		e.Router.GET("/*", apis.StaticDirectoryHandler(subFs, false))
		originalErrorHandler := e.Router.HTTPErrorHandler
		e.Router.HTTPErrorHandler = func(c echo.Context, err error) {
			if c.Path() == "/*" && err == echo.ErrNotFound {
				err = c.FileFS("index.html", subFs)
			}
			originalErrorHandler(c, err)
		}
		return nil
	}
}
