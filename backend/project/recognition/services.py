import os

import face_recognition
from django.conf import settings

from .repositories import UserRepository
from .serializers import UserSerializer

class UserService:
    @staticmethod
    def autenticar_usuario(image_enviada):
        # Carregar a imagem enviada para comparação
        image_enviada_array = face_recognition.load_image_file(image_enviada)
        try:
            image_enviada_encoding = face_recognition.face_encodings(image_enviada_array)[0]
        except IndexError:
            return None  # Caso a imagem enviada não contenha um rosto válido

        # Obter todos os usuários cadastrados
        users = UserRepository.get_all_usuarios()

        for user in users:
            # Carregar a imagem do usuário cadastrado
            image_usuario_array = face_recognition.load_image_file(user.image.path)
            image_usuario_encoding = face_recognition.face_encodings(image_usuario_array)[0]

            # Comparar as imagens
            resultado = face_recognition.compare_faces([image_usuario_encoding], image_enviada_encoding)

            if resultado[0]:  # Se as imagens forem iguais, retorne o usuário
                return user  # Retorna o objeto `User`

        return None  # Se nenhum usuário foi encontrado


    @staticmethod
    def cadastrar_usuario(data, image):
        # Adicionar a image aos dados enviados
        data["image"] = image

        # Inicializar o serializer com todos os dados (incluindo a image)
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            # Salvar o usuário no banco de dados, incluindo a image
            serializer.save()

            # Não precisa mais salvar a image manualmente, pois o serializer já lidou com isso

            return serializer.data, None

        return None, serializer.errors
    
    @staticmethod
    def salvar_image_usuario(user, image):
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