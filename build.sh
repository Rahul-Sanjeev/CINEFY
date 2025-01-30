#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r Backend/cinefy/requirements.txt

# Apply environment variables
export DJANGO_SETTINGS_MODULE="cinefy.settings"
export PYTHONPATH=$(pwd)/Backend/cinefy

# Collect static files
python Backend/cinefy/manage.py collectstatic --noinput

# Run migrations
python Backend/cinefy/manage.py migrate
