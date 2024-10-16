import uuid

from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    access_level = models.CharField()
    email = models.CharField()
    image = models.ImageField(upload_to="users/")

    class Meta:
        db_table = 'recognition_user'
