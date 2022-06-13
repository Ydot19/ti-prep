import os

import psycopg2

from common.postgres.connection import DbConnectionConfig


def get_connection():
    prefix = os.getenv("LEETCODE_API_DB_PREFIX", "LC_DB_")
    connection_config = DbConnectionConfig(prefix=prefix)
    return psycopg2.connect(
        host=connection_config.DB_HOST,
        database=connection_config.DB_NAME,
        user=connection_config.DB_USER,
        password=connection_config.DB_PASSWORD,
    )
