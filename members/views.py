from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.


def register_user(request):
    if request.method == "POST":
        email = request.POST['email']
        username = request.POST['username']
        password = request.POST['password']
        confPassword = request.POST['confirm-password']
        if password == confPassword:
            User.objects.create_user(
                email=email, password=password, username=username)
            return redirect('login')
        else:
            messages.success(
                request, "There was an error creating your account")
    else:
        return render(request, "pages/register.html")


def login_user(request):
    # handle submit
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return (redirect('account'))
        else:
            messages.success(request, 'login error, try again....')
            return redirect('login')

    # just show page
    else:
        return render(request, 'pages/signin.html', {})


def logout_user(request):
    logout(request)
    messages.success(request, 'logged out successfully')
    return redirect('login')
