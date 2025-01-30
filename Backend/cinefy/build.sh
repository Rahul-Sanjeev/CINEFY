# #!/usr/bin/env bash
# # Exit on error
# set -o errexit

# # Set environment variables
# export DJANGO_SETTINGS_MODULE="Backend.cinefy.cinefy.settings"
# export PYTHONPATH=$(pwd)/Backend:$PYTHONPATH

# # Install dependencies
# pip install -r Backend/cinefy/requirements.txt

# # Collect static files
# python Backend/cinefy/manage.py collectstatic --noinput

# # Run migrations
# python Backend/cinefy/manage.py migrate

#!/bin/bash

# Ensure the virtual environment is activated
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Collect static files (important for Django)
python manage.py collectstatic --noinput

# Apply database migrations
python manage.py migrate

# Any other setup steps (e.g., database seeding, cache clearing, etc.)
echo "Build completed!"
