from django.urls import path
from .views import UserProfileViewAsView, SingUpViewAsView , ChangePasswordViewAsView

urlpatterns = [
    path('user/', UserProfileViewAsView,name='user'),
    path('signup/', SingUpViewAsView,name='signup'),
    path('change-password/', ChangePasswordViewAsView,name='change-password'),
]