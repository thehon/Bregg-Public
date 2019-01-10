const initialState = {
  datesUnavailable: [],
  friendsUnavailable: [],
}

export default function calendar(state=initialState, action) {

  switch(action.type) {
    case 'UPDATE_UNAVAILABILITY':
      console.log("inside update unavailablility", action.datesUnavailable.useravailabilities)
      // console.log("inside update unavailbility, list", state.datesUnavailable);
      return {...state, datesUnavailable: [...state.datesUnavailable, action.datesUnavailable.useravailabilities]};
    case "FETCH_UNAVAILABILITY":
      console.log('inside calendar reudcer', action.unavailabledays);
      return {...state, datesUnavailable: action.unavailabledays}
    case "FETCH_UNAVAILABLE_FRIENDS":
      console.log("inside reducer fetching friends unavaialable",action.friendUnavailableDates);
      const friendAvailability = action.friendUnavailableDates.friends;
      const ownAvailability = []
      JSON.parse(action.friendUnavailableDates.useravailabilities).map((date) => {
        console.log("fetch unavaiablle friends", date.fields["Availability"])
        ownAvailability.push(date.fields["Availability"])
      })
      return {...state, friendsUnavailable: friendAvailability, datesUnavailable: ownAvailability}
    case 'ADD_SUCCESS':
      console.log("add successful",action.groupSuccess)
      return state;
    default:
      return state;
  }
}