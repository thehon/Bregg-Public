import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import {TextField, Button, AppBar, Typography, Table, TableBody, TableRow, TableCell, TableHead,TablePagination, TableFooter} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {friends, calendar} from "../actions";
import {FriendMarkerStyle, UserMarkerStyle, VenueMarkerStyle} from './marker_style';

const API_KEY = "AIzaSyB1rqyrW7juBtrbMrhfQk4wm5ip1Xc90Ns"

//used for group members
const FriendMarker = ({ text }) => <div style={FriendMarkerStyle}> {text} </div>

const VenueMarker = ({ text }) => <div style={VenueMarkerStyle}> {text} </div>
const UserMarker = ({ text }) => <div style={UserMarkerStyle}> {text} </div>


class Group extends Component {

  state = {
    name: null,
    page: 0,
    rowsPerPage: 5,
    page1: 0,
    rowsPerPage1: 5,
  }

  static defaultProps = {
    center: {
      lat: -33.885744,
      lng: 151.192739
    },
    zoom: 11
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("inside group component")
    // this.setState({name: this.props.match.params.name});
    // this.props.fetchGroupDetails(this.props.match.params.name);
  }

  onClickVote = (event, group) => {
    this.props.incrementEvent(event,group);
  }

  handleChangePage = (event, page) => {
		this.setState({page});
	};

