import os
from typing import Dict, Callable
import psycopg2
from common.postgres.connection import DbConnectionConfig
from etl.extract import JsonDataReader
from etl.load import DataFramePGLoader
from etl.transform import TJsonDataTransformer, JsonDataTransformer


class ExtractTransformLoad:
    def __init__(self):
        self.loader = None
        self.transformer = None
        self.curr_dir = os.path.dirname(os.path.realpath(__file__))
        self.zipfile_path = f"{self.curr_dir}/data.zip"
        connection_config = DbConnectionConfig(prefix="PG_DB_")
        print(connection_config.DB_HOST)
        print(connection_config.DB_NAME)
        print(connection_config.DB_USER)
        print(connection_config.DB_PASSWORD)
        print(connection_config.DB_PORT)

        self.conn = psycopg2.connect(
            host=connection_config.DB_HOST,
            database=connection_config.DB_NAME,
            user=connection_config.DB_USER,
            password=connection_config.DB_PASSWORD,
            port=connection_config.DB_PORT,
        )

    def set_up(self):
        import zipfile

        with zipfile.ZipFile(self.zipfile_path, "r") as zf:
            # creates a file called data.json in the current directory
            # zip content has the following extract etl/data.json
            zf.extractall(f"{self.curr_dir}/..")

    def execute(self):
        self.set_up()

        jdr = JsonDataReader(filepath=f"{self.curr_dir}/data.json")
        self.transformer: TJsonDataTransformer = JsonDataTransformer(jdr=jdr)
        self.transformer.initialize()
        self.loader = DataFramePGLoader(conn=self.conn)

        postgres_table_name_to_pandas_df: Dict[str, Callable] = {
            "problems": self.transformer.create_problems_table_data,
            "company": self.transformer.create_company_table_data,
            "problem_to_company": self.transformer.create_problem_to_company_table_data,
            "problem_category": self.transformer.create_problem_category_table_data,
        }

        for table_name, df_generator in postgres_table_name_to_pandas_df.items():
            err = self.loader.bulk_upload(table_name, df_generator())
            if err is not None:
                print(
                    f"""
                !!!!!!!!!!! WARNING - ERROR WHILE COMPLETING BULK UPLOAD !!!!!!!!!!!
                TABLE_NAME = {table_name}
                ERROR = {err}
                """
                )
                break

        self.tear_down()

    def tear_down(self):
        os.remove(f"{self.curr_dir}/data.json")


def start():
    etl = ExtractTransformLoad()
    etl.execute()
