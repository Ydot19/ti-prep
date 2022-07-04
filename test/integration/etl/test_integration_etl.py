import unittest

import dotenv
import psycopg2

from common.postgres.connection import DbConnectionConfig
from etl.extract import JsonDataReader
from etl.load import DataFramePGLoader
from etl.transform import JsonDataTransformer, TJsonDataTransformer
from test.fixtures import fixtures


class TestLDataLoad(unittest.TestCase):
    loader = None
    transformer = None

    @classmethod
    def setUpClass(cls) -> None:
        dotenv.load_dotenv()
        jdr = JsonDataReader(filepath=fixtures.get_sample_data_json_filepath())
        cls.transformer: TJsonDataTransformer = JsonDataTransformer(jdr=jdr)
        cls.transformer.initialize()

        connection_config = DbConnectionConfig(prefix="PG_DB_")
        conn = psycopg2.connect(
            host=connection_config.DB_HOST,
            database=connection_config.DB_NAME,
            user=connection_config.DB_USER,
            password=connection_config.DB_PASSWORD,
            port=connection_config.DB_PORT,
        )

        cls.loader = DataFramePGLoader(conn=conn)

    def test_connection(self) -> None:
        cur = self.loader.conn.cursor()
        try:
            cur.execute("SELECT version()")
            self.assertTrue(True)
        except (Exception, psycopg2.DatabaseError) as error:
            self.fail(msg=f"ping test failed: err={error}")

    def test_load_problems_table(self):
        table_name = "problems"
        df = self.transformer.create_problems_table_data()
        err = self.loader.bulk_upload(table_name, df)
        self.assertIsNone(err)

    def test_load_company_table(self):
        df = self.transformer.create_company_table_data()
        err = self.loader.bulk_upload("company", df)
        self.assertIsNone(err)

    def test_problem_to_company_table(self):
        df = self.transformer.create_problem_to_company_table_data()
        err = self.loader.bulk_upload("problem_to_company", df)
        self.assertIsNone(err)

    def test_problem_attr_table(self):
        df = self.transformer.create_problem_attr_table_data()
        err = self.loader.bulk_upload("problem_attr", df)
        self.assertIsNone(err)

    @classmethod
    def tearDownClass(cls) -> None:
        cur = cls.loader.conn.cursor()
        cur.execute("DELETE FROM problem_to_company;")
        cur.execute("DELETE FROM problem_attr")
        cur.execute("DELETE FROM problems;")
        cur.execute("DELETE FROM company;")
        cls.loader.conn.commit()
        cls.loader.conn.close()
