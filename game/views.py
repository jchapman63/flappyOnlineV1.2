from django.shortcuts import render, HttpResponse
from members.models import Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
# Create your views here.


def play_game(request):
    return render(request, "pages/game.html")


@login_required
def update_user_after_game(request):
    # make changes to the user after the last game was played
    if request.method == "POST":
        score = int(request.POST['score'])
        flaps = int(request.POST['flaps'])
        user = request.user
        if user:
            user.profile.gamesPlayed += 1
            user.profile.flaps += flaps
            user.profile.coins += score
            if score > user.profile.highScore:
                user.profile.highScore = score
            user.save()

    return HttpResponse(status=204)
