from django.conf.urls import url,include
from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import path
from . import views

#Urls pass requests from nginx to views.

urlpatterns = [
    #path('profile/',views.ProfileList.as_view(),name="profile/"),
    path('profile/',views.ProfileDetail.as_view(),name='profile_detail'),
    path('profile/edit', views.ProfileDetail.as_view()),
    path('friend_list/',views.FriendList.as_view()),
    path("profile/friends/",views.AddFriend.as_view(),name="addFriend"),
    path("profile/search/",views.Search.as_view(),name="search"),
    path("profile/availability/",views.AvailabilityDetail.as_view(),name="Availability"),
    path('group/',views.GroupDetail.as_view()),
    path('group/vote/',views.vote.as_view()),
    path('auth/register/', views.Register.as_view()),
    path('auth/login/', views.Login.as_view()),
    path('auth/user/', views.ProfileDetail.as_view()),
    path('friend/', views.findFriend.as_view()),
    path('friend/add', views.AddFriend.as_view()),
    path('getCoords/', views.GetCoords.as_view())
]