	// Changing the rows
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage: event.target.value});
	};

  handleChangePage1 = (event, page1) => {
		this.setState({page1});
	};

	// Changing the rows
	handleChangeRowsPerPage1 = (event) => {
		this.setState({rowsPerPage1: event.target.value});
	};

  // opens a new window with google directions api from current users location to the venue they click on
  // only works if the user has a valid location
  checkValidUser = (users,eventcoordinates) => {
    if(users.length > 0){
      window.open("https://www.google.com/maps?saddr=" + users[0].lat + "," + users[0].lng + "&daddr=" + eventcoordinates, "_blank");
    }
  }

  render() {

    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;
    const rowsPerPage1 = this.state.rowsPerPage1;
    const page1 = this.state.page1;

    var user = this.props.profile;

    var markers = [];
    var group_list = this.props.groupMembers;

    //populates markers for everybody in the group if their locations are valid
    for (var i = 0; i < group_list.length; i++) {
      if (group_list[i].coordinates !== null && group_list[i].coordinates !== undefined) {
        var temp_coords = group_list[i].coordinates.split(/[,()]/);
        if (temp_coords.length === 4) {
          var temp_lat = parseFloat(temp_coords[1].trim());
          var temp_lng = parseFloat(temp_coords[2].trim());
          var temp_name = group_list[i].firstName.charAt(0) + ". " + group_list[i].lastName.charAt(0) + ".";
          console.log("inside for loop in gorup list",temp_name);
          markers.push({  lat:temp_lat, lng:temp_lng, name:temp_name, })
        }
      }
    }

    //populates markers for all venues selected as potential places for the group event
    var venue_markers = [];
    var venue_list = this.props.groupEvents;
    for (var i = 0; i < venue_list.length; i++) {
      if (venue_list[i].latLong !== null && venue_list[i].latLong !== undefined) {
        var temp_coords = venue_list[i].latLong.split(/[,]/);
        if (temp_coords.length === 2) {
          var temp_lat = parseFloat(temp_coords[0].trim());
          var temp_lng = parseFloat(temp_coords[1].trim());
          var temp_name = venue_list[i].location;
          venue_markers.push({  lat:temp_lat, lng:temp_lng, name:temp_name, })
        }
      }
    }

    //centers the map on this default location
    //sydney city cbd
    var center = {
      lat: -33.865143,
      lng: 151.209900,
    }
    var zoom = 14;

    //attempts to pull the midpoint between all memebers in the group with valid eventcoordinates
    //only works if there is at least 1 person with valid coordinates
    if (this.props.groupMidPoint !== null && this.props.groupMidPoint !== undefined) {
      var group_midpoint = this.props.groupMidPoint.split(/[,()]/);
      if (group_midpoint.length === 4) {
        var midpoint_lat = parseFloat(group_midpoint[1].trim());
        var midpoint_lng = parseFloat(group_midpoint[2].trim());
        center = {
            lat: midpoint_lat,
            lng: midpoint_lng,
        };
      }
    }

    var user_raw_data = this.props.profile;
    var user_markers = [];
    //creates a marker for the current user
    if (user_raw_data !== null && user_raw_data !== undefined) {
      var user_coords = user_raw_data.coordinates.split(/[,()]/);
      if (user_coords.length === 4) {
        var user_lat = parseFloat(user_coords[1].trim());
        var user_lng = parseFloat(user_coords[2].trim());
        user_markers.push({ lat:user_lat, lng:user_lng, name:user_raw_data.firstname.charAt(0) + ". " + user_raw_data.lastname.charAt(0) + ".", })

      }
    }

    const {match} = this.props;
    //console.log(match.params.name);

    if(match.params.name !== this.state.name){
      this.props.fetchGroupDetails(this.props.match.params.name);
      this.setState({name: this.props.match.params.name});

    }

    return (
      <div style={{height: "100%", width: "100%", overflow: "scroll"}}>
        <div style={{height: '60%',width: '100%' }} >

        <GoogleMapReact bootstrapURLKeys={{key: API_KEY}} zoom={zoom} center={center}>
          {markers.map((marker, i) => { return (
            <FriendMarker lat={markers[i].lat} lng={markers[i].lng} text={markers[i].name}/>
          )})}
          {venue_markers.map((marker, i) => { return (
            <VenueMarker lat={venue_markers[i].lat} lng={venue_markers[i].lng} text={venue_markers[i].name}/>
          )})}
          {user_markers.map((marker, i) => { return (
            <UserMarker lat={user_markers[i].lat} lng={user_markers[i].lng} text={user_markers[i].name}/>
          )})}

        </GoogleMapReact>
        </div>
        <div>
          <section style={{margin: "auto", padding: "10px", width: "100%"}}>
            <div style={{width: "50%", height: "100%", float: "left"}}>
              <h2>Members in {match.params.name}</h2>
              <Table style={{height: "100%"}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Group Members</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.groupMembers.slice(page1 * rowsPerPage1, (page1*rowsPerPage1) + rowsPerPage1).map((member) => {
                   return (
                      <TableRow>
                        <TableCell>{member.firstName} {member.lastName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                        <TableRow>
                          <TablePagination
                            colSpan={3}
                            count={this.props.groupMembers.length}
                            rowsPerPage={rowsPerPage1}
                            page={page1}
                            onChangePage={this.handleChangePage1}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage1}
                          />
                        </TableRow>
					            </TableFooter>
              </Table>
              </div>
              <div style={{marginLeft: "50%", height: "100%"}}>
                  <div>
                    <h2>Event Voting</h2>
                    <Table style={{height: "100%"}}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Event Names</TableCell>
                          <TableCell>Ratings</TableCell>
                          <TableCell>Score</TableCell>
                          <TableCell>Options</TableCell>
                          <TableCell>Directions</TableCell>
                        </TableRow>

                      </TableHead>
                      <TableBody>
                        {this.props.groupEvents.slice(page * rowsPerPage, (page*rowsPerPage) + rowsPerPage).map((event) => {
                        console.log("LOOKATME")
                        console.log(event);
                        return (
                            <TableRow>
                              <TableCell>{event.location}</TableCell>
                              <TableCell>{event.rating}</TableCell>
                              <TableCell>{event.vote}</TableCell>
                              <TableCell>
                                <Button onClick={() => {this.onClickVote(event.location, match.params.name)}}>Vote</Button>
                              </TableCell>
                              <TableCell>
                                <Button onClick={() => this.checkValidUser(user_markers,event.latLong)}>GO</Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            colSpan={3}
                            count={this.props.groupEvents.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          />
                        </TableRow>
					            </TableFooter>
                    </Table>
                  </div>
              </div>
          </section>
        </div>
      </div>

    );
  }

}


const mapStateToProps = state => {
  return {
    groupMidPoint: state.friends.groupMidPoint,
    groupMembers: state.friends.groupMembers,
    groupEvents: state.friends.groupVenues,
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGroupDetails: (group) => {
      dispatch(friends.fetchGroupDetails(group));
    },
    incrementEvent: (event, group) => {
      dispatch(friends.incrementEvent(event,group));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Group);
