import pandas
import pandas._typing as pdtypes
from io import StringIO
from typing import Callable
import psycopg2


class DataFramePGLoaderError(Exception):
    def __init__(self, context: str, err: Exception):
        self.context = context
        self.root_error = err

    def message(self):
        return f"{self.context}: {self.root_error}"


def load_wrapper(f: Callable) -> [Exception | None]:
    def __wrapper(*args):
        ret = None
        try:
            f(*args)
        except (Exception, psycopg2.DatabaseError) as error:
            ret = DataFramePGLoaderError("failed to load", error)
            # rollback and close the current connection
            conn = args[0].conn
            conn.rollback()
            cur = conn.cursor()
            cur.close()
        return ret
    return __wrapper


class DataFramePGLoader:
    def __init__(self, conn):
        self.conn = conn

    @load_wrapper
    def bulk_upload(self, table_name: str, df: pandas.DataFrame) -> [Exception | None]:
        buffer: pdtypes.WriteBuffer = StringIO()
        df.to_csv(buffer, sep=",", header=False, index=False)
        buffer.seek(0)
        cursor = self.conn.cursor()
        cursor.copy_from(buffer, table_name, sep=",")
        self.conn.commit()
        cursor.close()
        return 0

