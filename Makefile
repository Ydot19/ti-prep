TOOLS_PATH := $(shell pwd)/bin
MIGRATE := $(TOOLS_PATH)/migrate

# Python
export PYTHONPATH=$PYTHONPATH:$(pwd)

# PG Variables - see docker compose file
export PG_DB_HOST ?= localhost
export PG_DB_PORT ?= 5432
export PG_DB_NAME ?= leetcode
export PG_DB_USER ?= coder
export PG_DB_PASSWORD ?= codes

SCHEMA_FILENAME := leetcode_db_schema.sql
PY_CMD := poetry run
PY_ETL_DIR := $(shell pwd)/etl
PY_TEST_DIR := $(shell pwd)/test
PY_API_DIR := $(shell pwd)/prep_api

clean:
	rm -rf ./bin/*

install-python-prod-deps:
	# install production dependencies
	poetry install --no-dev

install-python-deps:
	# install with dev dependencies
	poetry install

format-py:
	$(PY_CMD) black $(PY_TEST_DIR) $(PY_API_DIR) $(PY_ETL_DIR)

install-go-migrate:
	export GOBIN=$(TOOLS_PATH); go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

install-postgresql:
	which psql || brew install postgresql

start-postgresql:
	mkdir -p ./pgdata
	docker-compose up --force-recreate --build -d db
	sh -c 'until $$(pg_isready -h ${PG_DB_HOST} -U ${PG_DB_USER} -p ${PG_DB_PORT} -q); do { printf '.'; sleep 1; };  done'

stop-postgresql:
	docker-compose rm -s -v db

create-db: start-postgresql
	# psql must be installed
	PGPASSWORD=${PG_DB_PASSWORD} psql -h ${PG_DB_HOST} -p ${PG_DB_PORT} -U ${PG_DB_USER} -c "drop database if exists ${PG_DB_NAME};"
	PGPASSWORD=${PG_DB_PASSWORD} psql -h ${PG_DB_HOST} -p ${PG_DB_PORT} -U ${PG_DB_USER} -c "create database ${PG_DB_NAME};"

database-schema:
	PGPASSWORD=${PG_DB_PASSWORD} psql ${PG_DB_NAME} -h ${PG_DB_HOST} -p ${PG_DB_PORT} -U ${PG_DB_USER} -a -f db/${SCHEMA_FILENAME}

migrate-db: create-db
	$(MIGRATE) -path db/migrations -database "postgres://${PG_DB_USER}:${PG_DB_PASSWORD}@${PG_DB_HOST}:${PG_DB_PORT}/${PG_DB_NAME}?sslmode=disable" up
	@PGPASSWORD=${PG_DB_PASSWORD} pg_dump -s -h ${PG_DB_HOST} -p ${PG_DB_PORT} -U ${PG_DB_USER}  ${PG_DB_NAME} > ./db/${SCHEMA_FILENAME}


up: create-db database-schema # brings up the database for unit and integration testing

database-data-load: # loads the database with actual data
	poetry run etl-to-db

start-etl:
	docker-compose up --force-recreate --build -d etl

stop-api:
	docker-compose rm -s -v etl

start-api:
	docker-compose up --force-recreate --build -d api

stop-api:
	docker-compose rm -s -v api

run-dev: up start-etl start-api # start all services for dev

down:
	docker-compose down