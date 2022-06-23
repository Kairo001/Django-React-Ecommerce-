"""Modelos de usurio"""

# Django
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Utilidades
import os

class UserAccountManager(BaseUserManager):
    """Administrador del modelo de usuarios para crear los diferentes roles."""
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):

        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            is_staff = is_staff,
            is_superuser = is_superuser,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    """Modelo para Usuarios."""
    email = models.EmailField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    is_active = models.BooleanField(
        default=True,
        help_text=(
            'Designa si este usuario debe ser tratado como activo.'
            'Desmarcar esto en lugar de eliminar usuarios.'
        ),
    )
    is_staff = models.BooleanField(
        default=False,
        help_text='Designa si el usuario puede iniciar sesión en el sitio de administración.'
    )

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        """Método para obtener el nombre completo del usuario."""
        return self.first_name + ' ' + self.last_name

    def get_short_name(self):
        """Método para obtener el nombre corto del usuario."""
        return self.first_name

    def __str__(self):
        return self.email