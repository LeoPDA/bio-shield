from .models import Usuario


class UsuarioRepository:
    @staticmethod
    def get_all_usuarios():
        return Usuario.objects.all()
