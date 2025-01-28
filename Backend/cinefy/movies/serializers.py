from rest_framework import serializers

from .models import Movie, Review


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'  # Or specify the fields you want to include


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
