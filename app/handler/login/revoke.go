package login

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

func RevokeToken(c *fiber.Ctx) error {
	token := c.Cookies("session_token")

	// If there's no token, the user is already logged out
	if len(token) == 0 {
		return c.Redirect("/")
	}

	session, err := middleware.GetSession(token)

	// Token is already revoked (probably)
	if err != nil {
		return c.Redirect("/")
	}

	// Revoke associated Discord token
	DiscordLogout(session.PlatformToken)

	return c.Redirect("/")
}

func DiscordLogout(token string) error {
	clientId := util.GetEnv("DISCORD_ID")
	clientSecret := util.GetEnv("DISCORD_SECRET")

	params := url.Values{}
	params.Add("client_id", clientId)
	params.Add("client_secret", clientSecret)
	params.Add("token", token)

	resp, err := http.PostForm(util.DISCORD_API_ENDPOINT+"/oauth2/token/revoke", params)

	if err != nil {
		log.Println("Request to Discord failed:", err)
		return err
	}

	defer resp.Body.Close()
	_, err = ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println("Reading body failed:", err)
		return err
	}

	return nil
}
