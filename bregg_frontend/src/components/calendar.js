import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import {mainstate} from "../actions";
import {TextField, Button, AppBar, Typography} from "@material-ui/core/";
import {withStyles} from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class CalendarSideBar extends Component {

  state = {
    date: new Date(),
  }

  onChange = (date) => {
    this.setState({date: date});
  }

  onClickChange = () => {
    this.props.changeState('CALENDAR');
  }

  // side bar for calendar. not much functionality apart from showing the date.
  render () {

    return (
      <div id="calendar-side-bar-left" style={{textAlign: "center", height: '50%', paddingTop: '30%'}}>
        <h2>Calendar</h2>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        {/* <Button variant="outlined" color="secondary" onClick={this.onClickChange}>Full Calendar</Button> */}
        <br/>
        <br/>
        <Button variant="outlined" color="secondary" onClick={this.onClickChange} component={Link} to="/calendar">Full Calendar</Button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changeState: (profileState) => {
      dispatch(mainstate.changeMainState(profileState));
    }
  };
};




export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(CalendarSideBar));