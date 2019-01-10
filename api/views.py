from django.shortcuts import render
from api.models import Profile, Group, Location, Availability, MemberShip
from api.serializers import ProfileSerializer, GroupSerializer, LocationSerializer, FriendSerializer, LoginUserSerializer, AvailabilitySerializer, coordinateSerializer
from rest_framework import generics, permissions, renderers, status
from django.contrib.auth.models import User
from django.views.generic.edit import UpdateView
from rest_framework.renderers import TemplateHTMLRenderer
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from django.contrib.auth import authenticate
from django.core import serializers
from json import loads
from api.helpers import getCoordinates
import datetime
from itertools import chain
from operator import attrgetter
from api.googleApi import getPlaces
from api.midpoint import finalmidpoint
import bleach

#handles login of users.
#returns Success: Success/Fail depending on 
class Login(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    def post(self, request, *args, **kwargs):
        #serializer = self.get_serializer(data=request.data)
        try:
            serializer = LoginUserSerializer(data=request.data)
            serializer.is_valid(raise_exception=False)
            user = serializer.validated_data
            authenticate(username=bleach.clean(request.data.get('username')),password=bleach.clean(request.data.get('password')))
            profile = Profile.objects.get(user=user)
            return Response({
                "user": ProfileSerializer(profile).data,
                "token": AuthToken.objects.create(user),
            })
        except:
            return Response({'success':'fail'},status=status.HTTP_401_UNAUTHORIZED)


class ProfileList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "profile_list.html"
    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)
    def get(self, request):
        queryset = Profile.objects.all()
        return Response({'profiles': queryset})

#GET - Returns a list of the users friends.
class FriendList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get(self, request):
        user1 = Profile.objects.get(user=request.user)
        friends = user1.Friends.all()

        # friends = self.request.user.Friends.all()
        serializer = FriendSerializer(friends)
        jsonRes = serializers.serialize('json',friends.all())
        coordinatesList = friends.values_list('coordinates',flat=True)
        jsoncoords = coordinateSerializer(coordinatesList)
        return Response({'friends':jsonRes,'coordinates':jsoncoords.data})

