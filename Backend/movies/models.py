from django.conf import settings  # Import settings to use AUTH_USER_MODEL
from django.db import models

# Create your models here.


class Movie(models.Model):
    name = models.CharField(max_length=255)
    release_year = models.CharField(max_length=4)
    director = models.CharField(max_length=255)
    casts = models.CharField(max_length=255)
    genre = models.CharField(max_length=255)
    rating = models.FloatField()
    description = models.TextField()
    poster_image = models.ImageField(
        upload_to='posters/', null=True, blank=True)  # Image field
    trailer_video = models.URLField()

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name


class Review(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    comments = models.TextField(max_length=10000)
    rating = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.user.username} on {self.movie.name}'
