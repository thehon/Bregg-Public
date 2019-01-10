const initialState = {
  friendsList: [],
  groupList: [],
  fullFriendList: [],
  groupMembers: [],
  groupVenues: [],
  groupMidPoint: null,
}

export default function friends(state=initialState, action) {
  // let friendList = state.slice()

  switch (action.type) {
    // friend list that is returned after searching for friends.
    // different to the get_friendlist which fetches all friends from database
    case 'FETCH_FRIENDS':
      console.log("inside fetch friends",action.friendList.profiles);
      return {...state, friendsList: JSON.parse(action.friendList.profiles)};

    case 'ADD_FRIEND':
      console.log("inside add friend reducer",action.friendDetail.success);
      if(action.friendDetail.success !== 'fail'){
        const friendObj = {"email": action.friendDetail.profile["EmailAddress"], "firstname": action.friendDetail.profile["FirstName"], "lastname": action.friendDetail.profile["LastName"], "location": action.friendDetail.profile["Location"], "id": action.friendDetail.profile["user"]}
        return {...state,fullFriendList: [...state.fullFriendList,friendObj]};
      }else{
        return state;
      }

    case 'CREATE_GROUP_SUCCESS':
      console.log('inside create_group_success', action.groupSuccess);
      console.log("group fetch", state.groupList)
      const tempGroup = {'name': action.groupSuccess.group.groupName, 'midpoint': action.groupSuccess.group.midpoint}
      return {...state, groupList: [...state.groupList, tempGroup]}

    case 'GET_GROUP':
      console.log("inside get groups reducer",JSON.parse(action.groupList.groups));
      let temp = [];

      JSON.parse(action.groupList.groups).map((group) => {
        console.log(group);
        temp.push({'name':group.fields["groupName"], 'midpoint': group.fields["midpoint"]})
      })
      console.log("inside temp get group", temp);
      return {...state, groupList: temp};

    case 'GET_FRIENDLIST':
      console.log("inside getfriendlist reducer", JSON.parse(action.friendList.friends));

      let tempFriendList = [];

      JSON.parse(action.friendList.friends).map((friend) => {
        const friendObj = {"email":friend.fields["EmailAddress"], "firstname":friend.fields["FirstName"], "lastname": friend.fields["LastName"], "location": friend.fields["Location"], "id": friend.fields["user"], "coordinates": friend.fields["coordinates"]}
        tempFriendList.push(friendObj);
      })
      console.log(tempFriendList);
      return {...state, fullFriendList: tempFriendList}

    case 'UPDATE_GROUP_DETAIL':
      console.log("INSIDE UPDATE GROUP DETAIL", action.groupdetail);

      let tempMembers = [];
      let tempLocations = [];

      // add loation objects
      JSON.parse(action.groupdetail.locations).map((location) => {
        console.log(location);
        const eventObj = {'location': location.fields['locationName'], 'latLong': location.fields['latLong'], 'rating': location.fields["rating"], 'vote': location.fields["vote"]}
        tempLocations.push(eventObj);
      })

      // add member objects
      JSON.parse(action.groupdetail.members).map((member) => {
        const memberObj = {'firstName': member.fields['FirstName'], 'lastName': member.fields['LastName'], 'coordinates': member.fields['coordinates']}
        tempMembers.push(memberObj);
      })

      return {...state, groupVenues: tempLocations, groupMembers: tempMembers, groupMidPoint: action.groupdetail.midpoint};

    // updating the redux store for location to update dynamically
    case 'UPDATE_VOTE_SCORE':
      const eventObj = {'location': action.locationVote.location.locationName, 'latLong': action.locationVote.location.latLong, 'rating': action.locationVote.location.rating, 'vote': action.locationVote.location.vote};

      const eventIndex = state.groupVenues.findIndex(obj => obj.location === action.locationVote.location.locationName);
      console.log("inside update_vote_score",eventObj, eventIndex);

      return {
        ...state,
        groupVenues: state.groupVenues.map((event, index) => eventIndex === index  ? eventObj : event
        )
      };

    case 'CLEAR_FRIENDS_LOGOUT':
      console.log("inside clear friends logout")
      const tempList = [];

      return {...state, fullFriendList: tempList,groupList: tempList, groupMembers: tempList,groupVenues: tempList,groupMidPoint: null }

    default:
      return state;
  }
}