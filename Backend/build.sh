#!/bin/bash
set -o errexit

# Add Backend directory to Python path
export PYTHONPATH="${PYTHONPATH}:/opt/render/project/src/Backend"

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate