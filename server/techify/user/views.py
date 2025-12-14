from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CreateUserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

# Create your views here.
@api_view(['POST'])
def Register_user(request):
    if request.method == 'POST':
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"detail": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer