from rest_framework import serializers

from .models import PaintingTechnique, Project, ProjectStep


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = "__all__"


class PaintingTechniqueSerializer(serializers.ModelSerializer):

    class Meta:
        model = PaintingTechnique
        fields = "__all__"


class ProjectStepSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectStep
        fields = "__all__"
