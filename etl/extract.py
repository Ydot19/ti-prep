import json
import pandas as pd
from pandas.core.frame import DataFrame


class JsonDataReader:
    def __init__(self, filepath: str):
        self.__filepath = filepath

    def __enter__(self):
        self.file = open(self.__filepath, 'r')
        self.__data = json.loads(self.file.read())

    def __exit__(self, *args):
        self.file.close()

    def get_data(self):
        return self.__data

    def to_pandas_df(self) -> DataFrame:
        return pd.json_normalize(
            self.get_data(),
            record_path=['data']
        )
