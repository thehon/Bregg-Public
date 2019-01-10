from django.db import models
from django.contrib.auth.models import User
from . helpers import getCoordinates
api_key="AIzaSyD4ULRyhwhux8lmfESkwICF4ZJSJnlQesI"

#Models act as a bridge between django and the underlying db.


class Availability(models.Model):
    user = models.ForeignKey(User,related_name='+',default=1,on_delete=models.CASCADE)
    Availability = models.DateField(auto_now=False)

class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='+',default=1)
    FirstName = models.CharField(max_length=50,default='firstname')
    LastName = models.CharField(max_length=50,default='lastname')
    EmailAddress = models.EmailField(max_length=180,default='defaultemail@gmail.com',blank=True,null=True,unique=True)
    Availability = models.ManyToManyField(Availability,default='None')
    Location = models.CharField(max_length=200, default='homeless',null=True)
    Friends = models.ManyToManyField('self',blank=True,default='none',null=True)
    coordinates = models.CharField(max_length=200,default='null',null=True)
    @property
    def getlatLong(self):
        return getCoordinates(self.Location)


class Group(models.Model):
    groupName = models.TextField()
    user = models.ManyToManyField(Profile, through='MemberShip', through_fields=("group","person"))
    midpoint = models.TextField(default='')

class Location(models.Model):
    locationName = models.TextField()
    latLong = models.TextField(default='')
    rating = models.DecimalField(max_digits=5,decimal_places=1,default=0.0)
    price = models.DecimalField(max_digits=5,decimal_places=1,default=0.0)
    types = models.TextField(default='')
    vote = models.IntegerField(default=0)
    group = models.ForeignKey(Group,on_delete=models.CASCADE,null=True)

class MemberShip(models.Model):
    group = models.ForeignKey(Group,on_delete=models.CASCADE, null=True)
    person = models.ForeignKey(Profile,on_delete=models.CASCADE, null=True)

