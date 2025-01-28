set -o errexit
pip install -r Backend/cinefy/requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
