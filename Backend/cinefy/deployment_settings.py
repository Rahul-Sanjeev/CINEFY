import os

import cloudinary
# Import the cloudinary.api for managing assets
import cloudinary.api
# Import the cloudinary.uploader for uploading assets
import cloudinary.uploader
import dj_database_url

from .settings import *

ALLOWED_HOSTS = [os.environ.get('RENDER_EXTERNAL_HOSTNAME')]
CSRF_TRUSTED_ORIGIN = ['https://'+os.environ.get('RENDER_EXTERNAL_HOSTNAME')]

DEBUG = False

SECRET_KEY = os.environ.get('SECRET_KEY')


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Must be after SecurityMiddleware
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    'https://cinefy-frontend.onrender.com',
    'http://localhost:3000'
]

CSRF_TRUSTED_ORIGINS = [
    'https://cinefy-frontend.onrender.com',
    'https://cinefy-backend-d1o0.onrender.com'
]

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SAMESITE = 'None'

CORS_ALLOW_CREDENTIALS = True

CORS_EXPOSE_HEADERS = ['Content-Type', 'Authorization', 'X-CSRFToken']

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]



DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}

# Add these security headers
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
USE_X_FORWARDED_HOST = True


# Cloudinary Configuration
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': 'rahulsanjeev',
    'API_KEY': '779534668767349',
    'API_SECRET': 'mhdY06TBcdzQu-MCBl4rQ9cQA8k'
}
# Cloudinary configuration (inherited from base settings)
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
