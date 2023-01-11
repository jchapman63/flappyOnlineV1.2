from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.about_page, name="about"),
    path('account/', views.account_page, name="account"),
    # path('store/', views.store_page, name="store"),
    path(
        'account/', include('birdys.urls')
    ),
    # path('scoreboard/', views.scoreboard_page, name="scoreboard"),
]
