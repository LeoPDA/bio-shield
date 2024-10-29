from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import UserService

class AuthenticateUserView(APIView):
    def post(self, request):
        try:
            if image_sent := request.FILES.get("image"):
                user = UserService.authenticate_user(image_sent)

                if user:
                    # Verificar se o nível de acesso é um dos permitidos
                    if user.access_level in [1, 2, 3]:
                        return Response(
                            {"name": user.name, "access_level": user.access_level},
                            status=status.HTTP_200_OK
                        )
                    else:
                        # Se o nível de acesso não for permitido
                        return Response(
                            {"error": "Nível de acesso não autorizado."},
                            status=status.HTTP_403_FORBIDDEN
                        )
                else:
                    # Caso nenhum usuário tenha sido encontrado
                    return Response(
                        {"error": "Usuário não encontrado."},
                        status=status.HTTP_404_NOT_FOUND
                    )
            else:
                return Response(
                    {"error": "image não fornecida."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            return Response(
                {"error": f"Erro durante autenticação: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RegisterUserView(APIView):
    def post(self, request):
        try:
            dados_user = {
                "name": request.data.get("name"),
                "email": request.data.get("email"),
                "access_level": request.data.get("access_level"),
            }

            dados, erros = UserService.register_user(dados_user)
            if erros:
                return Response(erros, status=status.HTTP_400_BAD_REQUEST)

            return Response(dados, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": f"Erro durante cadastro de usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class UploadImageView(APIView):
    def post(self, request, user_id):
        try:
            image = request.FILES.get("image")

            if not image:
                return Response({"error": "Nenhuma imagem enviada."}, status=status.HTTP_400_BAD_REQUEST)

            dados, erros = UserService.upload_image_user(user_id, image)
            if erros:
                return Response(erros, status=status.HTTP_400_BAD_REQUEST)

            return Response(dados, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": f"Erro durante o upload da imagem: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )