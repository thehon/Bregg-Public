import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Table, TableBody,TableCell, TableHead, TableRow} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import { friends } from "../actions";
import {FriendMarkerStyle, UserMarkerStyle} from './marker_style';

const API_KEY = "AIzaSyB1rqyrW7juBtrbMrhfQk4wm5ip1Xc90Ns"

const FriendMarker = ({ text }) => <div style={FriendMarkerStyle}> {text} </div>
const UserMarker = ({ text }) => <div style={UserMarkerStyle}> {text} </div>


class SimpleMap extends Component {

  render() {

    var markers = [];
    var friends_list = this.props.fullFriendList;
    //populate 'markers' with initials and coordinates of all friends
    for (var i = 0; i < friends_list.length; i++) {
      if (friends_list[i].coordinates !== null && friends_list[i].coordinates !== undefined) {
        console.log(friends_list[i].coordinates)
        var temp_coords = friends_list[i].coordinates.split(/[,()]/);
        if (temp_coords.length === 4) {
          var temp_lat = parseFloat(temp_coords[1].trim());
          var temp_lng = parseFloat(temp_coords[2].trim());
          var temp_name = friends_list[i].firstname.charAt(0) + ". " + friends_list[i].lastname.charAt(0) + ".";
          markers.push({  lat:temp_lat, lng:temp_lng, name:temp_name, })
        }
      }
    }

    var user_raw_data = this.props.profile;

    //sydney cbd - used as default value for center of map
    var center = {
      lat: -33.865143,
      lng: 151.209900,
    }
    var zoom = 16;
    var user_markers = [];
    //centers the map on the user's location if it is valid
    //creates a marker for the user if they have a valid location
    if (user_raw_data !== null && user_raw_data !== undefined) {
      var user_coords = user_raw_data.coordinates.split(/[,()]/);
      if (user_coords.length === 4) {
        var user_lat = parseFloat(user_coords[1].trim());
        var user_lng = parseFloat(user_coords[2].trim());
        user_markers.push({ lat:user_lat, lng:user_lng, name:user_raw_data.firstname.charAt(0) + ". " + user_raw_data.lastname.charAt(0) + ".", })
        center = {
            lat: user_lat,
            lng: user_lng,
        };
      }
    }

    return (

      <div style={{height: '100%',width: '100%' }} >

        <GoogleMapReact bootstrapURLKeys={{key: API_KEY}} zoom={zoom} center={center}>
          {user_markers.map((marker, i) => { return (
            <UserMarker lat={user_markers[i].lat} lng={user_markers[i].lng} text={user_markers[i].name}/>
          )})}
          {markers.map((marker, i) => { return (
            <FriendMarker lat={markers[i].lat} lng={markers[i].lng} text={markers[i].name}/>
          )})}
        </GoogleMapReact>

      </div>
    )
  }

};

const mapStateToProps = state => {
  return {
    fullFriendList: state.friends.fullFriendList,
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(SimpleMap);
