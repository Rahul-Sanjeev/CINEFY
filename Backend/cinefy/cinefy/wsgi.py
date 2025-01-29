"""
WSGI config for cinefy project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

# Debugging: Print Python path
print("Python Path:", sys.path)

# Debugging: Print current directory
print("Current Directory:", os.getcwd())

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'Backend.cinefy.cinefy.settings')
application = get_wsgi_application()
