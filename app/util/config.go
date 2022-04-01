package util

// Config get environment variables
import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

const DISCORD_API_ENDPOINT = "https://discord.com/api"

// TODO move to env
const DISCORD_REDIRECT_URI = "http://localhost:8000/api/callback/discord"

func GetEnv(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Error loading .env file")
	}

	return os.Getenv(key)
}
