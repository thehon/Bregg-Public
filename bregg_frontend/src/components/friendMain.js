import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography, Table, TableBody,TableCell, TableHead, TableRow} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import { friends } from "../actions";
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


class FriendMain extends Component {

  state = {
    firstname: "",
    lastname: "",
    groupname: "",
  }

  componentDidMount() {
    console.log("inside component did mount");
    this.props.getGroups();
    this.props.getFriendList();
    this.props.groupList.map((group) => {
      console.log("inside component did mount",group);
    })
  }

  onConfirm = () => {
    console.log("inisde onCofirm");
    this.props.findFriends(this.state.firstname,this.state.lastname);
    this.setState({firstname: ""});
    this.setState({lastname: ""});
  }

  onClickFriend = (email) => {
    console.log("insided onclick friend", email);
    this.props.addFriend(email);
  }

  onCreateGroup = () => {
    this.props.createGroup(this.state.groupname);
    this.setState({groupname: ""});
  }

  render() {

    return (
      <div style={{height: "100%", width: "100%" }}>
        <section style={{margin: "auto", padding: "10px", width: "100%"}}>
        <div style={{width: "50%", height: "100%", float: "left"}}>
        <h2>Find Friend</h2>
        <TextField
          id="standard-friend-search-first"
          label="Enter First Name"
          // className={classes.textField}
          value={this.state.firstname}
          onChange={e => this.setState({firstname: e.target.value})}
          margin="normal"
        />

        <TextField
          id="standard-friend-search-last"
          label="Enter Last Name"
          // className={classes.textField}
          value={this.state.lastname}
          onChange={e => this.setState({lastname: e.target.value})}
          margin="normal"
          style={{marginLeft: "30px"}}
        />
        <br/>
        <Button variant="flat" color="secondary" onClick={this.onConfirm}>Find Friend</Button>
        <Table style={{minWidth: "700"}}>
          <TableHead>
            <TableRow>
              <TableCell>Friends</TableCell>
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.foundFriends.map((friend) => {
              console.log("inside tablebody", friend);
              return (
                <TableRow>
                <TableCell>
                  {friend.fields["FirstName"]} {friend.fields["LastName"]}
                </TableCell>
                <TableCell>
                  <Button variant="flat" color="secondary" onClick={() => {this.onClickFriend(friend.fields["EmailAddress"])}}>Add Friend</Button>
                </TableCell>
              </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
        </div>
        <div style={{marginLeft:"50%",height:"100%"}}>
          <h2>Full Friends List</h2>
          {this.props.fullFriendList.map((friend) => {
                const friendId = friend["id"];
                return(
                  <Button variant="text" color="secondary" component={Link} to={`/friend/profile/${friendId}`}>{friend["firstname"]} {friend["lastname"]}</Button>
                );


              })}

        </div>

        </section>


      </div>
    );
  }


};

const mapStateToProps = state => {
  return {
    foundFriends: state.friends.friendsList,
    groupList: state.friends.groupList,
    fullFriendList: state.friends.fullFriendList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findFriends: (firstname, lastname) => {
      dispatch(friends.fetchFriends(firstname, lastname));
    },
    addFriend: (email) => {
      dispatch(friends.addFriend(email));
    },
    createGroup: (name) => {
      dispatch(friends.createGroup(name));
    },
    getGroups: () => {
      dispatch(friends.getGroups());
    },
    getFriendList: () => {
      dispatch(friends.getFriendList());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FriendMain));