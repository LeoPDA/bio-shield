from django.urls import path

from .views import AutenticarUserView, CadastrarUserView

urlpatterns = [
    path("register/", CadastrarUserView.as_view(), name="cadastrar_usuario"),
    path("auth/", AutenticarUserView.as_view(), name="autenticar_usuario"),
]
