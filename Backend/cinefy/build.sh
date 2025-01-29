#!/bin/bash
set -o errexit  # Exit the script if any command fails

# Print current directory for debugging
echo "Current directory: $(pwd)"

# Install Poetry if not already installed
if ! command -v poetry &> /dev/null; then
    echo "Installing Poetry..."
    pip install poetry
fi

# Install dependencies using Poetry
echo "Installing dependencies..."
poetry install

# Collect static files (for production)
echo "Collecting static files..."
poetry run python manage.py collectstatic --no-input

# Apply database migrations
echo "Applying database migrations..."
poetry run python manage.py migrate

echo "Build completed successfully."