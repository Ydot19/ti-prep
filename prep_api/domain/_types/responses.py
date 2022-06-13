import abc
from dataclasses import dataclass
from typing import List, NamedTuple, Dict, TypeVar

from prep_api.domain._types import records


TypeTransformToDict = TypeVar("TypeTransformToDict", bound="TransformToDict")


class TransformToDict(abc.ABC):
    @abc.abstractmethod
    def _asdict(self):
        pass


@dataclass
class Company(TransformToDict):
    company_id: str
    company_name: str

    def _asdict(self):
        return {"id": self.company_id, "name": self.company_name}


@dataclass
class GetProblemByID(TransformToDict):
    data: records.ProblemRecord
    classification: List[str]
    companies: List[Company]

    def _asdict(self):
        return {
            "problem": self.data._asdict(),
            "classifications": self.classification,
            "companies": _common_list_namedtuple_to_dict(self.companies),
        }


@dataclass
class GetProblemsByClassification(TransformToDict):
    data: List[records.ProblemRecord]
    classification: List[records.ClassificationRecord] | None

    def _asdict(self):
        classification = None
        if self.classification and len(self.classification) == 1:
            as_dict = self.classification[0]._asdict()
            classification = {
                "name": as_dict["classification"],
                "total": as_dict["count"],
            }

        return {
            "problems": _common_list_namedtuple_to_dict(self.data),
            "classification": classification,
        }


@dataclass
class GetProblems(TransformToDict):
    data: List[records.ProblemRecord]

    def _asdict(self):
        return {"problems": _common_list_namedtuple_to_dict(self.data)}


@dataclass
class Companies(TransformToDict):
    data: List[records.CompanyRecord]

    def _asdict(self):
        return {"companies": _common_list_namedtuple_to_dict(self.data)}


@dataclass
class Classification(TransformToDict):
    data: List[records.ClassificationRecord]
    company: Company | None

    def _asdict(self):
        comp = None
        if self.company:
            comp = self.company._asdict()

        return {
            "classifications": _common_list_namedtuple_to_dict(self.data),
            "company": comp,
        }


def _common_list_namedtuple_to_dict(
    t: List[NamedTuple | TypeTransformToDict],
) -> List[Dict]:
    return [el._asdict() for el in t]
