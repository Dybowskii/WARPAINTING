from rest_framework import serializers
from .models import Miniature
from .models import Manufacturer
from .models import Element

class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = [
            'pk',
            'name',
            'description',
        ]

class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = [
            'pk',
            'name',
            'description',
        ]

class MiniatureSerializer(serializers.ModelSerializer):
    elements = ElementSerializer(many=True, read_only=True)

    class Meta:
        model = Miniature
        fields = [
            'pk',
            'name',
            'description',
            'manufacturer',
            'elements',
        ]