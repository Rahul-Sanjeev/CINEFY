#!/bin/bash
set -o errexit

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Install dependencies from requirements.txt
echo "Installing dependencies..."
pip install -r requirements.txt

# Collect static files (for production)
echo "Collecting static files..."
python manage.py collectstatic --no-input

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

echo "Build completed successfully."