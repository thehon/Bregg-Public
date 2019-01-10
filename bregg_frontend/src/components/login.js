import React, {Component} from "react";
import {connect} from "react-redux";

import {Link,Redirect} from "react-router-dom";

import {auth} from "../actions";

import {TextField, Button, AppBar, Typography} from "@material-ui/core/";
import {withStyles} from '@material-ui/core/styles';
import SimpleAppBar from './menubar';

const drawerWidth = 240;

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


class Login extends Component {

  state = {
    username: "",
    password: "",
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  loginError() {
    if (this.props.authErrors === 'fail'){
      return (
        <div>
          <label>Username or Password Failed. Please Try Again!</label>
        </div>
      );
    };
  };

  render() {
    if (this.props.isAuthenticated) {
      console.log("inside login.js redirect");
      // stupid hacky way to fix this unkonwn error>>>Q>>@#!>M#!@#M>@<!@
      return <Redirect to="/" />
    }

    return (
      <div>
        <SimpleAppBar/>
        <br/>
        <Typography variant="login-title" color="inherit" style={{textAlign: "center", paddingTop: "50px"}}>
              Login
        </Typography>
        <form onSubmit={this.onSubmit} style={{textAlign: "center", paddingTop: "20px"}}>
          <fieldset>
            <TextField
              id="standard-login-name"
              label="Username"
              value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              margin="normal"
            />
            <br/>
            <TextField
              id="standard-login-password"
              label="Password"
              // className={classes.textField}
              value={this.state.password}
              type="password"
              onChange={e => this.setState({password: e.target.value})}
              margin="normal"
            />
            <br/>
            {this.loginError()}
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <Link to="/about">About Us</Link>
          </fieldset>
        </form>
      </div>

    )
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    currState: state.mainstate.current,
    authErrors: state.auth.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(auth.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
