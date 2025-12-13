from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):
    role_type=(
        ('admin','Admin'),
        ('customer','Customer'),
        ('superadmin','SuperAdmin'),
    )
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.CharField(max_length=20, choices=role_type, default='customer')

    def __str__(self):
        return self.username
