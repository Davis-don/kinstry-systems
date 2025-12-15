from django.urls import path
from .views import create_newsletter_email, newsletter_stats, create_newsletter, list_newsletters
urlpatterns = [
    path('subscribe/', create_newsletter_email, name='subscribe_newsletter'),
    path('stats/', newsletter_stats, name='newsletter_stats'),
    path('create/', create_newsletter, name='create_newsletter'),
    path('list/', list_newsletters, name='list_newsletters'),
]