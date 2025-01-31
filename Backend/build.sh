#!/bin/bash
set -o errexit

# Load environment variables
export PYTHONPATH="${PYTHONPATH}:$(pwd)/Backend"

# Install dependencies
pip install -r Backend/requirements.txt

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL environment variable not set!"
  exit 1
fi

# Run database migrations
python Backend/manage.py migrate

# Create superuser (only in production)
if [ "$CREATE_SUPERUSER" = "true" ]; then
  python Backend/manage.py createsuperuser --no-input \
    --username "$DJANGO_SUPERUSER_USERNAME" \
    --email "$DJANGO_SUPERUSER_EMAIL"
fi

# Collect static files
python Backend/manage.py collectstatic --no-input