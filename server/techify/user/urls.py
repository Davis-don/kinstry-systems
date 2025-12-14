from django.urls import path
from .views import Register_user
urlpatterns = [
    path('new-user/', Register_user, name='register_user'),
]
