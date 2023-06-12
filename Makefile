TOOLS_PATH := $(shell pwd)/bin
MIGRATE := $(TOOLS_PATH)/migrate
UI_DIR := $(shell pwd)/ui
ETL_DIR := $(shell pwd)/etl
API_DIR := $(shell pwd)/api

# GO
export GOBIN=$(TOOLS_PATH)
TWIRP_GO_CODEGEN_DIR :=  $(API_DIR)/codegen

# Python
export PYTHONPATH=$PYTHONPATH:$(pwd)
export PATH := $(TOOLS_PATH):$(PATH):$(UI_DIR)/node_modules/.bin
PY_CMD := poetry run
PY_ETL_DIR := $(ETL_DIR)
PY_TEST_DIR := $(shell pwd)/test
PY_API_DIR := $(API_DIR)

# Typescript
PROTOC_GEN_TWIRP_BIN :="$(UI_DIR)/node_modules/.bin/protoc-gen-twirp_ts"
PROTOC_GEN_TS_BIN :="$(UI_DIR)/node_modules/.bin/protoc-gen-ts"
TWIRP_TS_CODEGEN_DIR := $(UI_DIR)/src/codegen

# PG Variables - see docker compose file
export PG_DB_HOST ?= localhost
export PG_DB_PORT ?= 5432
export PG_DB_NAME ?= leetcode
export PG_DB_USER ?= coder
export PG_DB_PASSWORD ?= codes

SCHEMA_FILENAME := leetcode_db_schema.sql

.PHONY: codegen

clean:
	rm -rf ./bin/*
	mkdir -p bin/


install-python-prod-deps:
	# install production dependencies
	poetry install --no-dev

install-python-deps:
	# install with dev dependencies
	poetry install

install-go-tools:
	cat tools.go | grep _ | awk -F'("|//)' '{print $$NF " " $$2}' | xargs -tL 1 go install

install-ts-tools:
	pnpm install twirp-ts --prefix ./ui
	pnpm install @protobuf-ts/plugin@next --prefix ./ui

install-tools: clean install-go-tools install-ts-tools

codegen:
	rm -rf $(TWIRP_GO_CODEGEN_DIR)
	rm -rf $(TWIRP_TS_CODEGEN_DIR)
	mkdir -p $(TWIRP_GO_CODEGEN_DIR) $(TWIRP_TS_CODEGEN_DIR)
	protoc --twirp_out=$(TWIRP_GO_CODEGEN_DIR) --twirp_opt=paths=source_relative \
        --go_out=$(TWIRP_GO_CODEGEN_DIR) --go_opt=paths=source_relative \
        --plugin=protoc-gen-ts=$(PROTOC_GEN_TS_BIN) \
	    --plugin=protoc-gen-twirp_ts=$(PROTOC_GEN_TWIRP_BIN) \
        --ts_opt=generate_dependencies \
		--ts_out=$(TWIRP_TS_CODEGEN_DIR) \
		--twirp_ts_out=$(TWIRP_TS_CODEGEN_DIR) \
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
