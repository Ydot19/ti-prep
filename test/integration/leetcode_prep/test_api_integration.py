import math
import random
import unittest
import uuid
from typing import Any

from fastapi.testclient import TestClient
from requests import Response

from prep_api.port.router import server


class TestApi(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.client = TestClient(server)

    def test_get_problems(self):
        # arrange - none
        # act
        response = self.client.get("/problem")
        # assert
        body = self._expect_201_ok(response)
        self.assertEqual(50, len(body["data"]["problems"]))

    def test_get_problems_set_pagination(self):
        # arrange
        pagination_start = 10
        limit = 100
        # act
        response = self.client.get(f"/problem?start={pagination_start}&limit={limit}")
        # assert
        body = self._expect_201_ok(response)
        self.assertEqual(limit, len(body["data"]["problems"]))

    def test_get_problem_by_id_not_found(self):
        # arrange
        problem_id = str(uuid.uuid4())

        # act
        response = self.client.get(f"/problem/details/{problem_id}")
        # assert
        self._expect_error_response(response, 404)

    def test_get_problem_by_id(self):
        # arrange
        start = math.floor(random.uniform(0, 1) * 399)
        limit = 1
        get_problems_response = self.client.get(f"/problem?start={start}&limit={limit}")
        get_problems_content_body = self._expect_201_ok(get_problems_response)
        problem_id = get_problems_content_body["data"]["problems"][0]["id"]
        # act
        response = self.client.get(f"/problem/details/{problem_id}")
        # assert
        body = self._expect_201_ok(response)
        self.assertEqual(
            get_problems_content_body["data"]["problems"][0], body["data"]["problem"]
        )
        self.assertIsNotNone(body["data"]["companies"])
        self.assertIsNotNone(body["data"]["classifications"])

    def test_get_companies(self):
        # arrange - none
        # act
        response = self.client.get("/problem/company")
        # assert
        body = self._expect_201_ok(response)
        self.assertGreater(len(body["data"]["companies"]), 0)

    def test_get_classification_counts_all(self):
        # arrange - none
        # act
        response = self.client.get("/problem/classification")
        # assert
        body = self._expect_201_ok(response)
        self.assertGreater(len(body["data"]["classifications"]), 0)
        self.assertIsNone(body["data"]["company"])

    def test_get_classifications_counts_specific_company(self):
        # arrange
        companies_response = self.client.get("/problem/company")
        cr_body = self._expect_201_ok(companies_response)
        company = cr_body["data"]["companies"][0]
        # act
        response = self.client.get(
            f"/problem/classification?company_id={company['id']}"
        )
        # assert
        body = self._expect_201_ok(response)
        self.assertGreater(len(body["data"]["classifications"]), 0)
        self.assertIsNotNone(body["data"]["company"])
        self.assertEqual(company, body["data"]["company"])

    def test_get_classifications_counts_company_does_not_exist(self):
        # arrange
        company_id = str(uuid.uuid4())
        # act
        response = self.client.get(f"/problem/classification?company_id={company_id}")
        # assert
        self._expect_error_response(response, 404)

    def test_get_problems_by_classification(self):
        # arrange
        classification = "Array"
        # act
        response = self.client.get(f"problem/classification/{classification}")
        # assert
        body = self._expect_201_ok(response)
        self.assertEqual(50, len(body["data"]["problems"]))
        self.assertEqual(classification, body["data"]["classification"]["name"])

    def test_get_problems_by_classification_out_of_bounds_pagination(self):
        # arrange
        classification = "Array"
        offset = 700
        limit = 200
        # act
        response = self.client.get(
            f"problem/classification/{classification}?start={offset}&limit={limit}"
        )
        # assert
        self._expect_error_response(response, 400)

    def test_get_problems_by_classification_classification_does_not_exist(self):
        # arrange
        classification = "Something that does not exist"
        # act
        response = self.client.get(f"/problem/classification/{classification}")
        # assert
        self._expect_error_response(response, 404)

    def _expect_201_ok(self, resp: Response) -> Any:
        self.assertEqual(201, resp.status_code)
        body = resp.json()
        self.assertIsNone(body["error"])
        self.assertIsNotNone(body["data"])
        return body

    def _expect_error_response(self, resp: Response, status_code: int):
        self.assertEqual(status_code, resp.status_code)
        body = resp.json()
        self.assertIsNone(body["data"])
        self.assertIsNotNone(body["error"])
        self.assertEqual(int(body["error"]["status_code"]), status_code)
        self.assertIsNotNone(body["error"]["message"])
