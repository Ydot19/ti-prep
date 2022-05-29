import pandas
from io import StringIO
from cli.config.connection import DbOptions
import psycopg2


class DataLoader:
    def __int__(self):
        opts = DbOptions
        db_params = {
            "host": opts.DB_HOST,
            "database": opts.DB_NAME,
            "user": opts.DB_USER,
            "password": opts.DB_PASSWORD,
        }
        self.__pg_conn = psycopg2.connect(**db_params)

    def bulk_upload(self, table_name: str, df: pandas.DataFrame) -> int:
        buffer = StringIO()
        df.to_csv(buffer, sep=",")
        buffer.seek(0)
        cursor = self.__pg_conn.cursor()
        try:
            cursor.copy_from(buffer, table_name, sep=",")
        except (Exception, psycopg2.DatabaseError) as err:
            self.__pg_conn.rollback()
            cursor.close()
            return 1

        cursor.close()
        return 0
