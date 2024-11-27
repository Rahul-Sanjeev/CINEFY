from django.db import models

# Create your models here.


class Movie(models.Model):
    name = models.CharField(max_length=300)
    release_year = models.PositiveIntegerField()
    director = models.CharField(max_length=100)
    casts = models.CharField(max_length=1000)
    rating = models.FloatField()
    description = models.TextField(max_length=5000)
    poster_image = models.ImageField(upload_to='posters/')
    trailer_video = models.URLField()
    genre = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name
