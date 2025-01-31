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

if [[$CREATE_SUPERUSER]];
then
    # Create a superuser
    python Backend/manage.py createsuperuser --no-input
    echo "Creating superuser..."
fi