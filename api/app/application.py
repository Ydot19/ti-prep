from typing import TypeVar

from api.adapter import repository
from api.app.helper import app_response
from api.domain._types.responses import (
    GetProblemByID,
    GetProblemsByClassification,
    Company,
    GetProblems,
    Companies,
    Classification,
)
from api.domain.errors import (
    NotFoundError,
    DataInConsistencyError,
    InvalidArgumentError,
    ClientError,
)

TApplication = TypeVar("TApplication", bound="Application")
DEFAULT_LIMIT = 30
DEFAULT_PAGINATION_START = 0


class Application:
    """
    Application Repository
    """

    def __init__(self, postgres_repository: repository.TPostgresRepository):
        self.postgres_repository: repository.TPostgresRepository = postgres_repository

    @app_response
    def get_problems(
        self, pagination_start: int | None, limit: int | None
    ) -> GetProblems:
        """
        Returns a list of problems given pagination attributes
        :param pagination_start:
        :param limit:
        :return:
        """
        pagination_start, limit = self.default_if_none(
            pagination_start, DEFAULT_PAGINATION_START
        ), self.default_if_none(limit, DEFAULT_LIMIT)

        # check for validation errors
        self.handle_pagination_error(pagination_start, limit)
        result = self.postgres_repository.select_problems_with_pagination_and_limit(
            pagination_start, limit
        )

        if len(result) == 0:
            err = ClientError
            err.message = "request out of bonds exception"
            raise err

        resp = GetProblems(data=result)
        return resp

    @app_response
    def get_problems_by_classification(
        self, classification: str, pagination_start: int, limit: int
    ):
        """
        Get a set of problems by attribute and company_id
        Apply Pagination with the start and end values
        :param classification: the type of problem (ex. Array, Linked List etc.)
        :param pagination_start:
        :param limit:
        :return:
        """
        pagination_start, limit = self.default_if_none(
            pagination_start, DEFAULT_PAGINATION_START
        ), self.default_if_none(limit, DEFAULT_LIMIT)

        classification_records = self.postgres_repository.select_classification_by_name(
            classification
        )

        # check for validation errors
        self.handle_pagination_error(pagination_start, limit)
        result = self.postgres_repository.select_problems_by_classification(
            classification, pagination_start, limit
        )
        resp = GetProblemsByClassification(
            data=result, classification=classification_records
        )
        return resp

    @app_response
    def get_problem_by_id(self, problem_id: str):
        """
        Get all the details related to a specific problem
        :param problem_id:
        :return:
        """
        problem_result = self.postgres_repository.select_problem_by_id(problem_id)
        problem_attribute_results = (
            self.postgres_repository.select_problem_classifications_by_id(problem_id)
        )
        associated_companies = self.postgres_repository.select_companies_by_problem_id(
            problem_id
        )
        if len(problem_result) == 1:
            if len(problem_attribute_results) == 0:
                err = DataInConsistencyError()
                err.message = f"failed to find problem classifications for problem id {problem_id}"
                raise err

            record = problem_result[0]
            resp = GetProblemByID(
                data=record,
                classification=[el.classification for el in problem_attribute_results],
                companies=[
                    Company(company_name=el.name, company_id=el.id)
                    for el in associated_companies
                ],
            )
            return resp
        else:
            err = NotFoundError()
            err.message = f"no problem with id {problem_id}"
            raise err

    @app_response
    def get_companies(self) -> Companies:
        """
        Returns a list of the companies for consideration
        :return:
        """
        result = self.postgres_repository.select_companies()
        return Companies(
            data=result,
        )

    @app_response
    def get_classifications(self, company_id: str | None) -> Classification:
        """
        Returns a count of the number of problems by classification
        If a company_id is provided, the count and classification will be specific to the problems tagged by with that
        company name
        :param company_id:
        :return:
        """
        company = None
        if company_id:
            company_records = self.postgres_repository.select_company_by_id(company_id)
            company = Company(
                company_id=company_records[0].id, company_name=company_records[0].name
            )

        result = self.postgres_repository.select_classifications(company_id)
        return Classification(data=result, company=company)

    @staticmethod
    def handle_pagination_error(pagination_start: int, limit: int):
        """
        Checks that pagination end is greater than pagination start
        :param limit:
        :param pagination_start:
        :return:
        """
        if pagination_start < 0 or pagination_start > 1200 or limit <= 0 or limit > 100:
            err = InvalidArgumentError()
            err.message = "limit must be between 1-100 (inclusive) and from must be between 0-1200 (inclusive)"
            raise err

    @staticmethod
    def default_if_none(
        current_value: int | str | None, default: int | str
    ) -> int | str:
        """
        if none, return default else return current value
        :param current_value:
        :param default:
        :return:
        """
        if current_value:
            return current_value

        return default
