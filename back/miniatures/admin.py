from django.contrib import admin
from .models import Manufacturer, Miniature, Element

@admin.register(Manufacturer)
class ManufacturerAdmin(admin.ModelAdmin):
    pass

@admin.register(Miniature)
class MiniatureAdmin(admin.ModelAdmin):
    pass

@admin.register(Element)
class ElementAdmin(admin.ModelAdmin):
    pass