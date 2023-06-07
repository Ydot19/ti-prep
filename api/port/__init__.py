from typing import TypeVar

from fastapi import FastAPI

APP_NAME = "prep_api"
VERSION = "0.1"

TCreateServer = TypeVar("TCreateServer", bound="CreateServer")


class CreateServer:
    def __init__(self):
        self.api_version = VERSION
        self.api_name = APP_NAME
        self.api: None | FastAPI = None

    def create_server(self) -> TCreateServer:
        self.api = FastAPI(
            version=self.api_version,
            description="simple api for fetching data on problems solved for interviews",
        )
        return self

    def get_server(self):
        return self.api
