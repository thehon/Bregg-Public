# Generated by Django 2.1.1 on 2018-10-26 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20181026_0103'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='EmailAddress',
            field=models.EmailField(blank=True, default='defaultemail@gmail.com', max_length=180, null=True, unique=True),
        ),
    ]
