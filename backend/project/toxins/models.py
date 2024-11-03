import uuid

from django.db import models

from .choices import ChoicesClassification


class Toxin(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    classification = models.CharField(choices=ChoicesClassification.choices)
    description = models.TextField()
    usage = models.TextField()
    risks = models.TextField()
    safety_recommendations = models.TextField()
    containment_plans = models.TextField(blank=True)
    impact_assessment = models.TextField(blank=True)
    access_level = models.IntegerField(
        null=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
