from django.contrib import admin

from .models import Element, Manufacturer, Miniature


@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Miniature)
class MiniatureAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "manufacturer")


@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "miniature")
