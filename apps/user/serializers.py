"""Serializadores para el modelo de Usuario"""

# Djoser
from djoser.serializers import UserCreateSerializer

# RestFramework
from rest_framework import serializers

# Django
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'get_full_name',
            'get_short_name'
        )