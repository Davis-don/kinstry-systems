from django.contrib import admin
from .models import NewsletterSubscriber, Newsletter

# Subscriber admin
@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'subscribed_at')
    search_fields = ('email',)

# Newsletter admin
@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'scheduled_at', 'is_sent')
    search_fields = ('title',)
    list_filter = ('is_sent',)
