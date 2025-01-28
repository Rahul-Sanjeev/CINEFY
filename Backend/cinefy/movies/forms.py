from django import forms

from .models import *


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = ("name", "release_year", "director", "casts", "genre",
                  "description", "poster_image", "trailer_video")
