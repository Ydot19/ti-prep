import unittest
import dotenv
import pytest

from prep_api.adapter import postgres_connection
from prep_api.adapter.repository import TPostgresRepository, PostgresRepository
from prep_api.domain._types import records
from prep_api.domain.errors import InvalidArgumentError


class TestPostgresRepository(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        dotenv.load_dotenv()
        conn = postgres_connection.get_connection()
        cls.repo: TPostgresRepository = PostgresRepository(conn=conn)

    def test_select_companies(self):
        # arrange - none
        # act
        result = self.repo.select_companies()
        # assert
        self.assertLess(0, len(result))
        self.assertTrue(isinstance(result[0], records.CompanyRecord))

    def test_select_problems_with_pagination_and_limit(self):
        # arrange
        pagination_start = 0
        pagination_end = 10
        limit = pagination_end - pagination_start
        # act
        results_a = self.repo.select_problems_with_pagination_and_limit(
            pagination_start, limit
        )
        results_b = self.repo.select_problems_with_pagination_and_limit(
            pagination_start, limit
        )
        results_c = self.repo.select_problems_with_pagination_and_limit(
            pagination_start + 1, limit
        )
        # assert
        self.assertEqual(limit, len(results_a))
        self.assertEqual(limit, len(results_b))
        self.assertEqual(limit, len(results_c))
        self.assertEqual(
            results_a, results_b
        )  # should produce the same results given an offset and start
        self.assertNotEqual(
            results_b, results_c
        )  # should not equal because start is off by one

    def test_select_problems_with_pagination_and_limit_out_of_bounds(self):
        # arrange
        pagination_start = 2_000
        limit = 10
        # act
        with pytest.raises(InvalidArgumentError) as exc_info:
            _ = self.repo.select_problems_with_pagination_and_limit(
                pagination_start, limit
            )
        # assert
        self.assertIn("no problems found", str(exc_info.value.message))

    def test_select_companies_by_problem_id(self):
        # arrange
        start = (0,)
        limit = 1
        problems = self.repo.select_problems_with_pagination_and_limit(0, 1)
        self.assertEqual(limit, len(problems))
        problem = problems[0]

        # act
        result = self.repo.select_companies_by_problem_id(problem.id)

        # assert
        self.assertGreater(len(result), 0)

    def test_select_classifications(self):
        # arrange - none
        # act
        result = self.repo.select_classifications()
        # assert
        self.assertGreater(len(result), 0)

    def test_select_classifications_by_company(self):
        # arrange
        companies = self.repo.select_companies()
        all_classifications = self.repo.select_classifications()

        # act
        result = self.repo.select_classifications(company_id=companies[0].id)

        # assert
        self.assertGreater(len(result), 0)
        self.assertGreater(len(all_classifications), len(result))

    def test_select_problem_classifications_by_id(self):
        # arrange
        pagination_start = 0
        pagination_end = 1
        limit = pagination_end - pagination_start
        problems = self.repo.select_problems_with_pagination_and_limit(
            pagination_start, limit
        )
        self.assertEqual(1, len(problems))
        problem = problems[0]
        # act
        result = self.repo.select_problem_classifications_by_id(problem_id=problem.id)
        # assert
        self.assertGreater(len(result), 0)
        classification_set = set()
        for res in result:
            self.assertEqual(problem.id, res.problem_id)
            if res.classification in classification_set:
                self.fail("duplicate classification")
            else:
                classification_set.add(res.classification)

    def test_select_problems_by_classification(self):
        # arrange
        classification = "Array"
        pagination_start = 0
        pagination_end = 2
        limit = pagination_end - pagination_start

        # act
        result = self.repo.select_problems_by_classification(
            classification, pagination_start, limit
        )

        # assert
        self.assertEqual(limit, len(result))
        for res in result:
            attributes = self.repo.select_problem_classifications_by_id(res.id)
            target_problem_classification_record = records.ProblemClassificationRecord(
                problem_id=res.id, classification=classification
            )
            self.assertIn(target_problem_classification_record, attributes)
