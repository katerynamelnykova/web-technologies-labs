package utils

import (
	"fmt"
	"net/http"
)

func IsAuthorized(w http.ResponseWriter, r *http.Request) bool {
	cookie, err := r.Cookie("token")

	if err != nil {
		http.Error(w, fmt.Sprint(err), 500)
		return false
	}

	_, err = ParseToken(cookie.Value)

	if err != nil {
		http.Error(w, fmt.Sprint(err), 500)
		return false
	}

	return true
}
