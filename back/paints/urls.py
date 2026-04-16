from rest_framework.routers import DefaultRouter

from .views import PaintTypeViewSet, PaintViewSet

router = DefaultRouter()
router.register(r"paints", PaintViewSet, basename="paint")
router.register(r"paint-types", PaintTypeViewSet, basename="paint-type")

urlpatterns = router.urls
