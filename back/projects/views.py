from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action

from .models import PaintingTechnique, Project
from .serializers import ProjectSerializer
from .serializers import PaintingTechniqueSerializer
from .serializers import ProjectStepSerializer

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=True, methods=['get'], url_path='steps')
    def steps(self, request, pk=None):
        project = self.get_object()
        steps = project.steps.all()
        serializer = ProjectStepSerializer(steps, many=True)
        return Response(serializer.data)
    
class PaintingTechniqueViewSet(viewsets.ModelViewSet):
    queryset = PaintingTechnique.objects.all()
    serializer_class = PaintingTechniqueSerializer
