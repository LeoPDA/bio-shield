from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    access_level = models.IntegerField(null=False)

    class Meta:
        db_table = "recognition_user"


class ImageUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='imagens')
    image = models.ImageField(upload_to="users/", null=False, blank=False)

    def __str__(self):
        return f"Imagem de {self.user.name}"