// action creator for finding friends from backend
export const fetchFriends = (firstname, lastname) => {
  return (dispatch,getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({firstname, lastname });

    return fetch("api/friend/",{headers, method: "POST", body})
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        }else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: `FETCH_FRIENDS`, friendList: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })

  }
}

// action creator for adding friends to backend.
export const addFriend = (email) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    let body = JSON.stringify({email});

    return fetch("/api/friend/add",{headers, method: "POST", body})
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          return dispatch({type: `ADD_FRIEND`, friendDetail: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })

  }
}

// action creator for creating groups for backend.
export const createGroup = (groupname) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }


    let body = JSON.stringify({groupname});
    console.log(body, headers);

    return fetch("api/group/",{headers, method: "POST",body})
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          console.log("inisde create group",res.data);
          return dispatch({type: `CREATE_GROUP_SUCCESS`, groupSuccess: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })


  }
}

// action creator for fetching groups from backend.
export const getGroups = () =>{
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    return fetch("/api/group/",{headers, method: "GET"})
    .then(res => {
      if(res.status < 500) {
        return res.json().then(data => {
          return {status: res.status, data};
        })
      } else {
        console.log("server error");
        throw res;
      }
    })
    .then(res => {
      if (res.status === 200) {
        return dispatch({type: `GET_GROUP`, groupList: res.data});
      } else if (res.status === 401 || res.status === 403){
        dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
        throw res.data;
      }
    })

  }
}

// action creator for getting full friendlist from the backend.
export const getFriendList = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }
    // console.log("inside action creator getFriendList",headers,token)
    return fetch("/api/friend_list/", {headers, method: "GET"})
      .then(res => {
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error inside get friend list");
          throw res;
        }
      })
      .then(res => {
        if(res.status === 200){
          return dispatch({type: `GET_FRIENDLIST`, friendList: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })


  }
}

// action creator for adding a friend to group
export const addToGroup = (friend, group) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({'groupname': group, 'email': friend })

    return fetch("/api/group/", {headers, body, method: "PUT"})
      .then(res => {
        console.log("inside api add to group");
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error inside add friend to group");
          throw res;
        }
      })
      .then(res => {
        if(res.status === 200){
          return dispatch({type: `ADD_SUCCESS`, groupSuccess: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })

  }
}

// action creator for fetching the details of group. venues and members inside the group
export const fetchGroupDetails = (group) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({'groupname': group, 'type': 'get' });
    console.log("inside fetch group detail action creator");
    return fetch("/api/group/", {headers, body, method: "POST"})
      .then(res => {
        console.log("inside fetch group detail");
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error inside add friend to group");
          throw res;
        }
      })
      .then(res => {
        if(res.status === 200){
          console.log("fetch group details action creator", res.data);
          return dispatch({type: `UPDATE_GROUP_DETAIL`, groupdetail: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
      })

  }
}

// increment the event score and populate that event.
export const incrementEvent = (event, group) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let token = getState().auth.token;

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    let body = JSON.stringify({'groupname': group, 'locationname': event});

    return fetch("/api/group/vote/", {headers, body, method: "POST"})
      .then(res => {
        console.log("inside group vote");
        if(res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("server error inside add friend to group");
          throw res;
        }
      })
      .then(res => {
        if(res.status === 200){
          console.log("fetch vote location", res.data);
          return dispatch({type: `UPDATE_VOTE_SCORE`, locationVote: res.data});
        } else if (res.status === 401 || res.status === 403){
          dispatch({type: "AUTHENTICATION_ERROR", data:res.data});
          throw res.data;
        }
    })



  }
}

// clear friends when logging out so that when new users log back in they can see.
export const clearFriends = () => {
  console.log("inside clear friends action");
  return {
    type: 'CLEAR_FRIENDS_LOGOUT',
  };
};

