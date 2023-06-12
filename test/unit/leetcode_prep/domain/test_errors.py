import unittest
from dataclasses import dataclass
from typing import List

from api.domain.errors import (
    PGRepoError,
    NotFoundError,
    ClientError,
    InvalidArgumentError,
    DataInConsistencyError,
    TAPIError,
    InternalError,
)


class TestDomainErrors(unittest.TestCase):
    def test_pg_repo_error(self):
        # arrange
        message = "error"
        code = "P9041"
        meta = "database internal error - failed to asked why"

        # act
        err = PGRepoError()
        err.message = message
        err.code = code
        err.meta = meta

        # assert
        self.assertEqual(err.code, code)
        self.assertEqual(err.message, message)
        self.assertEqual(err.meta, meta)

    @dataclass
    class Spec:
        description: str
        msg: str
        code: str
        err: TAPIError

    def verify_app_error(self, err: TAPIError, msg: str, code: str):
        err_name = err.__class__.__name__
        err.message = msg

        self.assertEqual(err.code, code)
        self.assertEqual(err.message, f"{err_name}: {msg}")

    def test_app_errors(self):
        test_cases: List[TestDomainErrors.Spec] = [
            TestDomainErrors.Spec(
                description="Not Found Error",
                msg="failed to find row in database",
                code="404",
                err=NotFoundError(),
            ),
            TestDomainErrors.Spec(
                description="Generic Client Error",
                msg="generic client error",
                code="400",
                err=ClientError(),
            ),
            TestDomainErrors.Spec(
                description="Invalid Argument Error",
                msg="invalid argument error",
                code="400",
                err=InvalidArgumentError(),
            ),
            TestDomainErrors.Spec(
                description="Internal Error",
                msg="unexpected internal error",
                code="500",
                err=InternalError(),
            ),
            TestDomainErrors.Spec(
                description="Internal Error",
                msg="problem with no attributes",
                code="500",
                err=DataInConsistencyError(),
            ),
        ]

        for tc in test_cases:
            with self.subTest(msg=tc.description):
                self.verify_app_error(tc.err, tc.msg, tc.code)
