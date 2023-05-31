import os

from prep_api.adapter import postgres_connection
from prep_api.adapter.repository import TPostgresRepository, PostgresRepository
from prep_api.app.application import TApplication, Application


API_ENV = os.getenv("API_ENV", "local")


def set_environment():
    if API_ENV == "local":
        import dotenv

        dotenv.load_dotenv()


def create_application() -> TApplication:
    set_environment()
    conn = postgres_connection.get_connection()
    pg_repo: TPostgresRepository = PostgresRepository(conn=conn)
    return Application(postgres_repository=pg_repo)
