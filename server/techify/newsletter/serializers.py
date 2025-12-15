from rest_framework import serializers
from .models import NewsletterSubscriber


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']

    def validate_email(self, value):
        # Check if email already exists
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "You have already subscribed."
            )
        return value
