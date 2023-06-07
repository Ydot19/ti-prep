from collections import namedtuple

ProblemRecord = namedtuple("ProblemRecord", "id title title_slug difficulty mastered")

ProblemClassificationRecord = namedtuple(
    "ProblemClassificationRecord", "problem_id classification"
)

CompanyRecord = namedtuple("CompanyRecord", "id name")

ClassificationRecord = namedtuple("ClassificationRecord", "classification count")
