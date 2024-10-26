import uuid

from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    access_level = models.CharField(null=False, blank=False)
    email = models.EmailField()
    image = models.ImageField(upload_to="users/", null=False, blank=False)

    class Meta:
        db_table = "recognition_user"
