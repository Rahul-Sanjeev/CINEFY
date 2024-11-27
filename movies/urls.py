from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),  # API endpoint for React
    # API endpoint for React to fetch movie details by ID
    path('<int:id>/', views.details, name='movie-details'),

]
