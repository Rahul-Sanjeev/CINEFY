set -o errexit

# Install dependencies
pip install -r Backend/cinefy/requirements.txt

# Collect static files (for production)
python Backend/cinefy/manage.py collectstatic --no-input

# Apply database migrations
python Backend/cinefy/manage.py migrate
