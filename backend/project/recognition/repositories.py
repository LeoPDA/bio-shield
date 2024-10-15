from project.recognition.models import User


class UserRepository:
    @staticmethod
    def get_all_usuarios():
        return User.objects.all()
