from django.urls import path

from .views import AutenticarUsuarioView, CadastrarUsuarioView

urlpatterns = [
    path("register/", CadastrarUsuarioView.as_view(), name="cadastrar_usuario"),
    path("auth/", AutenticarUsuarioView.as_view(), name="autenticar_usuario"),
]
