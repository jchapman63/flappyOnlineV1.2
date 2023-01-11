from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

# Create your views here.


def about_page(request):
    return render(request, 'pages/about.html', {})


@login_required
def account_page(request):
    # need to make view protected somehow
    return render(request, 'base_templates/user-basics.html', {})


@login_required
def store_page(request):
    # need to make view protected somehow
    return render(request, 'base_templates/store.html', {})


def scoreboard_page(request):
    return render(request, 'pages/scoreboard.html', {})
