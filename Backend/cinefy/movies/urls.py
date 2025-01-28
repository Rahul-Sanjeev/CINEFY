from django.urls import path

from .views import (AddMovieView, CSRFTokenView, MovieDetailView,
                    MovieListView, ReviewDetailView, ReviewListView)

urlpatterns = [
    path('', MovieListView.as_view(), name='home'),  # API endpoint for React
    path('<int:id>/', MovieDetailView.as_view(), name='movie-details'),
    path('add/', AddMovieView.as_view(), name='add_movie'),
    path("csrf/", CSRFTokenView.as_view(), name="csrf-token"),

    # Review Section
    path('<int:movie_id>/reviews/', ReviewListView.as_view(), name='review-list'),

    path('<int:movie_id>/reviews/<int:review_id>/',
         ReviewDetailView.as_view(), name='review-detail'),
]


