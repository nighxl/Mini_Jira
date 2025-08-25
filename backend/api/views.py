from django.contrib.auth.models import User
from django.db.models import Count
from rest_framework import generics, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Task
from .serializers import RegisterSerializer, UserSerializer, TaskSerializer


# ✅ Register new users
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# ✅ Get current logged-in user info
class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# ✅ CRUD for user’s own tasks
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Each user sees only their own tasks
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Auto-assign logged in user as task owner
        serializer.save(user=self.request.user)


# ✅ Admin-only metrics endpoint (enhanced)
class AdminMetricsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_users = User.objects.count()
        total_tasks = Task.objects.count()

        # Users vs number of tasks
        users_tasks = (
            User.objects.annotate(task_count=Count("task"))
            .values("username", "task_count")
        )

        return Response({
            "total_users": total_users,
            "total_tasks": total_tasks,
            "users_tasks": list(users_tasks),
        })


# ✅ Custom JWT Serializer to include `is_staff`
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims inside JWT itself
        token["is_staff"] = user.is_staff
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Include `is_staff` in login response JSON
        data["is_staff"] = self.user.is_staff
        return data


# ✅ Custom Login View using our serializer
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
