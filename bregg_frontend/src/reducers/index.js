import { combineReducers } from 'redux';
import friends from './friends';
import auth from "./auth";
import profile from "./profile";
import mainstate from "./mainstate";
import calendar from "./calendar";

const breggApp = combineReducers({
  friends, auth, profile, mainstate, calendar
})

export default breggApp;