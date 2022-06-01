import unittest
import pandas as pd
from etl.extract import JsonDataReader
from test.fixtures import fixtures


class TestJsonDataReader(unittest.TestCase):
    def setUp(self) -> None:
        self.jdr = JsonDataReader(filepath=fixtures.get_sample_data_json_filepath())

    def test_validate_structure(self):
        with self.jdr:
            fixture_data = self.jdr.get_data()

        self.assertEqual(1, len(fixture_data))
        self.assertEqual(2, len(fixture_data["data"]))

    def test_validate_pandas(self):
        with self.jdr:
            df: pd.DataFrame = self.jdr.to_pandas_df()

        self.assertEqual(["two-sigma", "citadel"], df["company"].unique().tolist())
