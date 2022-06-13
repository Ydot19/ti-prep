import dotenv

from prep_api.adapter import postgres_connection
from prep_api.adapter.repository import TPostgresRepository, PostgresRepository
from prep_api.app.application import TApplication, Application


def create_application() -> TApplication:
    dotenv.load_dotenv()
    conn = postgres_connection.get_connection()
    pg_repo: TPostgresRepository = PostgresRepository(conn=conn)
    return Application(postgres_repository=pg_repo)
