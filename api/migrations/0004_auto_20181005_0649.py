# Generated by Django 2.1.1 on 2018-10-05 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20181005_0620'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='FirstName',
            field=models.CharField(default='firstname', max_length=50),
        ),
        migrations.AddField(
            model_name='profile',
            name='LastName',
            field=models.CharField(default='lastname', max_length=50),
        ),
    ]
