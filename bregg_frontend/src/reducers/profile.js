const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  location: "",
  coordinates: ""
};


export default function profile(state=initialState, action) {

  switch (action.type) {

    case 'PROFILE_LOADED':
      return {...state, firstname: action.data.user.FirstName, lastname: action.data.user.LastName, email: action.data.user.EmailAddress, location: action.data.user.Location, coordinates: action.data.user.coordinates};
    case 'UPDATE_SUCCESS':
      return {...state, firstname: action.data.user.FirstName, lastname: action.data.user.LastName, email: action.data.user.EmailAddress, location: action.data.user.Location};
    case 'AUTHENTICATION_ERROR':
      localStorage.removeItem("token");
      return state;
    case 'CLEAR_PROFILE_LOGOUT':
      return {...state, firstname: "", lastname: "", email: "", location: "", coordinates: ""}
    default:
      return state;

  }





}