import os


def read_db_opts(prefix: str, name: str):
    """
    Reads an environment based on its name and a given
    prefix
    :param prefix:
    :param name:
    :return:
    """
    return os.getenv(f"{prefix}{name}")


class DbConnectionConfig:
    def __init__(self, **kwargs):
        prefix = kwargs["prefix"]
        self.DB_HOST = read_db_opts(prefix, "HOST")
        self.DB_NAME = read_db_opts(prefix, "NAME")
        self.DB_USER = read_db_opts(prefix, "USER")
        self.DB_PASSWORD = read_db_opts(prefix, "PASSWORD")
