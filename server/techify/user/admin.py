from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Fields to show in the user list table
    list_display = ('username', 'email', 'first_name', 'last_name', 'date_of_birth', 'role', 'is_staff', 'is_active')

    # Add custom fields to the edit form
    fieldsets = UserAdmin.fieldsets + (
        ('Additional info', {'fields': ('date_of_birth', 'role')}),
    )

    # Add custom fields to the create form
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional info', {'fields': ('date_of_birth', 'role')}),
    )
