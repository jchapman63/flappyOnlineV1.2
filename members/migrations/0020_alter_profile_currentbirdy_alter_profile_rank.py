# Generated by Django 4.1.2 on 2023-01-10 01:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0019_alter_darkbluebirdy_img_alter_defaultbirdy_img_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='currentBirdy',
            field=models.CharField(default='images/birdyDown.png', max_length=100),
        ),
        migrations.AlterField(
            model_name='profile',
            name='rank',
            field=models.IntegerField(default=6),
        ),
    ]
