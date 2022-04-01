package util

import (
	"regexp"
)

func ValidateUsername(username string) bool {
	re, err := regexp.Compile(`^[a-zA-Z0-9_]+$`)

	if err != nil {
		return false
	}

	match := re.MatchString(username)

	if !match {
		return false
	}

	return true
}
