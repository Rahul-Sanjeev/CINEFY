from django.contrib.auth.models import AbstractUser
from django.db import models


class UserAccount(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField('users.UserAccount', on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
