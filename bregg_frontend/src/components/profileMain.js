import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Input} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {profile} from '../actions';
import ImageAvatar from './imgAvatar';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const stylesFont = {
  textField: {
  fontSize: 10,
}
}

class ProfileMain extends Component {

  state = {
    firstNameEdit: "",
    lastNameEdit: "",
    emailEdit: "",
    locationEdit: "",
    editHidden: true,
  }

  componentDidMount() {
    this.props.fetchProfile();
  }

  handleEditClick = () => {
    this.props.editProfile(this.state.firstNameEdit, this.state.lastNameEdit, this.state.emailEdit, this.state.locationEdit);
    this.setState({firstNameEdit: ""})
    this.setState({lastNameEdit: ""})
    this.setState({locationEdit: ""})
    this.setState({editHidden: !this.state.editHidden})
  }

  render() {

    return (
      <div style={{textAlign: "center"}}>
        <h2>Profile</h2>
        <br/>
        <ImageAvatar/>
        <Button variant="flat" color="primary" onClick={e => this.setState({editHidden: !this.state.editHidden})}>Edit</Button>
        <br/>
        {
          this.state.editHidden &&
        <div>
          <label>First Name: </label><label>{this.props.profile.firstname}</label>
        </div>
        }
        {!this.state.editHidden && <Input
          placeholder= {this.props.profile.firstname}
          onChange={e => this.setState({firstNameEdit: e.target.value})}
        />}
        <br/>
        {this.state.editHidden &&
        <div>
          <label>Last Name: </label><label>{this.props.profile.lastname}</label>
        </div>
        }
        {!this.state.editHidden && <Input
          placeholder={this.props.profile.lastname}
          onChange={e => this.setState({lastNameEdit: e.target.value})}
        />}
        <br/>
        {
        this.state.editHidden &&
        <div>
          <label>Location: </label><label>{this.props.profile.location}</label>
        </div>}
        {!this.state.editHidden && <Input
          placeholder = {this.props.profile.location}
          onChange={e => this.setState({locationEdit: e.target.value})}
          inputStyle={{fontSize: "5px"}}
        />}
         <br/>
        <label>Email: </label><label>{this.props.profile.email}</label>

       <br/>
        <br/>
        {
        !this.state.editHidden &&
        <Button variant="contained" color="primary" onClick={this.handleEditClick}>Confirm</Button>
        }
      </div>
    );
  };


}


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
    editProfile: (firstname, lastname, email, location) => {
      dispatch(profile.editProfile(firstname,lastname,email,location));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileMain));