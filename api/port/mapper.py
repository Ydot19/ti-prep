from fastapi.responses import JSONResponse

from api.domain.response import TAPIResponseBuilder


def create_response_json(resp: TAPIResponseBuilder):
    if resp.error:
        return JSONResponse(status_code=int(resp.error.code), content=resp.to_dict())

    return JSONResponse(status_code=201, content=resp.to_dict())
