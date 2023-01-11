from django.urls import path, include
from . import views

urlpatterns = [
    path('store/', views.birdStore, name="store"),
    path('inventory/', views.changeBirdy, name="inventory"),
]
