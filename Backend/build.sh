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


if [[ $CREATE_SUPERUSER ]];
then
    echo "Creating superuser"
    python Backend/manage.py createsuperuser --no-input
    echo "=== Superuser created ==="
fi