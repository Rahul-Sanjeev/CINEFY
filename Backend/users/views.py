from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserLoginSerializer, UserRegisterSerializer


# Registration view
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # This will create the user
            # Create a token for the new user
            token = Token.objects.create(user=user)
            return Response({
                'message': 'User created successfully',
                'token': token.key  # Return the token
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Login view
@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'message': 'Login successful',
                    'token': token.key,  # Return the token
                    'user': {  # Include user details
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                    }
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request):
    if request.user.is_authenticated:
        return Response({'id': request.user.id, 'username': request.user.username, 'first_name': request.user.first_name, 'last_name': request.user.last_name, 'email': request.user.email})
    return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
