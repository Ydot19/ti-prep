package config

import "os"

type loadConfigOpts struct {
	envFileDir             string
	additionalEnvFileNames []string
}

func newDefaultLoadConfigOpts() *loadConfigOpts {
	return &loadConfigOpts{
		envFileDir: stringsMust(os.Getwd()),
	}
}

type ConfigureLoadConfig func(*loadConfigOpts)

func WithEnvFileDir(dir string) ConfigureLoadConfig {
	return func(opts *loadConfigOpts) {
		opts.envFileDir = dir
	}
}

func WithAdditionalEnvFile(fname string) ConfigureLoadConfig {
	return func(opts *loadConfigOpts) {
		opts.additionalEnvFileNames = append(opts.additionalEnvFileNames, fname)
	}
}

func stringsMust(s string, err error) string {
	if err != nil {
		panic(err)
	}
	return s
}
