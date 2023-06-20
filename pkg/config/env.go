package config

import (
	"context"
	"errors"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/sethvargo/go-envconfig"
	"io/fs"
	"os"
)

var envFnames = []string{".env"}

func LoadConfig(cfg any, opts ...ConfigureLoadConfig) {
	loadCfgOpts := newDefaultLoadConfigOpts()
	for _, o := range opts {
		o(loadCfgOpts)
	}
	loadEnvCfg(
		context.Background(),
		cfg,
		os.DirFS(loadCfgOpts.envFileDir),
		append(envFnames, loadCfgOpts.additionalEnvFileNames...),
		os.Exit)
}

func loadEnvCfg(
	ctx context.Context,
	cfg any,
	fs fs.FS,
	envFnames []string,
	exit func(int),
	mutators ...envconfig.MutatorFunc) {
	lookerUppers := []envconfig.Lookuper{envconfig.OsLookuper()}
	for _, envFname := range envFnames {
		lu, err := envFileLookerUpper(fs, envFname)
		if err != nil {
			fmt.Printf("failed to load env looker upper: %s\n", err.Error())
			exit(1)
			return
		}
		lookerUppers = append(lookerUppers, lu)
	}
	if err := envconfig.ProcessWith(ctx, cfg, envconfig.MultiLookuper(lookerUppers...), mutators...); err != nil {
		fmt.Printf("failed to load env configuration into the process: %s", err.Error())
		exit(1)
		return
	}
}

func envFileLookerUpper(fs fs.FS, fname string) (envconfig.Lookuper, error) {
	var envMap map[string]string
	f, err := fs.Open(fname)
	if err == nil {
		envMap, err = godotenv.Parse(f)
		if err != nil {
			return nil, fmt.Errorf("failed to parse config file (fname=%s): %w", fname, err)
		}
	} else if !errors.Is(err, os.ErrNotExist) {
		return nil, fmt.Errorf("failed to open file (fname=%s): %w", fname, err)
	}

	return envconfig.MapLookuper(envMap), nil
}
