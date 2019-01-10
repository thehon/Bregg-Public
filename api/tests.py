from django.test import TestCase
from api.models import Profile
from api.models import Availability
from django.contrib.auth.models import User
from api.models import Group
from api.models import Location
from api.models import MemberShip
import datetime


# Create your tests here.

class API_TEST(TestCase):

    def create_user(self, my_username, my_password):
        return User(username=my_username, password=my_password)

    def test_create_user(self):
        u = self.create_user("bob_jones", "123")
        self.assertTrue(isinstance(u, User))

    def test_create_user2(self):
        u = self.create_user("bob_j123124ones", "12fewfwef3")
        self.assertTrue(isinstance(u, User))

    def create_availablility(self, my_user, my_date_time):
        return Availability(user=my_user, Availability=my_date_time);

    def test_availability_creation(self):
        a = self.create_availablility(self.create_user("bob_jon21", "231"), (datetime.datetime.strptime("2017/01/01",'%Y/%m/%d').strftime('%Y-%m-%d')))
        self.assertTrue(isinstance(a, Availability))

    def test_availability_creation2(self):
        a = self.create_availablility(self.create_user("bob_jon1321", "231"), (datetime.datetime.strptime("2019/01/01",'%Y/%m/%d').strftime('%Y-%m-%d')))
        self.assertTrue(isinstance(a, Availability))

    def create_profile(self, my_user, my_first_name, my_last_name, my_email, my_location, my_coords):
        return Profile(user=my_user, FirstName=my_first_name, LastName=my_last_name, EmailAddress=my_email, Location=my_location, coordinates=my_coords)

    def test_create_profile(self):
        p = self.create_profile(self.create_user("hog2n", "214"), "James", "G", "james@gmail.com", "Kingsgrove", "eowfwefu")
        self.assertTrue(isinstance(p, Profile))

    def test_create_profile2(self):
        p = self.create_profile(self.create_user("hog142n", "2114"), "Jame3s", "G1", "jam3es@gmail.com", "Kings3123grove", "eowfw321efu")
        self.assertTrue(isinstance(p, Profile))

    def create_group(self):
        return Group()

    def test_create_group(self):
        g = self.create_group()
        self.assertTrue(isinstance(g, Group))

    def create_location(self):
        return Location()

    def test_create_location(self):
        l = self.create_location()
        self.assertTrue(isinstance(l, Location))

    def create_membership(self):
        return MemberShip()

    def test_create_membership(self):
        m = self.create_membership()
        self.assertTrue(isinstance(m, MemberShip))





