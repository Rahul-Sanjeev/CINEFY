from django.urls import path

from .views import current_user, login, register

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('current-user/', current_user, name='current_user'),
]
