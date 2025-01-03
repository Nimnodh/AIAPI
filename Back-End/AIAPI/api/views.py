from django.shortcuts import render

from rest_framework import mixins,generics

from .models import UserProfile
from .serializer import UserProfileSerializer, SingUpSerializer

class UserProfileView(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.DestroyModelMixin,
                      generics.GenericAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
UserProfileViewAsView = UserProfileView.as_view()

class SingUpView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = SingUpSerializer
SingUpViewAsView = SingUpView.as_view()

