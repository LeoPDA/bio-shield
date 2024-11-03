"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Bio Shield API",
        default_version="v1",
        description=(
            "Bio Shield: SISTEMA DE IDENTIFICAÇÃO E AUTENTICAÇÃO BIOMÉTRICA FACIAL. "
            "Este projeto tem como objetivo demonstrar a implementação de um sistema de segurança "
            "baseado em validação biométrica facial, garantindo o acesso ao cofre oculto no "
            "Ministério do Meio Ambiente. O sistema possui três níveis de segurança:\n"
            "- Nível 1: Acesso concedido a indivíduos com permissão geral.\n"
            "- Nível 2: Acesso restrito a diretores de divisões.\n"
            "- Nível 3: Acesso exclusivo ao ministro do Meio Ambiente.\n\n"
            "Este sistema assegura que apenas usuários autorizados possam acessar informações sensíveis, "
            "contribuindo para a proteção de dados críticos."
        ),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/recognition/", include("project.recognition.urls")),
    path("api/", include("project.toxins.urls")),
    path("health/", lambda request: JsonResponse({"status": "ok"})),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
