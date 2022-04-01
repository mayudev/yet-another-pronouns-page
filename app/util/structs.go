package util

import "fmt"

type ErrorMessage struct {
	Status  string
	Message string
}

type FetchError struct {
	Err        string
	StatusCode int
}

func (e *FetchError) Error() string {
	return fmt.Sprintf("[%v] %s", e.StatusCode, e.Err)
}
