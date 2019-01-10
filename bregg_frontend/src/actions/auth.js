export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("/api/auth/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log("res data", res.data);
          dispatch({type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}


export const login = (username, password) => {

  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username,password});

    return fetch("/api/auth/login/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        }else {
          console.log("server error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200){
          console.log("inside login successfull 200", res.data);
          dispatch({type: "LOGIN_SUCCESSFUL", data: res.data});
          return res.data;
        } else if (res.status === 403 || res.status === 401){
          console.log("inside login authentication error")
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data.success});
          throw res.data;
        } else {
          console.log("inside login failed error")
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })


  }
}


export const register = (username, password, firstname, lastname, email, location) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password, firstname, lastname, email, location});

    return fetch("/api/auth/register/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

// add a logout API.
export const logout = () => {
  console.log("inside logout action creator");
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    return fetch("/api/auth/logout/", {headers, body: "", method: "POST"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          console.log("logout status below 500");
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error! logout");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          console.log("logout status 204");
          dispatch({type: 'LOGOUT_SUCCESSFUL'});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          console.log("logout status 400");
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}