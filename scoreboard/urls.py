from django.urls import path, include
from . import views

urlpatterns = [
    path('scoreboard/', views.showthis, name="scoreboard"),
]
