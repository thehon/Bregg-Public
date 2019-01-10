import profile from "./profile";

const addProfileAction = {
  'data': {'user': {'FirstName': 'Lin', 'LastName': 'Chen', 'EmailAddress': 'linchen@gmail.com', 'Location': 'Concord','coordinates': 'test'}},
  'type': 'PROFILE_LOADED'
}

const updateProfileAction = {
  'data': {'user': {'FirstName': 'Lin', 'LastName': 'Changed', 'EmailAddress': 'linchen@gmail.com', 'Location': 'Concord','coordinates': 'test'}},
  'type': 'UPDATE_SUCCESS'
}

const updateMultipleProfile = {
  'data': {'user': {'FirstName': 'Bob', 'LastName': 'Ross', 'EmailAddress': 'bob@gmail.com', 'Location': 'Bob','coordinates': 'bob'}},
  'type': 'UPDATE_SUCCESS'
}

const userProfile = {'firstname': 'Lin', 'lastname': 'Chen', 'email': 'linchen@gmail.com', 'location': 'Concord', 'coordinates': 'test'};
const userProfile2 = {'firstname': 'Lin', 'lastname': 'Changed', 'email': 'linchen@gmail.com', 'location': 'Concord', 'coordinates': 'test'};
const completeProfileChange = {'firstname': 'Bob', 'lastname': 'Ross', 'email': 'bob@gmail.com', 'location': 'Bob', 'coordinates': 'test'};


describe('Profile reducer tests', () => {
  test('should test adding of a profile', () => {
    expect(profile(undefined, addProfileAction))
      .toEqual(userProfile)
  });

  test("should test changing the profile of one attribute", () => {
    expect(profile(userProfile, updateProfileAction))
      .toEqual(userProfile2)
  });

  test("should test changing complete profile", () => {
    expect(profile(userProfile, updateMultipleProfile))
      .toEqual(completeProfileChange)
  });

})