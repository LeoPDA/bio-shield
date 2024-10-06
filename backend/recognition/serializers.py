import os

from django.conf import settings
from rest_framework import serializers

from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nome", "imagem"]

    def create(self, validated_data):
        imagem = validated_data.pop(
            "imagem", None
        )  # Remove a imagem dos dados validados

        # Salva o usuário
        usuario = Usuario.objects.create(**validated_data)

        # Se uma imagem foi fornecida, trate-a
        if imagem:
            self.salvar_imagem_usuario(usuario, imagem)

        return usuario

    def salvar_imagem_usuario(self, usuario, imagem):
        # Define o caminho completo para salvar a imagem
        extensao = os.path.splitext(imagem.name)[
            1
        ]  # Mantém a extensão do arquivo (ex: .jpg, .png)
        novo_nome_arquivo = (
            f"{usuario.id}{extensao}"  # Renomeia o arquivo com o ID do usuário
        )
        caminho_arquivo = os.path.join(
            settings.MEDIA_ROOT, "usuarios", novo_nome_arquivo
        )

        # Salvar o arquivo renomeado
        with open(caminho_arquivo, "wb+") as destino:
            for chunk in imagem.chunks():
                destino.write(chunk)

        # Atualizar o campo de imagem no banco de dados
        usuario.imagem = os.path.join("usuarios", novo_nome_arquivo)
        usuario.save()
