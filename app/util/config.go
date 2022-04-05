package util

// Config get environment variables
import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

const DISCORD_API_ENDPOINT = "https://discord.com/api"

func GetEnv(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Error loading .env file")
	}

	return os.Getenv(key)
}

func GetDiscordRedirectUri() string {
	return GetEnv("URL") + "/api/callback/discord"
}
