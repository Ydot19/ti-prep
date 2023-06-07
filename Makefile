TOOLS_PATH := $(shell pwd)/bin
MIGRATE := $(TOOLS_PATH)/migrate

# Python
export PYTHONPATH=$PYTHONPATH:$(pwd)
export PATH := $(TOOLS_PATH):$(PATH):$(TOOLS_PATH)/node_modules/.bin

# Typescript
PROTOC_GEN_TWIRP_BIN :="$(TOOLS_PATH)/node_modules/.bin/protoc-gen-twirp_ts"
PROTOC_GEN_TS_BIN :="$(TOOLS_PATH)/node_modules/.bin/protoc-gen-ts"

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

.PHONY: codegen

clean:
	rm -rf ./bin/*

install-python-prod-deps:
	# install production dependencies
	poetry install --no-dev

install-python-deps:
	# install with dev dependencies
	poetry install

install-tools:
	mkdir -p bin/
	export GOBIN=$(TOOLS_PATH); cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -tI % go install %
	pnpm install twirp-ts --prefix ./bin
	pnpm install @protobuf-ts/plugin@next --prefix ./bin

codegen:
	rm -rf codegen
	mkdir -p codegen/go codegen/ts
	protoc --twirp_out=./codegen/go --twirp_opt=paths=source_relative \
        --go_out=./codegen/go --go_opt=paths=source_relative \
        --plugin=protoc-gen-ts=$(PROTOC_GEN_TS_BIN) \
	    --plugin=protoc-gen-twirp_ts=$(PROTOC_GEN_TWIRP_BIN) \
        --ts_opt=generate_dependencies \
		--ts_out=codegen/ts \
		--twirp_ts_out=codegen/ts \
		--proto_path=./proto ./proto/**/**/*.proto

format-py:
	$(PY_CMD) black $(PY_TEST_DIR) $(PY_API_DIR) $(PY_ETL_DIR)

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

stop-etl:
	docker-compose rm -s -v etl

start-api:
	docker-compose up --force-recreate --build -d api

stop-api:
	docker-compose rm -s -v api

run-dev: up start-etl start-api # start all services for dev

down:
	docker-compose down
