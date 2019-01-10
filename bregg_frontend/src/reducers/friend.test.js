import friends from "./friends";
// const jest = require('jest');

const friendAction = {
  'friendDetail': {'success': 'success','profile': {'EmailAddress': 'asd@gmail.com', 'FirstName': 'Lin', 'LastName': 'Chen', 'Location': 'Concord', 'user': "lin200"}},
  'type': 'ADD_FRIEND'
}

const groupAction = {
  'groupSuccess': {'group': {'groupName': 'test_group', 'midpoint': 'test'}},
  'type': 'CREATE_GROUP_SUCCESS'
}

// [{"model": "api.profile", "pk": 15, "fields": {"user": 44, "FirstName": "Lin", "LastName": "Chen", "EmailAddress": "lin@gmail.com", "Location": "Concord", "coordinates": "null", "Availability": [], "Friends": [14]}}]

const fetchFriendAction = {
  'friendList': {'friends': '[{"model": "api.profile", "pk": 15, "fields": {"user": "lin200", "FirstName": "Lin", "LastName": "Chen", "EmailAddress": "asd@gmail.com", "Location": "Concord", "coordinates": "null", "Availability": [], "Friends": [14]}}]'},
  'type': 'GET_FRIENDLIST'
}

const expectedFriends1 = {"friendsList": [], "fullFriendList": [{"email": "asd@gmail.com", "firstname": "Lin", "id": "lin200", "lastname": "Chen", "location": "Concord", "coordinates":"null"}], "groupList": [], "groupMembers": [], "groupMidPoint": null, "groupVenues": []}
const expectedFriends = {"friendsList": [], "fullFriendList": [{"email": "asd@gmail.com", "firstname": "Lin", "id": "lin200", "lastname": "Chen", "location": "Concord"}], "groupList": [], "groupMembers": [], "groupMidPoint": null, "groupVenues": []}
const expectedGroups = {"friendsList": [], "fullFriendList": [], "groupList": [{'name': 'test_group','midpoint': 'test'}], "groupMembers": [], "groupMidPoint": null, "groupVenues": []}

describe('Friend reducer', () => {
  test("should handle adding of friends to reducer", () => {
    expect(friends(undefined, friendAction))
      .toEqual(expectedFriends)
  });

  test("should be getting back a list of friends", () => {
    expect(friends(undefined, fetchFriendAction))
      .toEqual(expectedFriends1)
  });

  test("handle adding of groups", () => {
    expect(friends(undefined, groupAction))
      .toEqual(expectedGroups)
  });

})