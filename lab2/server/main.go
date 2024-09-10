package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/katerynamelnykova/web-technologies-labs/lab2/server/routes"

	"github.com/go-chi/chi/v5"
)

func main() {
	port := "3000"

	if p := os.Getenv("PORT"); p != "" {
		if _, err := strconv.Atoi(p); err == nil {
			port = p
		}
	}

	displayRoutes()

	log.Println("running service on port: ", port)
	if err := http.ListenAndServe(":"+port, routes.Router()); err != nil {
		log.Println(err)
	}
}

func displayRoutes() {
	err := chi.Walk(routes.Router(), func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		fmt.Printf("%s %s\n", method, route)
		return nil
	})

	if err != nil {
		log.Printf("Failed to walk the router: %s\n", err.Error())
	}
}
