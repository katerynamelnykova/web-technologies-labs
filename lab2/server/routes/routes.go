package routes

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/katerynamelnykova/web-technologies-labs/lab2/server/controllers"
)

func Router() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(enableCORS)

	r.Post("/signup", controllers.Signup())
	r.Post("/login", controllers.Login())
	r.Get("/logout", controllers.Logout())
	r.Get("/auth", controllers.AuthHandler())

	return r
}
