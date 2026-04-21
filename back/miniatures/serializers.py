import json

from PIL.ImagePalette import raw
from rest_framework import serializers

from .models import Element, Manufacturer, Miniature, MiniaturePhoto


class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturer
        fields = [
            "pk",
            "name",
            "description",
        ]


class ElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Element
        fields = [
            "pk",
            "name",
        ]


class MiniatureSerializer(serializers.ModelSerializer):
    elements = ElementSerializer(many=True, required=False)
    manufacturer_data = ManufacturerSerializer(source="manufacturer", read_only=True)
    cover_photo = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    class Meta:
        model = Miniature
        fields = [
            "pk",
            "name",
            "description",
            "manufacturer",
            "elements",
            "manufacturer_data",
            "cover_photo",
            "photos",
        ]


    def get_cover_photo(self, obj):
        request = self.context.get("request")
        cover_photo = obj.photos.filter(is_cover=True).first()

        if cover_photo and request:
            return request.build_absolute_uri(cover_photo.photo.url)

    def get_photos(self, obj):
        photos = obj.photos.all().filter(is_cover=False)
        return [photo.photo.url for photo in photos]

    def validate(self, attrs):
        if self.instance is None and not self.initial_data.get("cover_photo"):
            raise serializers.ValidationError(
                "Cover photo is required when creating a new miniature."
            )
        return super().validate(attrs)

    def create(self, validated_data):
        elements_data = self.initial_data.pop("elements", "[]")
        miniature = Miniature.objects.create(**validated_data)

        for element_data in elements_data:
            Element.objects.create(miniature=miniature, **json.loads(element_data))

        return miniature

    def update(self, instance, validated_data):
        elements_data = self.initial_data.get("elements", [])
        photos_data = self.initial_data.get("photos", [])
        cover_photo = self.initial_data.get("cover_photo", None)

        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.description)
        instance.manufacturer = validated_data.get(
            "manufacturer", instance.manufacturer
        )

        for element in instance.elements.all():
            element.delete()

        instance.save()

        for element_data in elements_data:
            Element.objects.create(miniature=instance, **element_data)

        for photo_data in photos_data:
            MiniaturePhoto.objects.create(miniature=instance, **photo_data)

        if cover_photo:
            instance.photos.filter(is_cover=True).delete()
            MiniaturePhoto.objects.create(
                miniature=instance, photo=cover_photo, is_cover=True
            )

        return instance
