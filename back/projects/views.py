from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import PaintingTechnique, Project
from .serializers import (PaintingTechniqueSerializer, ProjectSerializer,
                          ProjectStepSerializer)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=["get"], url_path="steps")
    def steps(self, request, pk=None):
        project = self.get_object()
        steps = project.steps.all()
        serializer = ProjectStepSerializer(steps, many=True)
        return Response(serializer.data)


class PaintingTechniqueViewSet(viewsets.ModelViewSet):
    queryset = PaintingTechnique.objects.all()
    serializer_class = PaintingTechniqueSerializer
