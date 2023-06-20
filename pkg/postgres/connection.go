package postgres

import (
	"context"
	"fmt"
	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/jmoiron/sqlx"
	"time"
)

const (
	defaultDriver = "pgx"
)

func NewConnection(opts *Options) (*sqlx.DB, error) {

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s",
		opts.Host,
		opts.Port,
		opts.Username,
		opts.Password,
		opts.DBName)
	db, err := sqlx.Open(defaultDriver, psqlInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}
	db.SetMaxOpenConns(opts.MaxOpenConns)
	db.SetMaxIdleConns(opts.MaxIdleConns)
	db.SetConnMaxLifetime(time.Duration(opts.MaxConnectionLifetimeSeconds) * time.Second)
	db.SetConnMaxIdleTime(time.Duration(opts.MaxConnectionIdleSeconds) * time.Second)
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(opts.PingTimeoutSeconds)*time.Second)
	defer cancel()
	err = db.PingContext(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}
	return db, nil
}
