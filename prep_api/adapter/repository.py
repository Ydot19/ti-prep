import psycopg2.extras
import psycopg2.errors
from prep_api.adapter import sql
from typing import List, Tuple, Any, TypeVar
from prep_api.domain._types import records
from prep_api.domain.errors import (
    TPGRepoError,
    PGRepoError,
    NotFoundError,
    InvalidArgumentError,
)

TPostgresRepository = TypeVar("TPostgresRepository", bound="PostgresRepository")


class PostgresRepository:
    def __init__(self, conn):
        self.__conn = conn

    def select_problem_by_id(self, problem_id: str) -> List[records.ProblemRecord]:
        res = self._on_select(sql.SELECT_PROBLEM_BY_ID, (problem_id,))
        if len(res) == 0:
            self.throw_not_found_error(f"problem not found (problem_id={problem_id})")
        return [records.ProblemRecord(*el) for el in res]

    def select_problem_classifications_by_id(
        self, problem_id: str
    ) -> List[records.ProblemClassificationRecord]:
        res = self._on_select(sql.SELECT_PROBLEM_CLASSIFICATIONS_BY_ID, (problem_id,))
        return [records.ProblemClassificationRecord(*el) for el in res]

    def select_problems_with_pagination_and_limit(
        self, offset: int, limit: int
    ) -> List[records.ProblemRecord]:
        res = self._on_select(
            sql.SELECT_PROBLEMS_WITH_PAGINATION_AND_LIMIT,
            (
                offset,
                limit,
            ),
        )
        if len(res) == 0:
            self.throw_invalid_argument_error(
                f"no problems found (offset={offset}, limit={limit})"
            )
        return [records.ProblemRecord(*el) for el in res]

    def select_companies(self) -> List[records.CompanyRecord]:
        res = self._on_select(sql.SELECT_COMPANIES, ())
        return [records.CompanyRecord(*el) for el in res]

    def select_company_by_id(self, company_id: str) -> List[records.CompanyRecord]:
        res = self._on_select(sql.SELECT_COMPANY_BY_ID, (company_id,))
        if len(res) == 0:
            self.throw_not_found_error(f"no company found (company_id={company_id})")
        return [records.CompanyRecord(*el) for el in res]

    def select_classification_by_name(
        self, classification: str
    ) -> List[records.ClassificationRecord]:
        """
        returns the classification id and name if it exists
        otherwise raise a NotFoundError Exception
        :param classification:
        :return:
        """
        res = self._on_select(sql.SELECT_CLASSIFICATION_BY_NAME, (classification,))
        if len(res) == 0:
            self.throw_not_found_error(
                f"classification not found (classification={classification})"
            )

        return [records.ClassificationRecord(*el) for el in res]

    def select_classifications(self, company_id: str | None = None):
        """
        Select classification and the count for all or by company uuid id
        :param company_id:
        :return:
        """
        if company_id:
            res = self._on_select(sql.SELECT_CLASSIFICATIONS_BY_COMPANY, (company_id,))
        else:
            res = self._on_select(sql.SELECT_CLASSIFICATIONS, ())

        return [records.ClassificationRecord(*el) for el in res]

    def select_companies_by_problem_id(
        self, problem_id: str
    ) -> List[records.CompanyRecord]:
        res = self._on_select(sql.SELECT_COMPANIES_BY_PROBLEM_ID, (problem_id,))
        return [records.CompanyRecord(*el) for el in res]

    def select_problems_by_classification(
        self, classification: str, offset: int, limit: int
    ) -> List[records.ProblemRecord]:
        res = self._on_select(
            sql.SELECT_PROBLEMS_BY_CLASSIFICATION_WITH_PAGINATION_AND_LIMIT,
            (
                classification,
                offset,
                limit,
            ),
        )
        if len(res) == 0:
            self.throw_invalid_argument_error(
                f"no problems with attribute={classification}, offset={offset}, limit={limit}"
            )

        return [records.ProblemRecord(*el) for el in res]

    def _on_select(self, query: str, params: Tuple) -> List[Tuple[Any]]:
        with self.__conn.cursor() as cursor:
            try:
                cursor.execute(query, params)
                res: List[Tuple] = cursor.fetchall()
            except psycopg2.errors.OperationalError as e:
                raise self.generate_error("Operational Error", query, e)
            except psycopg2.errors.InternalError as e:
                raise self.generate_error("Internal Error", query, e)
            except psycopg2.errors.DatabaseError as e:
                raise self.generate_error("Unexpected Database Error", query, e)

        return res

    @staticmethod
    def generate_error(
        prefix: str, query: str, err: psycopg2.errors.Error
    ) -> TPGRepoError:
        ret: TPGRepoError = PGRepoError()
        ret.message = f"{prefix} while executing query: {query}"
        ret.code = err.pgcode
        ret.meta = err.pgerror
        return ret

    @staticmethod
    def throw_not_found_error(message):
        err = NotFoundError()
        err.message = message
        raise err

    @staticmethod
    def throw_invalid_argument_error(message):
        err = InvalidArgumentError()
        err.message = message
        raise err
