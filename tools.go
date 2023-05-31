//go:build tools
// +build tools

package tools

import (
	_ "github.com/golang-migrate/migrate/v4/cmd/migrate" // -tags 'postgres'
	_ "github.com/twitchtv/twirp/protoc-gen-twirp"
	_ "google.golang.org/protobuf/cmd/protoc-gen-go"
)
