#!/bin/bash
set -o errexit

# Set PYTHONPATH to include the Backend directory
export PYTHONPATH="${PYTHONPATH}:$(pwd)/Backend"

# Install dependencies
pip install -r Backend/requirements.txt

# Collect static files
python Backend/manage.py collectstatic --no-input

# Run migrations
python Backend/manage.py migrate

# Check if CREATE_SUPERUSER is set
if [[ "$CREATE_SUPERUSER" == "true" ]]; then
    echo "Creating Django superuser..."
    python Backend/manage.py createsuperuser \
        --username "$DJANGO_SUPERUSER_USERNAME" \
        --email "$DJANGO_SUPERUSER_EMAIL" \
        --no-input || true
fi
