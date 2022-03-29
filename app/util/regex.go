package util

import (
	"fmt"
	"regexp"
)

func ValidateUsername(username string) bool {
	fmt.Println(username)
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
