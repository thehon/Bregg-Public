# Generated by Django 2.1.1 on 2018-10-05 05:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('eventName', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='EventInvitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventId', models.ForeignKey(on_delete='CASCADE', to='api.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('LocationText', models.TextField()),
                ('LatLong', models.TextField(default='')),
                ('rating', models.IntegerField(default=0)),
                ('url', models.CharField(default='', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='MemberShip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.ForeignKey(on_delete='CASCADE', to='api.Group')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_text', models.TextField()),
                ('sent_time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Preferences',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Preference_Choice', models.CharField(choices=[('c', 'Chinese')], max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FirstName', models.CharField(max_length=50)),
                ('LastName', models.CharField(max_length=50)),
                ('EmailAddress', models.EmailField(max_length=254)),
                ('ProfileText', models.TextField()),
                ('Location', models.CharField(max_length=50)),
                ('Friends', models.ManyToManyField(blank=True, related_name='_profile_Friends_+', to='api.Profile')),
                ('User', models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reminderTime', models.DateTimeField()),
                ('EventId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Event')),
                ('UserId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('VoteOption', models.ForeignKey(on_delete='CASCADE', to='api.Location')),
                ('eventId', models.ForeignKey(on_delete='CASCADE', to='api.Event')),
                ('userid', models.ForeignKey(on_delete='CASCADE', to='api.Profile')),
            ],
        ),
        migrations.AddField(
            model_name='preferences',
            name='user',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Profile'),
        ),
        migrations.AddField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Profile'),
        ),
        migrations.AddField(
            model_name='membership',
            name='person',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Profile'),
        ),
        migrations.AddField(
            model_name='group',
            name='user',
            field=models.ManyToManyField(through='api.MemberShip', to='api.Profile'),
        ),
        migrations.AddField(
            model_name='event',
            name='locationId',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Location'),
        ),
        migrations.AddField(
            model_name='event',
            name='memberList',
            field=models.ManyToManyField(to='api.Profile'),
        ),
        migrations.AddField(
            model_name='chat',
            name='group_id',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Group'),
        ),
        migrations.AddField(
            model_name='chat',
            name='messages',
            field=models.ManyToManyField(to='api.Message'),
        ),
        migrations.AddField(
            model_name='chat',
            name='user',
            field=models.ForeignKey(on_delete='CASCADE', to='api.Profile'),
        ),
        migrations.AlterUniqueTogether(
            name='reminder',
            unique_together={('UserId', 'EventId')},
        ),
    ]