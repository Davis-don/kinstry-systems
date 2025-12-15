from rest_framework import serializers
from .models import NewsletterSubscriber, Newsletter

# -----------------------------
# Serializer for newsletter subscribers
# -----------------------------
class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']

    def validate_email(self, value):
        """
        Ensure the email is unique. Raise error if already subscribed.
        """
        if NewsletterSubscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError("You have already subscribed.")
        return value

# -----------------------------
# Serializer for newsletters
# -----------------------------
class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = [
            'title',
            'body',
            'created_at',
            'scheduled_at',
            'is_sent',
        ]
