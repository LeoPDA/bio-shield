from django.urls import path

from .views import AuthenticateUserView, RegisterUserView, UploadImageView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register_user"),
    path("auth/", AuthenticateUserView.as_view(), name="authenticate_user"),
    path("upload/image/<str:user_id>/", UploadImageView.as_view(), name="upload_image")
]
