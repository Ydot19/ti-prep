import unittest
import uuid

from leetcode_prep.domain._types import records
from leetcode_prep.domain.errors import InternalError
from leetcode_prep.domain.response import APIResponseBuilder


class TestApiResponseBuilder(unittest.TestCase):
    def test_build_response_no_error(self):
        # arrange
        err = None
        data = records.CompanyRecord(str(uuid.uuid4()), "cross")
        builder = APIResponseBuilder()
        builder.error = err
        builder.data = data

        # act
        resp = builder.to_dict()

        # assert
        self.assertIsNone(resp["error"])
        self.assertEqual(data.id, resp["data"]["id"])

    def test_build_response_data_list(self):
        err = None
        data = [
            records.CompanyRecord(str(uuid.uuid4()), "cross"),
            records.CompanyRecord(str(uuid.uuid4()), "fit"),
        ]
        builder = APIResponseBuilder()
        builder.error = err
        builder.data = data

        # act
        resp = builder.to_dict()

        # assert
        self.assertIsNone(resp["error"])
        self.assertEqual(data[0].id, resp["data"][0]["id"])

    def test_build_response_with_error(self):
        # arrange
        err = InternalError()
        data = None
        builder = APIResponseBuilder()
        builder.error = err
        builder.data = data

        # act
        resp = builder.to_dict()

        # assert
        self.assertIsNone(resp["data"])
        self.assertEqual(err.code, resp["error"]["status_code"])
