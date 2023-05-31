FROM python:3.11.2-bullseye as py-base

ENV POETRY_VERSION=1.3.2
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /code

COPY ../../pyproject.toml ./poetry.lock /code/
COPY ../../common /code/common
RUN poetry config virtualenvs.in-project true
RUN poetry install --no-ansi --no-dev


FROM py-base as etl

ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT
ENV PG_DB_HOST=$DB_HOST \
    PG_DB_NAME=$DB_NAME \
    PG_DB_USER=$DB_USER \
    PG_DB_PASSWORD=$DB_PASSWORD \
    PG_DB_PORT=$DB_PORT

WORKDIR /code
COPY ../../etl /code/etl
COPY ../../Makefile /code/
RUN poetry install --no-ansi

CMD ["make", "database-data-load"]

FROM python:3.11.2-bullseye as api
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT
ENV PREP_DB_HOST=$DB_HOST \
    PREP_DB_NAME=$DB_NAME \
    PREP_DB_USER=$DB_USER \
    PREP_DB_PASSWORD=$DB_PASSWORD \
    PREP_DB_PORT=$DB_PORT

WORKDIR code
COPY --from=py-base /code /code
COPY ./prep_api /code/prep_api

CMD /code/.venv/bin/python -m uvicorn prep_api.port.router:server --host 0.0.0.0 --port $PORT

