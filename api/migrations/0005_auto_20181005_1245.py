# Generated by Django 2.1.2 on 2018-10-05 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20181005_0649'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='EmailAddress',
            field=models.EmailField(default='defaultemail@gmail.com', max_length=254),
        ),
        migrations.AddField(
            model_name='profile',
            name='Location',
            field=models.CharField(default='homeless', max_length=50),
        ),
    ]