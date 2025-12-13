from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()  # Get your CustomUser model dynamically

class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is write-only

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'date_of_birth', 'role')
    
    def create(self, validated_data):
        # Use create_user to properly hash the password
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
