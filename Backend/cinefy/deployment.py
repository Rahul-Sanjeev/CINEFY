import os

import dj_database_url

from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [os.environ.get("RENDER_EXTERNAL_HOSTNAME")]
CSRF_TRUSTED_ORIGINS = ['https://'+os.environ.get("RENDER_EXTERNAL_HOSTNAME")]

DEBUG = False
SECRET_KEY = os.environ.get("SECRET_KEY")


CORS_ALLOWED_ORIGINS = ['https://localhost:5173']

STORAGES = {
    'default': {
        'BACKEND': 'django.core.file.storage.FileStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage',
    }
}

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get("DATABASE_URL"),
        conn_max_age=600,  # Connection pool will close and reopen every 600 seconds
    )
}
