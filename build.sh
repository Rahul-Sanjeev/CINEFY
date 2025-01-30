#!/usr/bin/env bash
# Exit on error
set -o errexit

# Set environment variables
export DJANGO_SETTINGS_MODULE="Backend.cinefy.cinefy.settings"
export PYTHONPATH=$(pwd)/Backend:$PYTHONPATH

# Install dependencies
pip install -r Backend/cinefy/requirements.txt

# Collect static files
python Backend/cinefy/manage.py collectstatic --noinput

# Run migrations
python Backend/cinefy/manage.py migrate