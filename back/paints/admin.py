from django.contrib import admin

from .models import Paint, PaintType


@admin.register(Paint)
class PaintAdmin(admin.ModelAdmin):
    pass


@admin.register(PaintType)
class PaintTypeAdmin(admin.ModelAdmin):
    pass
