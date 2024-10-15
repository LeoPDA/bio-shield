import os

import face_recognition
from django.conf import settings

from .repositories import UserRepository
from .serializers import UserSerializer


class UserService:
    @staticmethod
    def autenticar_usuario(imagem_enviada):
        # Carregar a imagem enviada para comparação
        imagem_enviada_array = face_recognition.load_image_file(imagem_enviada)
        try:
            imagem_enviada_encoding = face_recognition.face_encodings(
                imagem_enviada_array
            )[0]
        except IndexError:
            return None

        # Obter todos os usuários cadastrados
        users = UserRepository.get_all_usuarios()

        for user in users:
            # Carregar a imagem do usuário
            imagem_usuario_array = face_recognition.load_image_file(user.imagem.path)
            # Codificar a imagem do usuário
            imagem_usuario_encoding = face_recognition.face_encodings(
                imagem_usuario_array
            )[0]

            # Comparar as imagens
            resultado = face_recognition.compare_faces(
                [imagem_usuario_encoding], imagem_enviada_encoding
            )

            if resultado[0]:  # Se as imagens forem iguais
                return user.nome

        return None

    @staticmethod
    def cadastrar_usuario(data, imagem):
        # Inicializar o serializer
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            # Salvar o usuário
            user = serializer.save()

            # Renomear a imagem para o ID do usuário
            if imagem:
                UserService.salvar_imagem_usuario(user, imagem)

            return (
                serializer.data,
                None,
            )  # Retorna os dados serializados se tudo for bem-sucedido

        return None, serializer.errors  # Retorna erros se o serializer falhar

    @staticmethod
    def salvar_imagem_usuario(user, imagem):
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
