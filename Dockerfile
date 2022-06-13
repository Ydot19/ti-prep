FROM python:3.10.2-bullseye as api

ENV POETRY_VERSION=1.1.13
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /code
COPY ./pyproject.toml ./poetry.lock /code/


