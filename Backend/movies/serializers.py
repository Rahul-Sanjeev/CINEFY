from rest_framework import serializers

from .models import Movie, Review
from django.conf import settings


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'  # Or specify the fields you want to include
        
    def get_poster_image(self, obj):
        if settings.DEBUG:  # Local development
            return self.context['request'].build_absolute_uri(obj.poster_image.url)
        else:  # Production (Cloudinary)
            return obj.poster_image.url


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(
        source='user.username')  # Include the username
    user_id = serializers.ReadOnlyField(source='user.id')  # Add user ID

    class Meta:
        model = Review
        fields = "__all__"
        # Automatically set user and timestamp
        read_only_fields = ['user', 'user_id', 'movie', 'created_at']

    def get_user(self, obj):
        return {"username": obj.user.username}
