package utils

import (
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/pterm/pterm"
)

// GetEnv returns the value of the environment variable named by the key.
// If the env key is not present, it returns the default value.
func GetEnv(key, def string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return def
}

func LoadEnv() {
	err := godotenv.Load("../.env")
	if err != nil {
		pterm.Info.Println("No .env file found. Proceeding...")
	}

	// Add env variables without "VITE_" prefix.
	for _, e := range os.Environ() {
		pair := strings.Split(e, "=")
		if strings.HasPrefix(pair[0], "VITE_") {
			os.Setenv(pair[0][5:], pair[1])
		}
	}
}
