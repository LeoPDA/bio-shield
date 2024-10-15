import uuid

from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome = models.CharField(max_length=100)
    imagem = models.ImageField(upload_to="users/")

    class Meta:
        db_table = 'recognition_user'
