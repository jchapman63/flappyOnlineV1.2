from django.urls import path, include
from . import views

urlpatterns = [
    path('game/', views.play_game, name='game'),
    path('end-game/', views.update_user_after_game, name='end-game'),
]
