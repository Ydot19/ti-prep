import unittest
import uuid

from etl.extract import JsonDataReader
from etl.transform import JsonDataTransformer
from test.fixtures import fixtures
from pandas.api import types as pdtypes


class TestJsonDataTransformer(unittest.TestCase):
    def setUp(self) -> None:
        jdr = JsonDataReader(filepath=fixtures.get_sample_data_json_filepath())
        self.transformer = JsonDataTransformer(jdr=jdr)
        self.transformer.initialize()

    def test_create_problems_table_data(self):
        # arrange
        # columns in database
        expected_columns = ["id", "title", "title_slug", "difficulty", "mastered"]

        # act
        df = self.transformer.create_problems_table_data()

        # assert
        self.assertListEqual(sorted(expected_columns), sorted(df.columns.tolist()))
        self.assertTrue(df["id"].apply(self.validate_uuid).all())  # assert is uuid
        self.assertTrue(pdtypes.is_string_dtype(df["title"]))
        self.assertTrue(pdtypes.is_string_dtype(df["title_slug"]))
        self.assertTrue(pdtypes.is_string_dtype(df["difficulty"]))
        self.assertTrue(pdtypes.is_bool_dtype(df["mastered"]))

    def test_create_company_table_data(self):
        # arrange
        # columns in database
        expected_columns = ["id", "name"]

        # act
        df = self.transformer.create_company_table_data()

        # assert
        self.assertListEqual(sorted(expected_columns), sorted(df.columns.tolist()))
        self.assertTrue(df["id"].apply(self.validate_uuid).all())  # assert is uuid
        self.assertTrue(pdtypes.is_string_dtype(df["name"]))

    def test_create_problem_to_company_table_data(self):
        # arrange
        # columns in database
        expected_columns = ["id", "problem_id", "company_id"]

        # act
        df = self.transformer.create_problem_to_company_table_data()

        # assert
        self.assertListEqual(sorted(expected_columns), sorted(df.columns.tolist()))
        self.assertTrue(df["id"].apply(self.validate_uuid).all())  # assert is uuid
        self.assertTrue(
            df["problem_id"].apply(self.validate_uuid).all()
        )  # assert is uuid
        self.assertTrue(
            df["company_id"].apply(self.validate_uuid).all()
        )  # assert is uuid

    def test_create_problem_attr_table_data(self):
        # arrange
        # columns in database
        expected_columns = ["id", "problem_id", "classification"]

        # act
        df = self.transformer.create_problem_attr_table_data()

        # assert
        self.assertListEqual(sorted(expected_columns), sorted(df.columns.tolist()))
        self.assertTrue(df["id"].apply(self.validate_uuid).all())  # assert is uuid
        self.assertTrue(
            df["problem_id"].apply(self.validate_uuid).all()
        )  # assert is uuid
        self.assertTrue(pdtypes.is_string_dtype(df["classification"]))

    @staticmethod
    def validate_uuid(val) -> bool:
        return isinstance(val, uuid.UUID)
