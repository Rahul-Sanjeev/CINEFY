#!/bin/bash
set -o errexit

# Add Backend directory to Python path
export PYTHONPATH="${PYTHONPATH}:/opt/render/project/src/Backend"

# Install dependencies from Backend/requirements.txt
pip install -r Backend/requirements.txt  # Adjust path if needed

# Collect static files
python Backend/manage.py collectstatic --no-input

# Run migrations
python Backend/manage.py migrate