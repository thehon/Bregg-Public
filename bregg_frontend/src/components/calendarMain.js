import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Table, TableBody, TableRow, TableCell, TableHead,TablePagination, TableFooter} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import {friends, calendar} from "../actions";

const CURRENT_DATE = moment().toDate();



const ColoredDateCellWrapper = ({ children, value }) =>
  // console.log("inside coloured date cell",value);
  React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: value < CURRENT_DATE ? "lightgreen" : "lightblue"
    }
  });


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



const localizer = BigCalendar.momentLocalizer(moment);


class CalendarMain extends Component {
  state = {
    dateString: "",
    selectedDate: "",
    page: 0,
    rowsPerPage: 4,
    dateBool: false,
  }

  componentDidMount () {
    this.props.fetchFriendsUnavailable();
    console.log("inside calendar mount", this.props.unavailableDates);
  }

  componentDidUpdate() {
    console.log("did update", this.props.unavailableDates);
  }

  handleNavigate = (date,view, action) => {
    const temp = new Date(date).toLocaleDateString()

    this.setState({selectedDate: temp});
    this.setState({dateBool: !this.state.dateBool});
  }

  handleSetUnavailableDate = () => {
    this.props.setDateUnavailable(this.state.selectedDate);
    this.setState({selectedDate: ""});
    this.setState({dateBool: !this.state.dateBool});
  }

  handleFriendUnavaiable = () => {
    this.props.fetchFriendsUnavailable(this.state.selectedDate);
  }

  handleChangePage = (event, page) => {
		this.setState({page});
	};

	// Changing the rows
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage: event.target.value});
	};

  render() {


    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;




    return (
      <div style={{height: "100%", width: "100%"}}>
        <BigCalendar
          startAccessor="startDate"
          endAccessor="endDate"
          events={[]}
          localizer={localizer}
          style={{height:"50%"}}
          views={['month']}
          onNavigate={this.handleNavigate}
          components={{
            dateCellWrapper: ColoredDateCellWrapper
          }}
        />

        <section style={{margin: "auto", padding: "10px", width: "100%"}}>
          <div style={{width: "50%", height: "100%", float: "left"}}>
            <div>
              Selected Date: {this.state.selectedDate}
              <Button variant="text" color="secondary" onClick={this.handleSetUnavailableDate}>Set Date Unavailable</Button>
              <h2>Own Unavaiable Dates</h2>
                  {this.props.unavailableDates.map((date) => {
                  return (
                        <Button variant="text" color="secondary">{date}</Button>
                    )
                  })}


            </div>
          </div>
          <div style={{marginLeft: "50%", height: "100%"}}>
            <div>
              <h2>Unavailable Friends Dates</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Friends</TableCell>
                    <TableCell>Dates Unavailable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.unavailableFriends.slice(page * rowsPerPage, (page*rowsPerPage) + rowsPerPage).map((date) => {
                    const dateArr = date.split(",");
                    return (
                      <TableRow>
                        <TableCell>
                          {dateArr[0]}
                        </TableCell>
                        <TableCell>
                          {dateArr[1]}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={this.props.unavailableFriends.length}
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
    );
  }
};

const mapStateToProps = state => {
  return {
    unavailableDates: state.calendar.datesUnavailable,
    unavailableFriends: state.calendar.friendsUnavailable,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDateUnavailable: (date) => {
      dispatch(calendar.setAvailability(date));
    },
    fetchUnavailable: () => {
      return dispatch(calendar.getUnavailable());
    },
    fetchFriendsUnavailable: () => {
      dispatch(calendar.getFriendsUnavailable());
    }
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CalendarMain));
