FROM golang:1.20-buster

WORKDIR /app

COPY ../../go.mod /app/
COPY ../../go.sum /app/
COPY ../../pkg /app/pkg
COPY ../../api /app/api
COPY ../../cmd /app/cmd

RUN mkdir -p /app/bin

RUN go install -v ./...
RUN go build -o /app/bin/api /app/cmd/notes/main.go