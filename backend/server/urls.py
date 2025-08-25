from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from api.views import (
    RegisterView,
    UserView,
    TaskViewSet,
    AdminMetricsView,
    MyTokenObtainPairView,   # ✅ use custom login view
)

# Router for tasks
router = DefaultRouter()
router.register(r"tasks", TaskViewSet, basename="task")

urlpatterns = [
    path("admin/", admin.site.urls),

    # Auth routes
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", MyTokenObtainPairView.as_view(), name="login"),  # ✅ only this login
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/user/", UserView.as_view(), name="user"),

    # Admin-only metrics
    path("api/admin/metrics/", AdminMetricsView.as_view(), name="admin-metrics"),

    # Task routes
    path("api/", include(router.urls)),
]
