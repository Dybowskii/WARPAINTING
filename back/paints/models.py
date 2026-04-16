import uuid

from django.db import models
from miniatures.models import Manufacturer


class PaintType(models.Model):

    uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)

    name = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Paint(models.Model):

    uuid = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)

    name = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.CASCADE,
        related_name="paints",
    )

    type = models.ForeignKey(
        PaintType,
        on_delete=models.SET_NULL,
        related_name="paints",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name
