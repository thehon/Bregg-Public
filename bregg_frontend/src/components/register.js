import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

import {TextField, Button, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles/";

import MenuAppBar from "./menubar";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class Register extends Component {

  state = {
    username: "",
    password: "",
    confPassword: "",
    passwordFailed: false,
    firstname: "",
    lastname: "",
    email: "",
    location: "",
  }

  onSubmit = e => {
    e.preventDefault();

    if(this.state.password === this.state.confPassword){
      this.props.register(this.state.username, this.state.password, this.state.firstname, this.state.lastname, this.state.email, this.state.location);
    }else{
      console.log("please reenter password");
      this.setState({passwordFailed: true});
    }


  }


  passwordFail() {
    if (this.state.passwordFailed){
      return (
        <div>
          <label>Passwords Do Not Match. Please Retry Passwords</label>
          <br/>
        </div>
      );
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }


    return (
      <div>
      <MenuAppBar/>
      <br/>
      <Typography variant="login-register" color="inherit" style={{textAlign: "center", paddingTop: "50px"}}>
              Register
      </Typography>
      <form onSubmit={this.onSubmit} style={{textAlign: "center", paddingTop: "20px"}}>
        <fieldset>
          <TextField
            id="standard-register-username"
            label="Username"
            // className={classes.textField}
            value={this.state.username}
            onChange={e => this.setState({username: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-email"
            label="Email"
            // className={classes.textField}
            value={this.state.email}
            onChange={e => this.setState({email: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-firstname"
            label="First Name"
            // className={classes.textField}
            value={this.state.firstname}
            onChange={e => this.setState({firstname: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-lastname"
            label="Last Name"
            // className={classes.textField}
            value={this.state.lastname}
            onChange={e => this.setState({lastname: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-location"
            label="Location"
            // className={classes.textField}
            value={this.state.location}
            onChange={e => this.setState({location: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-pword"
            label="Password"
            // className={classes.textField}
            value={this.state.password}
            type="password"
            onChange={e => this.setState({password: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          <TextField
            id="standard-register-pword-conf"
            label="Confirm Password"
            // className={classes.textField}
            type="password"
            value={this.state.confPassword}
            onChange={e => this.setState({confPassword: e.target.value})}
            margin="normal"
            required
          />
          <br/>
          {this.passwordFail()}
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
      </form>
      </div>

    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password,firstname,lastname,email, location) => dispatch(auth.register(username, password,firstname,lastname,email, location)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register));