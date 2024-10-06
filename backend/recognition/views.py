from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .services import UsuarioService


class AutenticarUsuarioView(APIView):
    def post(self, request):
        try:
            if imagem_enviada := request.FILES.get("imagem"):
                return (
                    Response({"nome": nome_usuario}, status=status.HTTP_200_OK)
                    if (
                        nome_usuario := UsuarioService.autenticar_usuario(
                            imagem_enviada
                        )
                    )
                    else Response(
                        {"error": "Usuário não encontrado."},
                        status=status.HTTP_404_NOT_FOUND,
                    )
                )
            else:
                return Response(
                    {"error": "Imagem não fornecida."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {"error": f"Erro durante autenticação: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CadastrarUsuarioView(APIView):
    def post(self, request):
        try:
            # Obter a imagem enviada (se houver)
            imagem = request.FILES.get("imagem")

            # Chamar o serviço para cadastrar o usuário
            dados, erros = UsuarioService.cadastrar_usuario(request.data, imagem)

            if erros:
                return Response(erros, status=status.HTTP_400_BAD_REQUEST)

            return Response(dados, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": f"Erro durante cadastro de usuário: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
