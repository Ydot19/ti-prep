import uvicorn as uvicorn
from fastapi import Query
from prep_api.port.mapper import create_response_json
from prep_api.app import create_application
from prep_api.port import CreateServer, PORT

server = CreateServer().create_server().get_server()
application = create_application()


@server.get("/problem")
def get_problems(start: int = Query(default=0), limit: int = Query(default=50)):
    resp = application.get_problems(start, limit)
    return create_response_json(resp)


@server.get("/problem/company")
def get_companies():
    resp = application.get_companies()
    return create_response_json(resp)


@server.get("/problem/details/{problem_id}")
def get_problem_details(problem_id: str):
    resp = application.get_problem_by_id(problem_id)
    return create_response_json(resp)


@server.get("/problem/classification")
def get_classifications(company_id: str | None = Query(default=None)):
    resp = application.get_classifications(company_id)
    return create_response_json(resp)


@server.get("/problem/classification/{classification_title}")
def get_problems_by_classification(
    classification_title: str,
    start: int = Query(default=0),
    limit: int = Query(default=50),
):
    resp = application.get_problems_by_classification(
        classification_title, start, limit
    )
    return create_response_json(resp)


if __name__ == "__main__":
    uvicorn.run(server, port=PORT)
