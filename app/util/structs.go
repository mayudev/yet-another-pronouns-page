package util

import "fmt"

type ErrorMessage struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type FetchError struct {
	Err        string
	StatusCode int
}

func (e *FetchError) Error() string {
	return fmt.Sprintf("[%v] %s", e.StatusCode, e.Err)
}

type PronounType uint8

const (
	Primary PronounType = iota
	Okay
	Friends
	Nope
)

func (p PronounType) String() string {
	switch p {
	case Primary:
		return "primary"
	case Okay:
		return "okay"
	case Friends:
		return "friends"
	case Nope:
		return "nope"
	}
	return "undefined"
}
