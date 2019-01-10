export const sendDate = (date) => {

  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({date});

    return fetch("/api/profile/availability/", {headers, body, method: "POST"})
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
          dispatch({type: "UPDATE_UNAVAILABILITY", friendsAvailable: res.data});
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

export const setAvailability = (date) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({date, "type": "own"});

    return fetch("/api/profile/availability/", {headers,body,method: "POST"})
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
          dispatch({type: "UPDATE_UNAVAILABILITY", datesUnavailable: res.data});
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


export const getOwnAvailability = () => {

  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }


    return fetch("/api/profile/availability/", {headers, method: "GET"})
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
          dispatch({type: "UPDATE_UNAVAILABILITY", datesUnavailable: res.data});
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


export const getAvailable = (date) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({date});

    return fetch("/api/profile/availability/", {headers, body, method: "POST"})
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
          dispatch({type: "UPDATE_UNAVAILABILITY", friendsAvailable: res.data});
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

export const getUnavailable = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return fetch("/api/profile/availability/", {headers, method: "GET"})
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
        dispatch({type: "FETCH_UNAVAILABILITY", unavailabledays: res.data});
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

export const getFriendsUnavailable = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }


    return fetch("/api/profile/availability/", {headers,method: "GET"})
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
          dispatch({type: "FETCH_UNAVAILABLE_FRIENDS", friendUnavailableDates: res.data});
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