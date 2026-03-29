from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Miniature
from .models import Manufacturer
from .models import Element
from .serializers import MiniatureSerializer
from .serializers import ManufacturerSerializer
from .serializers import ElementSerializer

class ManufacturerViewSet(ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

    @action(detail=True, methods=['get'], url_path='miniatures')
    def miniatures(self, request, pk=None):
        manufacturer = self.get_object()
        miniatures = manufacturer.miniatures.all()
        serializer = MiniatureSerializer(miniatures, many=True)
        return Response(serializer.data)

class MiniatureViewSet(ModelViewSet):
    queryset = Miniature.objects.all()
    serializer_class = MiniatureSerializer

    @action(detail=True, methods=['get'], url_path='elements')
    def elements(self, request, pk=None):
        miniature = self.get_object()
        elements = miniature.elements.all()
        serializer = ElementSerializer(elements, many=True)
        return Response(serializer.data)

class ElementViewSet(ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer
