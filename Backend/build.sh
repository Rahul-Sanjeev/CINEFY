#!/bin/bash
set -o errexit

# Set the root project directory to Python path
export PYTHONPATH="${PYTHONPATH}:/opt/render/project/src"

# Install dependencies
pip install -r Backend/requirements.txt

# Collect static files
python Backend/manage.py collectstatic --no-input

# Run migrations
python Backend/manage.py migrate