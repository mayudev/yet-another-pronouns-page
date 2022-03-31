package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/mayudev/yet-another-pronouns-page/app/database"
)

type TokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	Scope        string `json:"scope"`
	TokenType    string `json:"token_type"`
}

type DiscordUser struct {
	Id            string `json:"id"`
	Username      string `json:"username"`
	Discriminator string `json:"discriminator"`
	Avatar        string `json:"avatar,omitempty"`
	PublicFlags   int    `json:"public_flags,omitempty"`
	Flags         int    `json:"flags,omitempty"`
	Banner        string `json:"banner,omitempty"`
	AccentColor   int    `json:"accent_color,omitempty"`
	Locale        string `json:"locale,omitempty"`
	MfaEnabled    bool   `json:"mfa_enabled,omitempty"`
}

const API_ENDPOINT = "https://discord.com/api"

// TODO move to env
const REDIRECT_URI = "http://localhost:8000/api/discord/callback"

func DiscordLogin(c *fiber.Ctx) error {
	clientId := database.GetEnv("DISCORD_ID")
	return c.Redirect(API_ENDPOINT + "/oauth2/authorize?client_id=" + clientId + "&redirect_uri=" + url.QueryEscape(REDIRECT_URI) + "&response_type=code&scope=identify")
}

func DiscordCallback(c *fiber.Ctx) error {
	code := c.Query("code")

	if len(code) == 0 {
		fmt.Println("b?")
		return c.SendStatus(http.StatusUnauthorized)
	}

	clientId := database.GetEnv("DISCORD_ID")
	clientSecret := database.GetEnv("DISCORD_SECRET")

	params := url.Values{}
	params.Add("client_id", clientId)
	params.Add("client_secret", clientSecret)
	params.Add("grant_type", "authorization_code")
	params.Add("code", code)
	params.Add("redirect_uri", REDIRECT_URI)

	resp, err := http.PostForm(API_ENDPOINT+"/oauth2/token", params)

	if err != nil || resp.StatusCode != http.StatusOK {
		fmt.Println(err)
		return c.SendStatus(http.StatusUnauthorized)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	// Log the request body
	tokenResponse := TokenResponse{}
	err = json.Unmarshal(body, &tokenResponse)

	if err != nil {
		log.Println("Reading body failed:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	cookie := new(fiber.Cookie)
	cookie.Name = "token"
	cookie.Value = tokenResponse.AccessToken
	cookie.Expires = time.Now().Add(24 * time.Hour)

	c.Cookie(cookie)

	return c.Redirect("/")
}

// DiscordLogin revoke a Discord token and clear cookie
func DiscordLogout(c *fiber.Ctx) error {
	token := c.Cookies("token")

	if len(token) == 0 {
		return c.SendStatus(http.StatusUnauthorized)
	}

	clientId := database.GetEnv("DISCORD_ID")
	clientSecret := database.GetEnv("DISCORD_SECRET")

	params := url.Values{}
	params.Add("client_id", clientId)
	params.Add("client_secret", clientSecret)
	params.Add("token", token)

	resp, err := http.PostForm(API_ENDPOINT+"/oauth2/token/revoke", params)

	if err != nil {
		log.Println("Request to Discord failed:", err)
		return c.SendStatus(http.StatusUnauthorized)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println("Reading body failed:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	c.ClearCookie("token")
	return c.SendString(string(body))
}

func DiscordUserInfo(c *fiber.Ctx) error {
	token := c.Cookies("token")

	if len(token) == 0 {
		return c.SendStatus(http.StatusUnauthorized)
	}

	client := http.Client{}
	req, err := http.NewRequest("GET", API_ENDPOINT+"/users/@me", nil)
	if err != nil {
		log.Println("Couldn't make a new request:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	req.Header.Set("Authorization", "Bearer "+token)

	if err != nil {
		return c.SendStatus(http.StatusInternalServerError)
	}

	resp, err := client.Do(req)
	if err != nil || resp.StatusCode != http.StatusOK {
		log.Println("Request failed:", err)
		return c.SendStatus(http.StatusUnauthorized)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("Body reading failed:", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	user := DiscordUser{}
	err = json.Unmarshal(body, &user)

	if err != nil {
		log.Println("Unmarshaling failed", err)
		return c.SendStatus(http.StatusInternalServerError)
	}

	return c.JSON(user)
}
