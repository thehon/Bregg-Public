import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {profile, mainstate} from '../actions';
import {Link} from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class Profile extends Component {

  componentDidMount() {
    this.props.fetchProfile();
  }


  handleClickChange = () => {
    this.props.changeState('PROFILE');
  }

  // profile side bar. Allows users to click on to their full profile and change what they want.
  render() {
    return(
      <div style={{textAlign: "center", height: "50%"}}>
        <h2>Profile</h2>
        <br/>
        <label>First Name: {this.props.profile.firstname}</label>
        <br/>
        <label>Last Name: {this.props.profile.lastname}</label>
        <br/>
        <label>Email: {this.props.profile.email}</label>
        <br/>
        <label>Location: {this.props.profile.location}</label>
        <br/>
        {/* <Button variant="outlined" color="secondary" onClick={this.handleClickChange}>Full Profile</Button> */}
        <br/>
        <br/>
        <Button variant="outlined" color="secondary" onClick= {this.handleClickChange} component={Link} to="/profile">Full Profile</Button>
      </div>
    );
  }






};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: () => {
      dispatch(profile.fetchProfile());
    },
    changeState: (profileState) => {
      dispatch(mainstate.changeMainState(profileState));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
