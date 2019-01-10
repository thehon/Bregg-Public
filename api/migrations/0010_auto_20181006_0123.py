# Generated by Django 2.1.1 on 2018-10-06 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20181006_0122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='Friends',
            field=models.ManyToManyField(blank=True, default='none', null=True, related_name='_profile_Friends_+', to='api.Profile'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='Location',
            field=models.CharField(default='homeless', max_length=200, null=True),
        ),
    ]
