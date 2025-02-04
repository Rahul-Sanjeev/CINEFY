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

# ======= CREATE_SUPERUSER ======= #
if [[ $CREATE_SUPERUSER ]];
then
    echo "Checking for existing superuser..."
    if ! python Backend/manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists())" | grep -q "True"; then
        echo "Creating superuser..."
        python Backend/manage.py createsuperuser --no-input
        echo "=== Superuser created ==="
    else
        echo "Superuser already exists. Skipping creation."
    fi
fi