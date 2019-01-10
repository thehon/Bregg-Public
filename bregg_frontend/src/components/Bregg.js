import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { notEqual } from 'assert';
import { friends, auth, profile, mainstate } from '../actions';

// import FriendSideBar from './friend';
import CalendarSideBar  from './calendar';
import Calendar from 'react-calendar';
import Login from "./login";


import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import SimpleMap from './map';
import ProfileMain from './profileMain';
import CalendarMain from "./calendarMain";
import FriendMain from "./friendMain";
import FriendProfile from "./friendProfile";
import Group from "./group";
import GroupCreation from './groupCreate';

import MenuAppBar from "./menubar";
import LeftPermanentDrawer from "./leftdrawer";
import RightPermanentDrawer from "./rightdrawer";

import {withStyles} from '@material-ui/core/styles';
import { relative } from 'path';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';



const styles = theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    marginTop: `50px`,
    padding: theme.spacing.unit * 3,
    // minWidth: 0
  },
  root: {
    display: `flex`,
    flexGrow: 1,
    height: `100vh`,
    overflow: `hidden`,
    position: `relative`,
    zIndex: 1
  },
  toolbar: theme.mixins.toolbar
})


class Bregg extends Component {

  componentDidMount() {
    console.log(this.props.currState);
    this.props.fetchProfile();
    this.props.fetchGroups();
  }

  state = {
    text: "",
  }



  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else{
        console.log("inside bregg private route authenticated",rest,props);
        return <ChildComponent {...props}/>
      }
    }}/>
  }

  render() {
    // console.log('redux store', this.props.user);
    // console.log('redux store profile', this.props.profile);
    let {PrivateRoute} = this;
    console.log("isAuthenticated: ", this.props.isAuthenticated);
    const { classes } = this.props;


    return(
      <div className={classes.root}>
        <MenuAppBar/>
        <LeftPermanentDrawer/>
        {/* <div id="main-div-section" style={{paddingTop: "75px"}}>
          TEMPORARY STORAGE CONTENT
        </div> */}
        <main className={classes.content}>
          <Route exact path="/" component={SimpleMap}/>
          <Route path="/calendar" component={CalendarMain}/>
          <Route path="/friend/profile/:id" component={FriendProfile}/>
          <Route path="/friends" component={FriendMain}/>
          <Route path="/groupgeneral" component={GroupCreation}/>
          <Route path="/group/:name" component={Group}/>
          <Route path="/profile" component={ProfileMain}/>
        </main>
        <RightPermanentDrawer/>
        {/* <div style={{float:"left"}}>
          <CalendarSideBar/>
        </div> */}

        {/* <div style={{float: "left"}}>
          Profile
          <label>{this.props.profile.email}</label>
          <label>{this.props.profile.firstname}</label>
          <label>{this.props.profile.lastname}</label>
          <label>{this.props.profile.location}</label>
        </div> */}


        {/* <div style={{marginLeft: "400px"}}>
          <SimpleMap/>
        </div>
        <div>
          <FriendSideBar friendList={this.props.friends} addButton={this.submiteFriend}/>
        </div> */}


      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile,
    currState: state.mainstate.current,
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(auth.logout());
      dispatch(friends.clearFriends());
    },
    fetchProfile: () => {
      dispatch(profile.fetchProfile());
    },
    fetchGroups: () => {
      dispatch(friends.getGroups());
    }
  }
}


export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Bregg));
