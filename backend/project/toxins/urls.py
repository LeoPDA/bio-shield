from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ToxinViewSet

router = DefaultRouter()
router.register("toxins", ToxinViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
