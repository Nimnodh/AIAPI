from django.urls import path
from .views import UserProfileViewAsView, SingUpViewAsView

urlpatterns = [
    path('user/', UserProfileViewAsView,name='user'),
    path('signup/', SingUpViewAsView,name='signup'),
]