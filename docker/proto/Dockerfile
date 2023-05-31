FROM golang:1.20-buster as codegen

RUN apt-get update \
    && DEBIAN_FRONTEND=noninter \
    apt-get --quiet --assume-yes --no-install-recommends \
    install protobuf-compiler

RUN mkdir /app

WORKDIR /app
ENV GOBIN=$PWD/bin
ENV PATH=$GOBIN:$PATH
RUN mkdir $GOBIN
RUN mkdir proto

COPY proto ./proto
COPY tools.go .

RUN protoc --proto_path=/proto
