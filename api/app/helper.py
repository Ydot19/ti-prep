import logging
from typing import Callable, Tuple, Any
from prep_api.domain.errors import PGRepoError, InternalError, AppError
from prep_api.domain.response import APIResponseBuilder, TAPIResponseBuilder


def app_response(f: Callable) -> Callable:
    def _wrapper(*args) -> APIResponseBuilder:
        resp = APIResponseBuilder()
        try:
            result = f(*args)
            if isinstance(result, Exception):
                resp.error = result
            else:
                resp.data = result
        except PGRepoError as error:
            logging.error(
                f"ERROR: (message:{error.message} - code: {error.code}) -"
                f" {error.meta}"
            )
            err = InternalError()
            err.message = error.message
            resp.error(err)
        except AppError as error:
            logging.info(f"ERROR: (message:{error.message} - code: {error.code})")
            resp.error = error
        return resp

    return _wrapper
