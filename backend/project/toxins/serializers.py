# toxins/serializers.py
from rest_framework import serializers

from .models import Toxin


class ToxinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Toxin
        fields = "__all__"
