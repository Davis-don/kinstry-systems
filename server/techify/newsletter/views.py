from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import NewsletterSubscriberSerializer


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