#POST - Searches DB of registered profiles to see if the search user is there.
# INput is sanitized with bleach 
class findFriend(generics.GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = ProfileSerializer
    def post(self, request):
        newFriend = Profile.objects.all()
        lastname = bleach.clean(request.data.get('lastname'))
        if lastname:
            newFriends = newFriend.filter(LastName__icontains=bleach.clean(request.data.get("lastname")))
        firstname = bleach.clean(request.data.get('firstname'))
        if firstname:
            newFriends = newFriend.filter(FirstName = firstname)
        serializer = ProfileSerializer(newFriends)

        jsonRes = serializers.serialize('json',newFriends.all())
        return Response({'profiles':jsonRes})

#adds a friend (usually the result of find friend)

class AddFriend(generics.GenericAPIView):
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = ProfileSerializer

    def post(self, request):
        serializer = ProfileSerializer
        try:
            user1 = Profile.objects.get(user=request.user)
            useremail = bleach.clean(request.data.get('email'))
            user2 = Profile.objects.get(EmailAddress=useremail)

            #Can only add a friend if they are not already part of your friends list and not a part of theirs.
            success = 'fail'
            if user1 not in user2.Friends.all():
                user2.Friends.add(user1)
                success = 'success'

            if user2 not in user1.Friends.all():
                user1.Friends.add(user2)
                success = 'success'

            user1.save()
            user2.save()
            serializer = ProfileSerializer(user2)
            print('success', success);
            return Response({'profile':serializer.data,'success':success})
        except Exception as e:
            print('exception: ', e)
            #error case 
            serializer = ProfileSerializer(user1)
            return Response({'profile':serializer.data,'success':'fail'})

#POST handles user registering to the site.
class Register(generics.GenericAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def post(self, request):
        try:
            username = bleach.clean(request.data.get('username'))
            password = bleach.clean(request.data.get('password'))
            firstname = bleach.clean(request.data.get('firstname'))
            lastname = bleach.clean(request.data.get('lastname'))
            email = bleach.clean(request.data.get('email'))
            location = bleach.clean(request.data.get('location'))

            #GetCoordinates returns the coordinates based on the users input location - provided by gooogle api
            coordinates = getCoordinates(location)
            user = User.objects.create_user(username=username,password=password)
            user.save()
            profile = Profile(user=user,FirstName=firstname,LastName=lastname,EmailAddress=email,Location=location,coordinates=coordinates)
            profile.save()
            serializer = ProfileSerializer(profile)
            return Response({'user':serializer.data, "token": AuthToken.objects.create(user)})
        except:
            return HttpResponseBadRequest()

class Search(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    renderer_classes = [TemplateHTMLRenderer]
    template_name = "search.html"

    def get(self,request):
        return Response()

    def post(self, request):
        searchTerm = request.data.get('searchTerm')
        profiles = Profile.objects.filter(FirstName__icontains=searchTerm)
        serializer = ProfileSerializer(profiles)
        template_name = 'profile_list.html'
        return Response({'serializer':serializer,'profile':profiles})

#Handles users profiles details
class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    permission_classes = [permissions.IsAuthenticated,]
    serializer_class = ProfileSerializer

    #populates users profile page with their details. 
    #uses the user serializer - easiest way of sending back only useful information that the user can change
    def get(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile)
        return Response({'user': serializer.data})
    #for updating the users profile
    def post(self, request):
        profile = Profile.objects.filter(user=request.user)
        profile.FirstName = request.data.get('firstname')
        profile.LastName = request.data.get('lastname')
        profile.EmailAddress = request.data.get('email')
        profile.Location = request.data.get('location')
        #reget their coordinates if they change
        profile.coordinates = getCoordinates(request.data.get('location'))
        profile.save()
        serializer = ProfileSerializer(profile)
        if not serializer.is_valid():
            return Response({'serializer':serializer,'user':profile})
        serializer.save()
        return Response({'user':serializer.data})

    def put(self, request):
        #just another update
        profile = Profile.objects.get(user=request.user)
        firstName = request.data.get('firstname')
        if firstName:
            profile.FirstName = firstName
        lastName = request.data.get('lastname')
        if lastName:
            profile.LastName = lastName
        email = request.data.get('emailaddress')
        if email:
            profile.EmailAddress = email
        location = request.data.get('location')
        if location:
            profile.Location = location
        profile.save()
        #print(profile)
        serializer = ProfileSerializer(profile)
        return Response({'user':serializer.data})

#Handles group functionality.
class GroupDetail(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    #Returns a list of the groups that a user is a part of.
    def get(self, request):
        userprofile = Profile.objects.get(user=request.user)
        GroupMembership = MemberShip.objects.filter(person=userprofile)
        a = GroupMembership.values_list('group',flat=True)
        groups = Group.objects.all()
        groups = groups.filter(id__in=a)
        jsonRes = serializers.serialize('json',groups.all())
        return Response({'groups':jsonRes})


    def post(self, request):
        
        if request.data.get('type') == 'get':
            print("inside views post ", request.data)
            #For getting an individual group that a user is part of
            g = Group.objects.get(groupName=request.data.get('groupname'))
            m = MemberShip.objects.filter(group=g)
            m = m.values_list('person',flat=True)
            profiles = Profile.objects.filter(pk__in=m)
            jsonRes = serializers.serialize('json',profiles)
            #locations - all nearby locations to the midpoint of the group.
            locations = Location.objects.filter(group=g)
            locationsJson = serializers.serialize('json',locations)
            print('locations:', locationsJson)
            return Response({'members':jsonRes,'locations':locationsJson,'midpoint':g.midpoint})
        else:
            g = Group()
            #For creating a new group.
            print("inside views post ", request.data)
            g.groupName = request.data.get('groupname')
            g.save()
            p = Profile.objects.get(user=request.user)
            g.midpoint= getCoordinates(p.Location)
            m1 = MemberShip(group=g,person=p)
            m1.save()
            g.save()
            print('membership',m1,g.midpoint)
            #midpoint created of the creating users location.
            places = getPlaces(g.midpoint)
            print(places);
            #get locations close to them
            for place in places:
                l = Location(locationName=place['name'],latLong=place['coordinates'],rating=place['rating'],types=place['types'],group=g)
                l.save()
            serializer = GroupSerializer(g)
            l = Location.objects.filter(group=g)
            jsonRes = serializers.serialize('json',l.all())
            print("locations:",jsonRes)
            print('gorupL', serializer.data)
            return Response({'group': serializer.data,'locations':jsonRes})

    def put(self, request):
        #for adding a user to a group
        try:
            p = Profile.objects.get(EmailAddress=request.data.get('email'))
            g = Group.objects.get(groupName=request.data.get('groupname'))
            m1 = MemberShip(group=g,person=p)
            m1.save()

            #update the midpoint
            members = MemberShip.objects.filter(group=g)
            locationtexts = []
            #get the coordinates of all members in the group - need to recalculate midpoint based on new coords.
            for m in members:
                coord = getCoordinates(m.person.Location)
                if coord != (0,0):
                    locationtexts.append(m.person.Location)
            g.midpoint = finalmidpoint(locationtexts)
            g.save()

            #delete all old places.
            Location.objects.filter(group=g).delete()
            
            #get new locations
            places = getPlaces(g.midpoint)
            for place in places:
                l = Location(locationName=place['name'],latLong=place['coordinates'],rating=place['rating'],types=place['types'],group=g)
                l.save()
            locations = Location.objects.filter(group=g)
            jsonRes = serializers.serialize('json',locations.all())
            serializer = GroupSerializer(g)
            print('locations:', jsonRes)
            return Response({'group':serializer.data,'success':'success','locations':jsonRes})
        except Exception as e:
            print('not saved', e)
            return Response({'success':'fail'})

#Availability - WHen a user is available - by default they are available
class AvailabilityDetail(generics.GenericAPIView):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated,]

    #get your availabilities and your friends availabilities
    def get(self, request):
        userProfile = Profile.objects.get(user=request.user)
        userFriends = userProfile.Friends.all()
        userFriendsList = userFriends.values_list('user',flat=True)
        #need to check if the user has friends

        #
        #Get mates unavailabilities entries in db.
        unavailabilities = Availability.objects.filter(user__in=userFriendsList)
        unavilable_user_list = unavailabilities.values_list(flat=True)
        unavailable_profile_list = Profile.objects.filter(user__in=unavilable_user_list)
        ret = []
        for u in unavailabilities:
            p = Profile.objects.get(pk=u.user.id)
            uname = p.FirstName + " " + p.LastName
            ret.append((uname + "," + str(u.Availability)))
        userA = []


        FriendsAvailabilities = JsonResponse(ret,safe=False)


        userAvailabilities = Availability.objects.filter(user=request.user)
        userAvailabilitiesList = userAvailabilities.values_list('Availability',flat=True)
        #userAvailabilitiesList = JsonResponse(userAvailabilitiesList.all(),safe=False)
        ua = []
        for u in userAvailabilitiesList:
            ua.append(u)
        uaret = serializers.serialize('json',userAvailabilities)

        return Response({'friends':ret,'useravailabilities':uaret})

    #update your availabilities
    #if an availability entry already exists for the data and user, remove that date so the user is available that day.
    # If an availability doesnt exist for that user,date then create one. They are not available
    def post(self, request):
        d = request.data.get("date")
        print(d,request.data)
        d = (datetime.datetime.strptime(d,'%d/%m/%Y').strftime('%Y-%m-%d'))
        if request.data.get('type') == 'own':
            #change your availabilities
            try:
                aval = Availability.objects.get(user=request.user,Availability=d)
            except Exception as e:
                print('error: ',e)
                a = Availability(user=request.user,Availability=d)
                a.save()
            print('no error')
            profile = Profile.objects.get(user=request.user)
            unavailabilities = Availability.objects.filter(user=request.user)
            unavailable_list = unavailabilities.values_list('Availability',flat=True)
            jsonRes = serializers.serialize('json',unavailabilities)
            return Response({'useravailabilities':d})
        if request.data.get('type') == 'friend':
            #Gets the Profile of the user that made the request.
            profile = Profile.objects.get(user=request.user)
            #gets the users friends
            friends = profile.Friends.all()
            users = friends.values_list("user",flat=True)
            if users.exists():
                #Get which friends DONT have an entry in availability db
                unavaiable_friends = Availability.objects.filter(user__in=users,Availability=d).values('user')
                if unavaiable_friends.exists:
                    for ufriend in unavaiable_friends:
                        removeFriend = Profile.objects.get(user=ufriend.get('user'))
                        friends.exclude(user=removeFriend.user)
                print('friends:', friends)
                jsonRes = serializers.serialize('json',friends.all())
                print('yo jres:',jsonRes)
                return Response({'friends':jsonRes})

        a = Availability.objects.get(Availability=request.data.date,user=request.user)
        if a:
            a.delete()
        aval = Availability()
        aval.Availability=request.data.get('availability')
        aval.user = request.user
        aval.save()
        queryset = Profile.objects.filter(user=request.user).Availability

        serializer - AvailabilitySerializer(queryset)
        return Response({'availability':serializer.data})

#Get coordinates of a user
class GetCoords(generics.GenericAPIView):
    queryset = Profile.objects.all()
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        #gets the coordinates of a given user
        lat,longi = getCoordinates(request.user.Location)
        return Response({'lat':lat, 'long':longi})

    #Get midpoint of a group.
    def post(self, request):
        #gets coordinates for all members of a group.
        group = Groups.get_object_or_404(groupName=bleach.clean(request.data.get('groupname')))
        members = MemberShip.objects.filter(group = group)
        memberUsers = members.values_list('user',flat=True)
        users = Profile.objects.filter(user__in=memberUsers)
        locations = users.values_list('Location', flat=True)
        coords = []
        for loc in location:
            if loc != (0,0) and loc != "null":
                coords.append((getCoordinates(location)))
        jsonRes = serializers.serialize('json',coords)
        return Response({'coords':jsonRes})

#vote on a location
class vote(generics.GenericAPIView):
    queryset = Location.objects.all()
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        print("inside vote", request.data)
        g = Group.objects.get(groupName=bleach.clean(request.data.get('groupname')))
        locationname = bleach.clean(request.data.get('locationname'))
        location = Location.objects.get(group=g, locationName = locationname)
        location.vote = location.vote + 1
        location.save()
        print("vote api ",location)
        serializer = LocationSerializer(location)
        print(serializer.data)
        # jsonRes = serializers.serialize('json',location)
        return Response({'location': serializer.data})
