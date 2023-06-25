package main

import (
	"fmt"
	rpc "github.com/Ydot19/ti-prep/api/codegen/rpc/v1"
	"github.com/Ydot19/ti-prep/api/port"
	"github.com/Ydot19/ti-prep/pkg/config"
	"github.com/Ydot19/ti-prep/pkg/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/twitchtv/twirp"
	"log"
	"net/http"
	"os"
)

type Options struct {
	AppOptions port.Options
	ListenPort string `env:"LISTEN_PORT,default=:8080"`
}

func main() {
	var opts Options
	config.LoadConfig(&opts)
	mux := initialize(&opts)
	log.Fatal(http.ListenAndServe(opts.ListenPort, mux))
}

func initialize(opts *Options) *chi.Mux {
	router := chi.NewRouter()
	app, err := port.Factory(&opts.AppOptions)
	if err != nil {
		fmt.Printf("failed to initialize app: %s", err)
		os.Exit(1)
	}
	handler := rpc.NewNotesServiceServer(app, twirp.WithServerHooks(middleware.NewLoggingServerHooks()))
	router.Mount(handler.PathPrefix(), handler)
	return router
}
