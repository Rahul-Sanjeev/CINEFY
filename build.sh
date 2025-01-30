#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r Backend/cinefy/requirements.txt


# Collect static files
python Backend/cinefy/manage.py collectstatic --noinput

# Run migrations
python Backend/cinefy/manage.py migrate

