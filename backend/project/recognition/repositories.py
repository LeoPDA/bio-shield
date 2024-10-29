from project.recognition.models import User


class UserRepository:
    @staticmethod
    def get_all_users():
        return User.objects.all()