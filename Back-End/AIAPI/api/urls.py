from django.urls import path
from .views import UserProfileViewAsView, SingUpViewAsView , ChangePasswordViewAsView, SaveImageView
urlpatterns = [
    path('user/', UserProfileViewAsView,name='user'),
    path('signup/', SingUpViewAsView,name='signup'),
    path('change-password/', ChangePasswordViewAsView,name='change-password'),
    path('save-image/', SaveImageView.as_view(), name='save_image'),
]