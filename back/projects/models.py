from django.db import models
from miniatures.models import Miniature
from miniatures.models import Element
from .mixins import ImageSaveMinix
import uuid

def project_image_path(instance, filename):
    return f'projects/{instance.project.pk}/{filename}'

def step_image_path(instance, filename):
    return f'projects/{instance.project_step.project.pk}/steps/{instance.project_step.pk}/{filename}'

class Project(models.Model):

    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )

    name  = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    miniature = models.ForeignKey(
        Miniature,
        on_delete=models.CASCADE,
        related_name='projects',
    )

    def __str__(self):
        return self.name
    
class PaintingTechnique(models.Model):

    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    
    name  = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name
    
class ProjectStep(models.Model):

    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )

    name  = models.CharField(
        max_length=255,
    )

    description = models.TextField(
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='steps',
    )

    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='substeps',
        null=True,
        blank=True,
    )

    element = models.ForeignKey(
        Element,
        on_delete=models.SET_NULL,
        related_name='project_steps',
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.name


class ProjectImage(ImageSaveMinix, models.Model):

    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )

    name = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    image = models.ImageField(
        upload_to=project_image_path,
        null=True,
        blank=True,
        max_length=255,
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='images',
    )

    def __str__(self):
        return self.name

class StepImage(ImageSaveMinix, models.Model):

    uuid = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    
    name = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )

    image = models.ImageField(
        upload_to=step_image_path,
        max_length=255,
    )

    project_step = models.ForeignKey(
        ProjectStep,
        on_delete=models.CASCADE,
        related_name='images',
    )

    def __str__(self):
        return self.name