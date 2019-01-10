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


class GroupSideBar extends Component {


  render() {
    return(
      <div style={{textAlign: "center", height: "50%"}}>
        <h2>Groups</h2>
        <Table>
          <TableBody>
            {
              this.props.groupList.slice().reverse().slice(0,4).map((group) => {
                console.log("inside group side", group.name);
                return (
                  <TableRow>
                    <TableCell>
                      <Button variant="flat" color="secondary" component={Link} to={`/group/${group.name}`}>{group.name}</Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <br/>
        <br/>
        <Button variant="outlined" color="secondary" component={Link} to={'/groupgeneral'}>General</Button>
      </div>
    );
  }

};


const mapStateToProps = state => {
  return {
    fullFriendList: state.friends.fullFriendList,
    groupList: state.friends.groupList
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GroupSideBar));
