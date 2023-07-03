FROM python:3.11.2-bullseye as py-base

ENV POETRY_VERSION=1.3.2
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /code

COPY ./pyproject.toml ./poetry.lock /code/
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-ansi --no-dev


FROM py-base as etl
WORKDIR /code
COPY ./etl /code/etl
COPY ./Makefile /code/
RUN poetry install --no-ansi
