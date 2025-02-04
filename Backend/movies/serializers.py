from django.conf import settings
from rest_framework import serializers

from .models import Movie, Review


class MovieSerializer(serializers.ModelSerializer):
    poster_image = serializers.ImageField(use_url=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'  # Or specify the fields you want to include
        read_only_fields = ['user']

    # Add this method to handle user assignment

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_poster_image_url(self, obj):
        if obj.poster_image:
            # Returns Cloudinary URL in production, local URL in development
            return obj.poster_image.url
        return None


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
