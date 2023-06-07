from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from prep_api.port.mapper import create_response_json
from prep_api.app import create_application
from prep_api.port import CreateServer


origins = [
    "http://localhost",
    "http://localhost:8080",
]
server = CreateServer().create_server().get_server()
server.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
application = create_application()


@server.get("/problems")
def get_problems(start: int = Query(default=0), limit: int = Query(default=50)):
    resp = application.get_problems(start, limit)
    return create_response_json(resp)


@server.get("/problems/company")
def get_companies():
    resp = application.get_companies()
    return create_response_json(resp)


@server.get("/problems/detail/{problem_id}")
def get_problem_details(problem_id: str):
    resp = application.get_problem_by_id(problem_id)
    return create_response_json(resp)


@server.get("/problems/classification")
def get_classifications(company_id: str | None = Query(default=None)):
    resp = application.get_classifications(company_id)
    return create_response_json(resp)


@server.get("/problems/classification/{classification_title}")
def get_problems_by_classification(
    classification_title: str,
    start: int = Query(default=0),
    limit: int = Query(default=50),
):
    resp = application.get_problems_by_classification(
        classification_title, start, limit
    )
    return create_response_json(resp)