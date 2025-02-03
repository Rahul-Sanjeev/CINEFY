from django.middleware.csrf import get_token
from rest_framework import serializers, status
from rest_framework.generics import (DestroyAPIView, ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Movie, Review
from .serializers import MovieSerializer, ReviewSerializer


# CSRF Token View (No changes needed here)
class CSRFTokenView(APIView):
    def get(self, request):
        return Response({'csrfToken': get_token(request)})


# Movie List View (GET all movies)
class MovieListView(APIView):
    # Allow any user (no authentication required)
    permission_classes = [AllowAny]

    def get(self, request):
        movies = Movie.objects.all()
        serializer = MovieSerializer(
            movies, many=True, context={'request': request})
        return Response({"movies_data": serializer.data})


# Movie Detail View (GET single movie)
class MovieDetailView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Add this line

    def get(self, request, id):  # id is passed from the URL
        try:
            # Use `pk` for querying the database
            movie = Movie.objects.get(pk=id)
            serializer = MovieSerializer(movie)
            return Response(serializer.data)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            movie = Movie.objects.get(pk=id)
            serializer = MovieSerializer(
                movie, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):  # id is passed from the URL
        try:
            # Use `pk` for querying the database
            movie = Movie.objects.get(pk=id)
            movie.delete()
            return Response({"message": "Movie deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


# Add Movie View (POST to create a new movie)
class AddMovieView(APIView):
    parser_classes = [MultiPartParser, FormParser]  # Handle file uploads

    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Movie added successfully!"}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Update Movie View (PUT to update an existing movie)
class UpdateMovieView(UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def put(self, request, id):
        try:
            movie = Movie.objects.get(id=id)
            serializer = MovieSerializer(
                movie, data=request.data, partial=False)  # Full update
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Movie updated successfully!"}, status=status.HTTP_200_OK)
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


# Delete Movie View (DELETE to remove a movie)
class DeleteMovieView(DestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def delete(self, request, id):
        try:
            movie = Movie.objects.get(id=id)
            movie.delete()
            return Response({"message": "Movie deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            return Response({"error": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


# Review Section
class ReviewListView(ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        movie_id = self.kwargs['movie_id']
        return Review.objects.filter(movie_id=movie_id)

    # Add this method to set the user and movie when creating a review
    def perform_create(self, serializer):
        movie_id = self.kwargs['movie_id']
        movie = Movie.objects.get(pk=movie_id)
        serializer.save(user=self.request.user, movie=movie)

    # Enforce authentication for POST requests
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return super().get_permissions()


class ReviewDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        review_id = self.kwargs.get('review_id')
        return Review.objects.get(pk=review_id)

    def perform_update(self, serializer):
        # Ensure only the user who created the review can update it
        if self.get_object().user == self.request.user:
            serializer.save()
        else:
            raise serializer.ValidationError(
                "You do not have permission to edit this review.")

    def perform_destroy(self, instance):
        # Ensure only the user who created the review can delete it
        if instance.user == self.request.user:
            instance.delete()
        else:
            raise serializers.ValidationError(
                "You do not have permission to delete this review.")
