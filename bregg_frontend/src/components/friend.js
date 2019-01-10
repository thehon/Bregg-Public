import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {friends} from '../actions';
import { withStyles } from '@material-ui/core/styles';
import {TextField, Button, AppBar, Typography, Table, TableBody,TableCell, TableHead, TableRow} from "@material-ui/core/";
import { Link } from "react-router-dom";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class FriendSideBar extends Component {
  state = {
    friend: "",
  };

  componentDidMount() {
    // console.log("friend side bar friend length",this.props.fullFriendList.length);
    if(this.props.fullFriendList.length === 0){
      this.props.fetchFriendList();
    }
  }

  render () {
    // friend list side bar. will show maximum of 4 friend list on the side bar.
    return (
      <div id="friend-side-bar-right" style={{textAlign: "center", height: "50%", paddingTop: "30%"}}>
        <h2>Friends</h2>
        <Table style={{minWidth: "70%"}}>
          <TableBody>
            {this.props.fullFriendList.slice().reverse().slice(0,4).map((friend) => {
              // console.log("inside friendside bar",friend);
              const friendId = friend["id"];
              return (
              <TableRow key={friend["id"]}>
                <TableCell >
                  <Button variant="text" color="secondary" component={Link} to={`/friend/profile/${friendId}`}>{friend["firstname"]} {friend["lastname"]}</Button>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <br/>
        <br/>
        <Button variant="outlined" color="secondary" component={Link} to={'/friends'}>Add Friend</Button>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    fullFriendList: state.friends.fullFriendList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFriendList: () => {
      console.log("inside friend side bar get friend list");
      dispatch(friends.getFriendList());
    }
  };
}



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FriendSideBar));
