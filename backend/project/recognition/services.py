import os

import face_recognition
from django.conf import settings

from django.core.exceptions import ValidationError
from . import models

class UserService:
    @staticmethod
    def authenticate_user(image_sent: str, limite_similaridade: float = 0.6):

        image_sent_array = face_recognition.load_image_file(image_sent)
        
        try:
            image_sent_encoding = face_recognition.face_encodings(image_sent_array)[0]
        except IndexError:
            return None

        users = models.User.objects.prefetch_related('imagens').all()

        combination = 0
        results = []

        for user in users:
            for image_user in user.imagens.all():
                image_user_array = face_recognition.load_image_file(image_user.image.path)
                
                try:
                    image_user_encoding = face_recognition.face_encodings(image_user_array)[0]
                except IndexError:
                    continue

                # Calcular a distância entre as imagens
                distance = face_recognition.face_distance([image_user_encoding], image_sent_encoding)[0]

                # Verificar se a distância está abaixo do limite de similaridade
                if distance < limite_similaridade:
                    combination += 1
                    results.append((user, distance))

        # Imprimir o número de combinações encontradas
        print(f"A imagem enviada combina com {combination} usuário(s).")

        # Se houver usuários semelhantes, retornar o que tiver a menor distância
        if results:
            user_more_similar = min(results, key=lambda x: x[1])
            return user_more_similar[0]  # Retorna o objeto `user`, que é o mais similar

        return None


    @staticmethod
    def register_user(data):
        # Verifica se o email já está em uso
        if models.User.objects.filter(email=data["email"]).exists():
            return None, {"error": "Email já está em uso."}

        user = models.User(name=data["name"], email=data["email"], access_level=data["access_level"])
        try:
            user.full_clean()
            user.save() 
        except ValidationError as e:
            return None, {"error": str(e)}

        return {"id": user.id, "name": user.name, "email": user.email, "access_level": user.access_level}, None

    @staticmethod
    def upload_image_user(user_id, image):
        try:
            user = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return None, {"error": "Usuário não encontrado."}

        original_name = image.name 
        caminho_arquivo = os.path.join(settings.MEDIA_ROOT, "users", original_name)

        with open(caminho_arquivo, "wb+") as destino:
            for chunk in image.chunks():
                destino.write(chunk)

        # Atualizar o campo de imagem no banco de dados
        image_user = models.ImageUser(user=user, image=os.path.join("users", original_name))
        image_user.save()  # Salva a imagem vinculada ao usuário

        return {"id": user.id, "image": original_name}, None
