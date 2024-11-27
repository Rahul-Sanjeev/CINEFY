from django.http import Http404, JsonResponse
from django.shortcuts import render

from .models import Movie

# Create your views here.


def home(request):
    all_movies = Movie.objects.all()
    movies_data = [
        {
            "id": movie.id,
            "name": movie.name,
            "release_year": movie.release_year,
            "director": movie.director,
            "casts": movie.casts,
            "rating": movie.rating,
            "description": movie.description,
            "image_url": movie.poster_image.url,
            "trailer_video": movie.trailer_video,
            "genre": movie.genre,
        }
        for movie in all_movies
    ]

    return JsonResponse({"movies_data": movies_data}, safe=False)


def details(request, id):
    try:
        movie = Movie.objects.get(id=id)
        movie_data = {
            "id": movie.id,
            "name": movie.name,
            "release_year": movie.release_year,
            "director": movie.director,
            "casts": movie.casts,
            "rating": movie.rating,
            "description": movie.description,
            "image_url": movie.poster_image.url,
            "trailer_video": movie.trailer_video,
            "genre": movie.genre,
        }
        return JsonResponse(movie_data, safe=False)
    except Movie.DoesNotExist:
        raise Http404("Movie not found")
