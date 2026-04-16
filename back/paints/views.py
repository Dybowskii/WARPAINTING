from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Paint, PaintType
from .serializers import PaintSerializer, PaintTypeSerializer


class PaintViewSet(ModelViewSet):
    queryset = Paint.objects.all()
    serializer_class = PaintSerializer


class PaintTypeViewSet(ModelViewSet):
    queryset = PaintType.objects.all()
    serializer_class = PaintTypeSerializer

    @action(detail=True, methods=["get"], url_path="paints")
    def paints(self, request, pk=None):
        paint_type = self.get_object()
        paints = paint_type.paints.all()
        serializer = PaintSerializer(paints, many=True)
        return Response(serializer.data)
