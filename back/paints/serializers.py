from rest_framework import serializers

from .models import Paint, PaintType


class PaintSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paint
        fields = "__all__"


class PaintTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaintType
        fields = "__all__"
