const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,
  user: null,
  errors: null,
};


export default function auth(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      console.log('inside user loaded', action.user)
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      console.log('inside registration success', action.data);
      if(action.data !== "fail"){
        localStorage.setItem("token", action.data.token);
        return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};
      }else{
        return state;
      }

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case "REGISTRATION_FAILED":
    case 'LOGOUT_SUCCESSFUL':
      console.log("loggint out",action.data);
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false};

    default:
      return state;
  }
}