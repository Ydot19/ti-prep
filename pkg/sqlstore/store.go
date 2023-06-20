package sqlstore

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type ConfigureSqlTransaction func(opts *sql.TxOptions)

func WithIsolationLevel(l sql.IsolationLevel) ConfigureSqlTransaction {
	return func(opts *sql.TxOptions) {
		opts.Isolation = l
	}
}

func WithReadOnly(b bool) ConfigureSqlTransaction {
	return func(opts *sql.TxOptions) {
		opts.ReadOnly = b
	}
}

type Store interface {
	CurrentTx() Transaction
	EnsureTx(ctx context.Context, cfgs ...ConfigureSqlTransaction) (Transaction, error)
}

type Transaction interface {
	Store

	// slqx.Tx methods
	GetContext(ctx context.Context, dest any, query string, args ...interface{}) error
	MustExecContext(ctx context.Context, query string, args ...any) sql.Result
	NamedExecContext(ctx context.Context, query string, arg any) (sql.Result, error)
	NamedQuery(query string, arg any) (*sqlx.Rows, error)
	PrepareNamedContext(ctx context.Context, query string) (*sqlx.NamedStmt, error)
	PreparexContext(ctx context.Context, query string) (*sqlx.Stmt, error)
	QueryRowxContext(ctx context.Context, query string, args ...any) *sqlx.Row
	QueryxContext(ctx context.Context, query string, args ...interface{}) (*sqlx.Rows, error)
	SelectContext(ctx context.Context, dest any, query string, args ...any) error
	Rebind(query string) string
	//StmtxContext(ctx context.Context, stmt any) *sqlx.Stmt

	// generic methods
	Rollback(ctx context.Context) error
	Commit() error
}

type txStore struct {
	*sqlx.Tx
	top bool
}

func (q *txStore) CurrentTx() Transaction {
	return q
}

func (q *txStore) EnsureTx(ctx context.Context, cfgs ...ConfigureSqlTransaction) (Transaction, error) {
	return &txStore{Tx: q.Tx, top: false}, nil
}

func (q *txStore) Commit() error {
	if !q.top {
		return nil
	}

	return q.Tx.Commit()
}

func (q *txStore) Rollback(ctx context.Context) error {
	if !q.top {
		return nil
	}

	if err := q.Tx.Rollback(); err != nil && !errors.Is(err, sql.ErrNoRows) {
		return err
	}
	return nil
}

type dbStore struct {
	*sqlx.DB
}

func (q *dbStore) Rollback(ctx context.Context) error {
	return nil
}

func (q *dbStore) Commit() error {
	return nil
}

func NewStore(db *sqlx.DB) Store {
	return &dbStore{db}
}

func (q *dbStore) CurrentTx() Transaction {
	return q
}

func (q *dbStore) EnsureTx(ctx context.Context, cfgs ...ConfigureSqlTransaction) (Transaction, error) {
	txOpts := &sql.TxOptions{}
	for _, cfg := range cfgs {
		cfg(txOpts)
	}
	tx, err := q.BeginTxx(ctx, txOpts)
	if err != nil {
		return nil, err
	}
	return &txStore{Tx: tx, top: true}, nil
}

func WithTx(ctx context.Context, db Store, cb func(transaction Transaction) error) error {
	tx, err := db.EnsureTx(ctx)
	if err != nil {
		return fmt.Errorf("failed to begin trnasaction: %w", err)
	}
	defer tx.Rollback(ctx)

	if err := cb(tx); err != nil {
		return err
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %w", err)
	}

	return nil
}
