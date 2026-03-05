import psycopg2
import os

def get_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "postgres"),
        database=os.getenv("DB_NAME", "skyalert"),
        user=os.getenv("DB_USER", "admin"),
        password=os.getenv("DB_PASS", "admin123")
    )
    return conn
