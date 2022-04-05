package discord

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mayudev/yet-another-pronouns-page/app/api"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
	userHandler "github.com/mayudev/yet-another-pronouns-page/app/handler/user"
	"github.com/mayudev/yet-another-pronouns-page/app/middleware"
	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
	TokenType    string `json:"token_type"`
}

// DiscordLogin Redirect user to Discord login page
func DiscordLogin(c *fiber.Ctx) error {
	clientId := util.GetEnv("DISCORD_ID")
	return c.Redirect(
		util.DISCORD_API_ENDPOINT +
			"/oauth2/authorize?client_id=" + clientId +
			"&redirect=" + url.QueryEscape(util.DISCORD_REDIRECT_URI) +
			"&response_type=code&scope=identify",
	)
}

// DiscordCallback
func DiscordCallback(c *fiber.Ctx) error {
	code := c.Query("code")

	// Code is not present for some reason, redirect to main page
	if len(code) == 0 {
		return c.Redirect("/?error=Canceled")
	}

	clientId := util.GetEnv("DISCORD_ID")
	clientSecret := util.GetEnv("DISCORD_SECRET")

	params := url.Values{}
	params.Add("client_id", clientId)
	params.Add("client_secret", clientSecret)
	params.Add("grant_type", "authorization_code")
	params.Add("code", code)
	params.Add("redirect_uri", util.DISCORD_REDIRECT_URI)

	resp, err := http.PostForm(util.DISCORD_API_ENDPOINT+"/oauth2/token", params)

	if err != nil {
		log.Println(err)
		return c.Redirect("/?error=Internal server error")
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return c.Redirect("/?error=Couldn't login")
	}

	tokenResponse := TokenResponse{}
	err = json.Unmarshal(body, &tokenResponse)

	if err != nil {
		log.Println("Reading body failed:", err)
		return c.Redirect("/?error=Internal server error")
	}

	// Fetch user data
	userInfo, err := api.FetchDiscordUserInfo(tokenResponse.AccessToken)
	if err != nil {
		log.Println("Couldn't fetch user info!", err)
		return c.Redirect("/?error=Internal server error")
	}

	// Find registered user in database
	db := database.DB

	user := &model.User{}
	userId := uuid.UUID{}

	db.Where("platform = ? AND platform_id = ?", "discord", userInfo.ID).First(&user)

	// Check if user is registered
	if user.ID == uuid.Nil {
		createdUser, err := userHandler.CreateUser("discord", userInfo.ID)

		if err != nil {
			log.Println("Couldn't register user!", err)
			return c.Redirect("/?error=Internal server error")
		}

		userId = createdUser.ID
	} else {
		userId = user.ID
	}

	// Generate session token
	token, expiry, err := middleware.NewSession("discord", tokenResponse.AccessToken, userId)

	if err != nil {
		log.Println("Couldn't generate a token!", err)
		return c.Redirect("/?error=Internal server error")
	}

	// Make a new cookie
	cookie := new(fiber.Cookie)
	cookie.Name = "session_token"
	cookie.Value = token
	cookie.Expires = expiry

	// Set header
	c.Cookie(cookie)

	// Send user to home page
	return c.Redirect("/")
}
