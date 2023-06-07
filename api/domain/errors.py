from abc import abstractmethod, ABCMeta
from dataclasses import dataclass, field
from typing import TypeVar, Dict


@dataclass
class _Error:
    msg: str | None = field(default=None, init=True)
    cde: str | None = field(default=None, init=True)


class BaseError(object):
    __metaclass__ = ABCMeta

    @property
    @abstractmethod
    def message(self):
        pass

    @message.setter
    @abstractmethod
    def message(self, val: str):
        pass

    @property
    @abstractmethod
    def code(self) -> str:
        pass


"""
Postgres Repository Errors
"""


@dataclass
class _PGError(_Error):
    meta: str | None = field(default=None, init=True)


TPGRepoError = TypeVar("TPGRepoError", bound="PGRepoError")


class PGRepoError(BaseError, Exception):
    def __init__(self):
        self._error = _PGError()

    @property
    def message(self):
        return self._error.msg

    @message.setter
    def message(self, val: str):
        self._error.msg = val

    @property
    def meta(self):
        return self._error.meta

    @meta.setter
    def meta(self, val: str):
        self._error.meta = val

    @property
    def code(self) -> str:
        return self._error.cde

    @code.setter
    def code(self, c: str):
        self._error.cde = c


"""
API ERRORS
"""

TAPIError = TypeVar("TAPIError", bound="_APIError")


class AppError(BaseError, Exception):
    def __init__(self):
        self._error = _Error()

    def _get_name(self) -> str:
        return self.__class__.__name__

    @property
    def message(self):
        return f"{self._get_name()}: {self._error.msg}"

    @message.setter
    def message(self, msg: str):
        self._error.msg = msg

    @property
    def code(self) -> str:
        return self._error.cde

    def to_dict(self) -> Dict:
        return {"message": self.message, "status_code": self.code}


class NotFoundError(AppError):
    def __init__(self):
        super().__init__()
        self._error.cde = "404"


class ClientError(AppError):
    def __init__(self):
        super().__init__()
        self._error.cde = "400"


class InvalidArgumentError(ClientError):
    pass


class InternalError(AppError):
    def __init__(self):
        super().__init__()
        self._error.cde = "500"


class DataInConsistencyError(InternalError):
    pass
