from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'confirm_password',
            'date_of_birth',
            'role'
        )

    def validate(self, data):
        # Check passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match"}
            )

        # Django password strength validation
        validate_password(data['password'])

        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # remove before saving

        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            date_of_birth=validated_data.get('date_of_birth'),
            role=validated_data.get('role', 'customer')
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # 🔐 Add custom claims INTO JWT
        token['role'] = user.role
        token['username'] = user.username

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # 📦 Add extra fields to response body
        data['role'] = self.user.role
        data['username'] = self.user.username

        return data