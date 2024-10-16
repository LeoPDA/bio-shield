from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import UserService

from .serializers import UserSerializer

class AutenticarUserView(APIView):
    def post(self, request):
        try:
            # Verificar se a imagem foi enviada
            if image_enviada := request.FILES.get("image"):
                # Autenticar o usuário com a imagem
                user = UserService.autenticar_usuario(image_enviada)

                if user:
                    # Verificar se o nível de acesso é um dos permitidos
                    if user.access_level in ["diretor", "ministro", "individuo"]:
                        # Retornar o nome e o nível de acesso do usuário autenticado
                        return Response(
                            {"nome": user.name, "access_level": user.access_level},
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
                # Se a imagem não for fornecida na requisição
                return Response(
                    {"error": "Imagem não fornecida."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            # Capturar erros inesperados durante a autenticação
            return Response(
                {"error": f"Erro durante autenticação: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class CadastrarUserView(APIView):
    def post(self, request):
        try:
            # Obter os dados da requisição
            dados_usuario = {
                "name": request.data.get("name"),
                "email": request.data.get("email"),
                "access_level": request.data.get("access_level"),
            }

            # Obter a image enviada
            image = request.FILES.get("image")
            print(image)
            # Chamar o serviço para cadastrar o usuário
            dados, erros = UserService.cadastrar_usuario(dados_usuario, image)
            print(erros)
            if erros:
                return Response(erros, status=status.HTTP_400_BAD_REQUEST)

            return Response(dados, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": f"Erro durante cadastro de usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )