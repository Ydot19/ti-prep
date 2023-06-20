package postgres

type Options struct {
	Host                         string `env:"DB_HOST,default=localhost"`
	Port                         int    `env:"DB_PORT,default=5432"`
	Username                     string `env:"DB_USER,default=postgres"`
	Password                     string `env:"DB_USER,default=postgres"`
	DBName                       string `env:"DB_NAME,default=postgres_db"`
	MaxOpenConns                 int    `env:"DB_MAX_OPEN_CONN,default=20"`
	MaxIdleConns                 int    `env:"DB_MAX_IDLE_CONN,default=10"`
	MaxConnectionLifetimeSeconds int    `env:"DB_MAX_CONN_LIFETIME_SECONDS,default=60"`
	MaxConnectionIdleSeconds     int    `env:"DB_MAX_CONN_IDLE_SECONDS,default=30"`
	SSLMode                      string `env:"DB_SSL_MODE"`
	SSLRootCert                  string `env:"DB_SSL_ROOT_CERT"`
	PingTimeoutSeconds           int    `env:"DB_PING_TIMEOUT_SECONDS,default=1"`
}
