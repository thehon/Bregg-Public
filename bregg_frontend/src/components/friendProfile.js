import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Table, TableBody, TableRow, TableCell, TableHead,TablePagination, TableFooter} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {friends} from '../actions';
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


class FriendProfile extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    id: "",
    page: 0,
    rowsPerPage: 8,
  }

  // fetch groups if not already fetched.
  componentDidMount() {
    if(this.props.groupList.length === 0){
      this.props.fetchGroups();
    }
  }

  getUser(id) {
    console.log(this.props.friendList);
    if(this.state.firstname === "" || this.state.id !== Number(id)){
      this.props.friendList.map((friend) => {
        if (friend["id"] === Number(id)){
          this.setState({firstname: friend["firstname"]});
          this.setState({lastname: friend["lastname"]});
          this.setState({location: friend["location"]});
          this.setState({email: friend["email"]});
          this.setState({id: friend["id"]});
        }
      })
    }
  }

  handleAddGroup(group) {
    this.props.addFriendToGroup(this.state.email, group);
  }

  handleChangePage = (event, page) => {
		this.setState({page});
	};

	// Changing the rows
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage: event.target.value});
	};

  // specific profile page. gets the parameter from the routing and then matches according to the user specified.
  render() {
    const {match} = this.props;

    const rowsPerPage = this.state.rowsPerPage;
    const page = this.state.page;

    console.log(match.params.id);
    this.getUser(match.params.id);

    // uses pagination stuff.
    return (
      <div style={{textAlign: "center"}}>

        <h2>Profile</h2>
        <br/>
        <ImageAvatar/>
        <br/>
        <label>First Name: {this.state.firstname}</label>
        <br/>
        <label>Last Name: {this.state.lastname}</label>
        <br/>
        <label>Location: {this.state.location}</label>
         <br/>
        <label>Email: {this.state.email}</label>
       <br/>
        <br/>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.groupList.slice(page * rowsPerPage, (page*rowsPerPage) + rowsPerPage).map((group) => {
              // fetch specific group detail
                return (
                  <TableRow>
                    <TableCell onLoad>
                      {group.name}
                    </TableCell>
                    <TableCell>
                      <Button variant="flat" color="secondary" onClick={() => {this.handleAddGroup(group.name)}}>Add to Group</Button>
                    </TableCell>
                  </TableRow>
                )

            })}
          </TableBody>
          <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={this.props.groupList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
					      </TableFooter>
        </Table>
      </div>
    );
  };


}


const mapStateToProps = state => {
  return {
    friendList: state.friends.fullFriendList,
    groupList: state.friends.groupList,
    groupMembers: state.friends.groupMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGroups: () => {
      dispatch(friends.getGroups());
    },
    fetchFullFriends: () => {
      console.log("inside fetch full friends");
      dispatch(friends.getFriendList())
    },
    addFriendToGroup: (friend,group) => {
      dispatch(friends.addToGroup(friend,group));
    },
    fetchGroupDetails: (group) => {
      dispatch(friends.fetchGroupDetails(group));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FriendProfile));