export const fetchProfile = () => {
  return (dispatch, getState) => {

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    console.log("inside fetch profile", headers);
    return fetch("/api/profile/", {headers,})
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
        if (res.status === 200){
          dispatch({type: "PROFILE_LOADED", data: res.data});
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}


export const editProfile = (firstname, lastname, email, location) => {

  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({firstname,lastname,email,location});

    console.log("inside edit profile", body, headers);

    return fetch("/api/profile/edit", {headers, body, method: "PUT"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200){
          console.log("successful update", res.data);
          dispatch({type: "UPDATE_SUCCESS", data: res.data});
          return res.data;
        }else if (res.status === 403 || res.status === 401){
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })



  }

}


export const clearProfile = () => {
  return {
    type: 'CLEAR_PROFILE_LOGOUT',
  };
}