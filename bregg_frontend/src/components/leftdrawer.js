import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CalendarSideBar from './calendar';

import Profile from "./profile";


const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  }
});

class LeftPermanentDrawer extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        variant='permanent'
        classes={{paper: classes.drawerPaper}}>
        <CalendarSideBar/>
        <Divider />
        <Profile/>
      </Drawer>
    );
  }
}

LeftPermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftPermanentDrawer);
