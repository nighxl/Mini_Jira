from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from django.contrib.auth.models import User
from .models import Task
from .serializers import RegisterSerializer, UserSerializer, TaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

# Register new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Get current user info
class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

# CRUD for tasks
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AdminMetricsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({
            "users": User.objects.count(),
            "tasks": Task.objects.count()
        })

# Create your views here.
