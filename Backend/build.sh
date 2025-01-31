#!/bin/bash
set -o errexit

# Load environment variables
export PYTHONPATH="${PYTHONPATH}:$(pwd)/Backend"

# Install dependencies
pip install -r Backend/requirements.txt

# Collect static files
python Backend/manage.py collectstatic --no-input

# Run database migrations
python Backend/manage.py migrate

# Create superuser (only in production)
if [ "$CREATE_SUPERUSER" = "true" ]; then
  python Backend/manage.py createsuperuser --no-input
fi

