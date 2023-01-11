from django.shortcuts import render
from django.contrib.auth import get_user_model


def showthis(request):

    all_users = get_user_model().objects.all()

    toSort = []
    for user in all_users:
        toSort.append(user)

    for i in range(len(toSort)):
        for j in range(len(toSort)):
            if toSort[i].profile.highScore > toSort[j].profile.highScore:
                temp = toSort[i]
                toSort[i] = toSort[j]
                toSort[j] = temp

    for i in range(len(toSort)):
        toSort[i].profile.rank = i + 1

    context = {'allusers': toSort}

    return render(request, 'pages/scoreboard.html', context)
