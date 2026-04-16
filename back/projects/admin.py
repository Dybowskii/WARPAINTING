from django.contrib import admin

from .models import (PaintingTechnique, Project, ProjectImage, ProjectStep,
                     StepImage)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(PaintingTechnique)
class PaintingTechniqueAdmin(admin.ModelAdmin):
    pass


@admin.register(ProjectStep)
class ProjectStepAdmin(admin.ModelAdmin):
    pass


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    pass


@admin.register(StepImage)
class StepImageAdmin(admin.ModelAdmin):
    pass
