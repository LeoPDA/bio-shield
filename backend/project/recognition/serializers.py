import os

from django.conf import settings
from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "nome", "imagem"]

    def create(self, validated_data):
        imagem = validated_data.pop(
            "imagem", None
        )  # Remove a imagem dos dados validados

        # Salva o usuário
        user = User.objects.create(**validated_data)

        # Se uma imagem foi fornecida, trate-a
        if imagem:
            self.salvar_imagem_usuario(user, imagem)

        return user

    def salvar_imagem_usuario(self, user, imagem):
        # Define o caminho completo para salvar a imagem
        extensao = os.path.splitext(imagem.name)[
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
            for chunk in imagem.chunks():
                destino.write(chunk)

        # Atualizar o campo de imagem no banco de dados
        user.imagem = os.path.join("users", novo_nome_arquivo)
        user.save()
