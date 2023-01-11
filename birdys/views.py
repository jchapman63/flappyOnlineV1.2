from django.shortcuts import render, redirect
from django.apps import apps
from django.contrib.auth import get_user_model
# Create your views here.

defBirdy = apps.get_model('members', 'DefaultBirdy')
darkBirdy = apps.get_model('members', 'DarkBlueBirdy')
greenBirdy = apps.get_model('members', 'GreenBirdy')
liteBirdy = apps.get_model('members', 'LiteBirdy')
pinkBirdy = apps.get_model('members', 'PinkBirdy')
redBirdy = apps.get_model('members', 'RedBirdy')
birdList = [defBirdy, darkBirdy, greenBirdy, liteBirdy, pinkBirdy, redBirdy]


def birdStore(request):
    user = request.user
    unlocked = user.profile.unlockedBirds.items()
    userBirds = []
    for key, value in unlocked:
        if value == True:
            userBirds.append(key)
    context = {"birds": birdList, "userBirds": userBirds}

    if request.method == "POST":
        purchase = request.POST['purchase']
        for bird in birdList:
            if str(purchase) == bird.get():
                # user.profile.coins -= bird.price
                bird.purchase(user)
                user.save()
                return redirect('store')
            # else:
                # return redirect('store')

    else:
        return render(request, "base_templates/store.html", context)


def changeBirdy(request):
    allUsers = get_user_model().objects.all()
    # for user in allUsers:
    #     user.profile.currentBirdy = 'images/birdy.png'
    #     user.save()
    user = request.user
    unlocked = user.profile.unlockedBirds.items()
    userBirds = []
    for key, value in unlocked:
        if value == True:
            userBirds.append(key)

    context = {"userBirds": userBirds, "birds": birdList}

    if request.method == "POST":
        selected = request.POST['selected']
        for bird in birdList:
            if selected == bird.get():
                user.profile.currentBirdy = bird.fileName()
                user.profile.currentBirdyDown = bird.flappedFileName()
                user.save()
                return redirect('inventory')
    else:
        return render(request, "base_templates/inventory.html", context)
