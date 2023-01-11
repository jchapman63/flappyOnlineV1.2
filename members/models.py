
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
# Create your models here.


class Profile(models.Model):
    allUsers = get_user_model().objects.all()

    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    rank = models.IntegerField(default=len(allUsers))
    highScore = models.IntegerField(default=0)
    coins = models.IntegerField(default=0)
    flaps = models.IntegerField(default=0)
    gamesPlayed = models.IntegerField(default=0)
    currentBirdy = models.CharField(
        default='images/birdy.png', editable=True, max_length=100)
    currentBirdyDown = models.CharField(
        default='images/birdyDown.png', editable=True, max_length=100)
    unlockedBirds = models.JSONField(default={
                                     "Default": True})

    def __str__(self):
        return self.user.username


@ receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@ receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class DefaultBirdy(models.Model):
    img = models.CharField(
        default='images/birdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=0)
    name = models.CharField(default="Default", max_length=20)

    def purchase(user):
        if user.profile.coins > DefaultBirdy.price:
            user.profile.coins -= DefaultBirdy.price
            user.profile.unlockedBirds.update({"Default": True})
            # DefaultBirdy.img.field

    def get():
        return 'Default'

    def fileName():
        return 'images/birdy.png'

    def flappedFileName():
        return 'images/birdyDown.png'


class DarkBlueBirdy(models.Model):
    img = models.CharField(
        default='images/birds/darkBirdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=50)
    name = models.CharField(default="Dark Blue", max_length=20)

    def purchase(user):
        if user.profile.coins > 50:
            user.profile.coins -= 50
            user.profile.unlockedBirds.update({"Dark Blue": True})

    def get():
        return 'Dark Blue'

    def fileName():
        return 'images/birds/darkBirdy.png'

    def flappedFileName():
        return 'images/birds/darkBirdyDown.png'


class GreenBirdy(models.Model):
    img = models.CharField(
        default='images/birds/greenBirdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=100)
    name = models.CharField(default="Green", max_length=20)

    def purchase(user):
        if user.profile.coins > 100:
            user.profile.coins -= 100
            user.profile.unlockedBirds.update({"Green": True})

    def get():
        return 'Green'

    def fileName():
        return 'images/birds/greenBirdy.png'

    def flappedFileName():
        return 'images/birds/greenBirdyDown.png'


class LiteBirdy(models.Model):
    img = models.CharField(
        default='images/birds/liteBirdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=150)
    name = models.CharField(default="Lite Blue", max_length=20)

    def purchase(user):
        if user.profile.coins > 150:
            user.profile.coins -= 150
            user.profile.unlockedBirds.update({"Lite Blue": True})

    def get():
        return 'Lite Blue'

    def fileName():
        return 'images/birds/liteBirdy.png'

    def flappedFileName():
        return 'images/birds/liteBirdyDown.png'


class PinkBirdy(models.Model):
    img = models.CharField(
        default='images/birds/pinkBirdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=200)
    name = models.CharField(default="Pink", max_length=20)

    def purchase(user):
        if user.profile.coins > 200:
            user.profile.coins -= 200
            user.profile.unlockedBirds.update({"Pink": True})

    def get():
        return 'Pink'

    def fileName():
        return 'images/birds/pinkBirdy.png'

    def flappedFileName():
        return 'images/birds/pinkBirdyDown.png'


class RedBirdy(models.Model):
    img = models.CharField(
        default='images/birds/redBirdy.png', editable=True, max_length=100)
    price = models.IntegerField(default=250)
    name = models.CharField(default="Red", max_length=20)

    def purchase(user):
        if user.profile.coins > 250:
            user.profile.coins -= 250
            user.profile.unlockedBirds.update({"Red": True})

    def get():
        return 'Red'

    def fileName():
        return 'images/birds/redBirdy.png'

    def flappedFileName():
        return 'images/birds/redBirdyDown.png'
