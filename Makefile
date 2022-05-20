TOOLS_PATH := $(shell pwd)/bin
MIGRATE := $(TOOLS_PATH)/migrate

# PG Variables - see docker compose file
PG_DB_HOSTNAME := localhost
PG_DB_PORT ?= 5432
PG_DB_NAME := leetcode
PG_DB_USER ?= coder
PG_DB_PASSWORD ?= codes

SCHEMA_FILENAME := leetcode_db_schema.sql

clean:
	rm -rf ./bin/*

install-go-migrate:
	export GOBIN=$(TOOLS_PATH); go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

install-postgresql:
	which psql || brew install postgresql

start-postgresql:
	mkdir -p ./pgdata
	docker-compose up --force-recreate --build -d db
	sh -c 'until $$(pg_isready -h ${PG_DB_HOSTNAME} -U ${PG_DB_USER} -p ${PG_DB_PORT} -q); do { printf '.'; sleep 1; };  done'

stop-postgresql:
	docker-compose rm -s -v db

create-db: start-postgresql
	# psql must be installed
	PGPASSWORD=${PG_DB_PASSWORD} psql -h ${PG_DB_HOSTNAME} -p ${PG_DB_PORT} -U ${PG_DB_USER} -c "drop database if exists ${PG_DB_NAME};"
	PGPASSWORD=${PG_DB_PASSWORD} psql -h ${PG_DB_HOSTNAME} -p ${PG_DB_PORT} -U ${PG_DB_USER} -c "create database ${PG_DB_NAME};"
	PGPASSWORD=${PG_DB_PASSWORD} psql ${PG_DB_NAME} -h ${PG_DB_HOSTNAME} -p ${PG_DB_PORT} -U ${PG_DB_USER} -a -f db/${SCHEMA_FILENAME}
migrate-db: create-db
	$(MIGRATE) -path db/migrations -database "postgres://${PG_DB_USER}:${PG_DB_PASSWORD}@${PG_DB_HOSTNAME}:${PG_DB_PORT}/${PG_DB_NAME}?sslmode=disable" up
	@PGPASSWORD=${PG_DB_PASSWORD} pg_dump -s -h ${PG_DB_HOSTNAME} -p ${PG_DB_PORT} -U ${PG_DB_USER}  ${PG_DB_NAME} > ./db/${SCHEMA_FILENAME}

up: create-db

down:
	docker-compose down