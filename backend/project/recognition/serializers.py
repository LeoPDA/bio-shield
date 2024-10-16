import os

from django.conf import settings
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    access_level = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    image = serializers.ImageField(required=True)  # Certifique-se de que é um ImageField

    class Meta:
        model = User
        fields = ["id", "name", "email", "access_level", "image"]

    def create(self, validated_data):
        image = validated_data.pop(
            "image", None
        )  # Remove a image dos dados validados

        # Salva o usuário
        user = User.objects.create(**validated_data)

        # Se uma image foi fornecida, trate-a
        if image:
            self.salvar_image_usuario(user, image)

        return user

    def salvar_image_usuario(self, user, image):
        # Define o caminho completo para salvar a image
        extensao = os.path.splitext(image.name)[
            1
        ]  # Mantém a extensão do arquivo (ex: .jpg, .png)
        novo_nome_arquivo = (
            f"{user.id}{extensao}"  # Renomeia o arquivo com o ID do usuário
        )
        caminho_arquivo = os.path.join(
            settings.MEDIA_ROOT, "users", novo_nome_arquivo
        )

        # Salvar o arquivo renomeado
        with open(caminho_arquivo, "wb+") as destino:
            for chunk in image.chunks():
                destino.write(chunk)

        # Atualizar o campo de image no banco de dados
        user.image = os.path.join("users", novo_nome_arquivo)
        user.save()
