from rest_framework.routers import DefaultRouter
from .views import ElementViewSet
from .views import ManufacturerViewSet
from .views import MiniatureViewSet

router = DefaultRouter()
router.register(r'miniatures', MiniatureViewSet, basename='miniature')
router.register(r'manufacturers', ManufacturerViewSet, basename='manufacturer')
router.register(r'elements', ElementViewSet, basename='element')

urlpatterns = router.urls