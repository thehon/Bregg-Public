import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Bregg from './components/Bregg';
import NotFound from './components/NotFound';
import { createStore, applyMiddleware } from 'redux';
import breggApp from './reducers';

import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import Login from "./components/login";
import Register from "./components/register";
import About from "./components/about";

import {auth} from "./actions";

import css from './App.css';
import {withStyles} from '@material-ui/core/styles';
import SimpleMap from './components/map';
import CalendarMain from './components/calendarMain';
import ProfileMain from './components/profileMain';


const styles = theme => ({
  content: {
		backgroundColor: theme.palette.background.default,
		flexGrow: 1,
		marginTop: `50px`,
		minWidth: 0 // So the Typography noWrap works
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

let store = createStore(breggApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      // if (!this.props.auth.isAuthenticated) {

      if (!localStorage["token"]) {
        // console.log("inside private route authentication failed", localStorage["token"]);
        return <Redirect to="/login" />;
      } else{
        // console.log("inside private route authenticated",rest,props);
        return <ChildComponent {...props}/>
      }
    }}/>
  }

  render() {
    let {PrivateRoute} = this;
    // console.log("inside root container component authentication:", this.props.auth.isAuthenticated);

    // routing for frontend. Private routes are used for the authenticated user.
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={Bregg}/>
          <PrivateRoute exact path="/groupgeneral" component={Bregg}/>
          <PrivateRoute path="/group/:name" component={Bregg}/>
          <PrivateRoute path="/calendar" component={Bregg}/>
          <PrivateRoute path="/profile" component={Bregg}/>
          <PrivateRoute path="/friend/profile/:id" component={Bregg}/>
          <PrivateRoute path="/friends" component={Bregg}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/about" component={About}/>
          <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    )
  }



}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer/>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
