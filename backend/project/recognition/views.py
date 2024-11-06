from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from .services import UserService


class AuthenticateUserView(APIView):
    def post(self, request):
        try:

            if not (image_sent := request.FILES.get("image")):
                return Response(
                    {"error": "image não fornecida."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            auth_result = UserService.authenticate_user(image_sent)

            if auth_result == "just_one_person":
                return Response(
                    {"error": "Por favor, envie uma imagem com apenas uma pessoa."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not auth_result:
                return Response(
                    {"error": "Usuário não encontrado."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            user_data = UserSerializer(auth_result).data

            return (
                Response(
                    user_data,
                    status=status.HTTP_200_OK,
                )
                if auth_result.access_level in [1, 2, 3]
                else Response(
                    {"error": "Nível de acesso não autorizado."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            )
        except Exception as e:
            return Response(
                {"error": f"Erro durante autenticação: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
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
                return Response(
                    {"error": "Nenhuma imagem enviada."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            dados, erros = UserService.upload_image_user(user_id, image)
            if erros:
                return Response(erros, status=status.HTTP_400_BAD_REQUEST)

            return Response(dados, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": f"Erro durante o upload da imagem: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
