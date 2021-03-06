# Generated by Django 2.1.2 on 2018-10-12 02:19

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0010_auto_20181006_0123'),
    ]

    operations = [
        migrations.RenameField(
            model_name='group',
            old_name='group_name',
            new_name='groupName',
        ),
        migrations.AddField(
            model_name='availability',
            name='user',
            field=models.ManyToManyField(default=1, related_name='_availability_user_+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='event',
            name='locationId',
            field=models.ForeignKey(null=True, on_delete='CASCADE', to='api.Location'),
        ),
    ]
