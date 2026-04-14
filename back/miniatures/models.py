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

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name = 'Miniature'
        verbose_name_plural = 'Miniatures'

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

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Element'
        verbose_name_plural = 'Elements'

class MiniaturePhoto(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    photo = models.ImageField(
        upload_to='miniature_photos/',
        verbose_name='Photo'
    )
    miniature = models.ForeignKey(
        Miniature,
        on_delete=models.CASCADE,
        related_name='photos',
        verbose_name='Miniature'
    )

    is_cover = models.BooleanField(
        default=False,
        verbose_name='Is Cover Photo'
    )

    def __str__(self):
        return f"{self.miniature.name} - {'Cover' if self.is_cover else 'Photo'}"
    
    class Meta:
        verbose_name = 'Miniature Photo'
        verbose_name_plural = 'Miniature Photos'