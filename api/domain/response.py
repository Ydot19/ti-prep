from dataclasses import dataclass
from typing import Any, Dict, TypeVar, List, NamedTuple
from api.domain.errors import TAPIError

TAPIResponseBuilder = TypeVar("TAPIResponseBuilder", bound="APIResponseBuilder")


@dataclass
class _Response:
    data: List[NamedTuple] | None | NamedTuple = None
    err: TAPIError | None = None

    def to_dict(self) -> Dict:
        res = dict()
        data: List[Dict] | None | Dict = None

        if self.data:
            if isinstance(self.data, List):
                data = [el._asdict() for el in self.data]
            else:
                data = self.data._asdict()
        res["data"] = data

        error: None | Dict = None
        if self.err:
            error = self.err.to_dict()
        res["error"] = error

        return res


class APIResponseBuilder:
    def __init__(self):
        self._response: _Response = _Response()

    @property
    def error(self):
        return self._response.err

    @error.setter
    def error(self, err: TAPIError):
        self._response.err = err

    @property
    def data(self):
        if self._response is not None:
            return self._response.data

        return None

    @data.setter
    def data(self, val: Any):
        self._response.data = val

    def to_dict(self):
        return self._response.to_dict()
