package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/mayudev/yet-another-pronouns-page/app/util"
)

type DiscordUser struct {
	ID            string `json:"id"`
	Username      string `json:"username"`
	Discriminator string `json:"discriminator"`
	Avatar        string `json:"avatar,omitempty"`
	PublicFlags   int    `json:"public_flags,omitempty"`
	Flags         int    `json:"flags,omitempty"`
	Banner        string `json:"banner,omitempty"`
	AccentColor   int    `json:"accent_color,omitempty"`
	Locale        string `json:"locale,omitempty"`
	MFAEnabled    bool   `json:"mfa_enabled,omitempty"`
}

// FetchDiscordUserInfo fetches Discord user info
func FetchDiscordUserInfo(token string) (DiscordUser, error) {
	// Set up a new request
	client := http.Client{}
	req, err := http.NewRequest("GET", "https://discord.com/api/users/@me", nil)
	if err != nil {
		return DiscordUser{}, err
	}

	// Set Authorization header
	req.Header.Set("Authorization", "Bearer "+token)

	// Send the request
	resp, err := client.Do(req)

	if err != nil {
		return DiscordUser{}, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return DiscordUser{}, &util.FetchError{
			Err:        "API response not OK",
			StatusCode: resp.StatusCode,
		}
	}

	// Read response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return DiscordUser{}, err
	}

	user := DiscordUser{}
	err = json.Unmarshal(body, &user)

	if err != nil {
		return DiscordUser{}, err
	}

	return user, nil
}
