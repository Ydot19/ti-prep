import os

PREFIX = "LC_DB_"


def read_db_opts(name):
    """
    Reads an environment based on its name and a given
    prefix
    :param name:
    :return:
    """
    return os.getenv(f"{PREFIX}{name}")


class DbOptions:
    DB_HOST = read_db_opts("HOST")
    DB_NAME = read_db_opts("NAME")
    DB_USER = read_db_opts("USER")
    DB_PASSWORD = read_db_opts("PASSWORD")
