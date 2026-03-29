from django.db import models
import uuid

class Manufacturer(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    name = models.CharField(
        max_length=100,
        verbose_name='Name'
    )
    description = models.TextField(
        verbose_name='Description'
    )


class Miniature(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    name = models.CharField(
        max_length=100,
        verbose_name='Name'
    )
    description = models.TextField(
        verbose_name='Description'
    )
    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.CASCADE,
        related_name='miniatures',
        verbose_name='Manufacturer'
    )

class Element(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    name = models.CharField(
        max_length=100,
        verbose_name='Name'
    )
    description = models.TextField(
        verbose_name='Description'
    )
    
    miniature = models.ForeignKey(
        Miniature,
        on_delete=models.CASCADE,
        related_name='elements',
        verbose_name='Miniature'
    )