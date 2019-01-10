import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Table, TableBody, TableRow, TableCell, TableHead,TablePagination, TableFooter} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {friends,calendar} from '../actions';
import {Link} from 'react-router-dom';


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



class GroupCreation extends Component {

  state = {
    groupname: "",
    page: 0,
    rowsPerPage: 10,
  }

  // fetch all groups and friends.
  componentDidMount() {
    this.props.getGroups();
    this.props.fetchFriendsUnavailable()
  }

  // creating groups and sends to the backend/action creators to perform respective action.
  onCreateGroup = () => {
    if(this.state.groupname !== ""){
      this.props.createGroup(this.state.groupname);
      this.setState({groupname: ""});
    }
  }

  handleChangePage = (event, page) => {
		this.setState({page});
	};

	// Changing the rows
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage: event.target.value});
	};


  // create group functionality and shows the unavaiable dates of the friends.
  render(){

    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;


    return(
      <div style={{height: "100%", width: "100%"}}>
        <section style={{margin: "auto", padding: "10px", width: "100%"}}>
          <div style={{width: "50%", height: "100%", float: "left"}}>
          <h2>Create Group</h2>
            <div>
            <TextField
              id="standard-group-create"
              label="Enter Group Name"
              value={this.state.groupname}
              onChange={e => this.setState({groupname: e.target.value})}
            />
            <Button variant="flat" color="secondary" onClick={this.onCreateGroup} style={{marginTop: '15px'}}>Create Group</Button>
            </div>
            <h2>Current Groups</h2>
                {
                  this.props.groupList.map((group) => {
                    return (

                           <Button variant="flat" color="secondary" component={Link} to={`/group/${group.name}`}>{group.name}</Button>

                    )
                  })
                }



          </div>
          <div style={{marginLeft: "50%", height: "100%"}}>
              <h2>Friends Dates Unavaiable</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Friend</TableCell>
                    <TableCell>Date Unavailable</TableCell>
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
        </section>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    groupList: state.friends.groupList,
    fullFriendList: state.friends.fullFriendList,
    unavailableFriends: state.calendar.friendsUnavailable,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createGroup: (name) => {
      dispatch(friends.createGroup(name));
    },
    getGroups: () => {
      dispatch(friends.getGroups());
    },
    getFriendList: () => {
      dispatch(friends.getFriendList());
    },
    fetchFriendsUnavailable: () => {
      dispatch(calendar.getFriendsUnavailable());
    }
  };
};



export default connect(mapStateToProps,mapDispatchToProps)(GroupCreation);