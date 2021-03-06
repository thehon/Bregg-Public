# Generated by Django 2.1.1 on 2018-10-22 04:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_group_midpoint'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='group_id',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='messages',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='user',
        ),
        migrations.RemoveField(
            model_name='message',
            name='sender',
        ),
        migrations.RemoveField(
            model_name='event',
            name='locationId',
        ),
        migrations.RemoveField(
            model_name='event',
            name='memberList',
        ),
        migrations.AddField(
            model_name='event',
            name='group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Group'),
        ),
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.TextField(default=''),
        ),
        migrations.DeleteModel(
            name='Chat',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]
