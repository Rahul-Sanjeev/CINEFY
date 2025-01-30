#!/bin/bash
set -o errexit

# Install dependencies
pip install -r Backend/requirements.txt

# Collect static files
python Backend/manage.py collectstatic --no-input

# Run migrations
python Backend/manage.py migrate

# Add Backend to the Python path
export PYTHONPATH="${PYTHONPATH}:/opt/render/project/src/Backend"