from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import NewsletterSubscriberSerializer, NewsletterSerializer
from .models import NewsletterSubscriber, Newsletter

# Endpoint to subscribe a user to the newsletter
@api_view(['POST'])
def create_newsletter_email(request):
    serializer = NewsletterSubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Successfully subscribed to the newsletter."},
            status=201
        )
    return Response(serializer.errors, status=400)

# Endpoint to get newsletter subscriber stats
@api_view(['GET'])
def newsletter_stats(request):
    total = NewsletterSubscriber.objects.count()
    active = NewsletterSubscriber.objects.filter(is_active=True).count()
    inactive = NewsletterSubscriber.objects.filter(is_active=False).count()
    return Response({
        "total_subscribers": total,
        "active_subscribers": active,
        "inactive_subscribers": inactive
    }, status=200)

# Endpoint to create a newsletter
@api_view(['POST'])
def create_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Newsletter created successfully."},
            status=201
        )
    return Response(serializer.errors, status=400)

# Endpoint to list all newsletters
@api_view(['GET'])
def list_newsletters(request):
    newsletters = Newsletter.objects.all()
    serializer = NewsletterSerializer(newsletters, many=True)
    return Response(serializer.data, status=200)

# -----------------------------
# New: Fetch newsletters where is_sent=True
# -----------------------------
@api_view(['GET'])
def sent_newsletters(request):
    newsletters = Newsletter.objects.filter(is_sent=True)
    serializer = NewsletterSerializer(newsletters, many=True)
    return Response(serializer.data, status=200)

# -----------------------------
# New: Fetch newsletters where is_sent=False
# -----------------------------
@api_view(['GET'])
def unsent_newsletters(request):
    newsletters = Newsletter.objects.filter(is_sent=False)
    serializer = NewsletterSerializer(newsletters, many=True)
    return Response(serializer.data, status=200)
