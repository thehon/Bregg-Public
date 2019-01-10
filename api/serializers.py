from rest_framework import serializers, permissions
from . models import Profile, Group, Location, Availability
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

#serializers convert a queryset - returned from querying a model - to JSON - readable by react.

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user','FirstName','LastName','EmailAddress','Location','coordinates',)

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('Friends',)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('groupName','user','midpoint')

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ('Profile','Availability')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('locationName', 'latLong', 'rating','price','vote','group')


class LoginUserSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user:
      return user


    raise serializers.ValidationError("Unable to Login with provided credentials")

class coordinateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields =('coordinates',)