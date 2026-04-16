from rest_framework.routers import DefaultRouter

from .views import PaintingTechniqueViewSet, ProjectViewSet

router = DefaultRouter()

router.register(r"projects", ProjectViewSet, basename="project")
router.register(
    r"painting-techniques", PaintingTechniqueViewSet, basename="painting-technique"
)

urlpatterns = router.urls
