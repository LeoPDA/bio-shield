from rest_framework import viewsets

from .models import Toxin
from .serializers import ToxinSerializer


class ToxinViewSet(viewsets.ModelViewSet):
    queryset = Toxin.objects.all()
    serializer_class = ToxinSerializer
    filterset_fields = {
        "access_level": ["exact"],
    }
