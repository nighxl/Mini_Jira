from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "completed", "user")
    list_filter = ("completed", "user")
    search_fields = ("title", "user__username")
# Register your models here.
