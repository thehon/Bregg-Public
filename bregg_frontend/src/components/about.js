import React, { Component } from 'react';
import { connect } from 'react-redux';
import {TextField, Button, AppBar, Typography} from "@material-ui/core/";
import { withStyles } from '@material-ui/core/styles';
import {profile, mainstate} from '../actions';
import {Link} from 'react-router-dom';
import css from './about.css';




class About extends Component{

render() {
    return (

   
      <div align = "center" className="About-Page">
       <Link to="/login" class="login-link"> Back to Login Page</Link>
     <body>
        <h1 align="center"> Bregg</h1>
     
       <h3 align="center" > What is Bregg? </h3>

        <p>
        Bregg is a website that is used for the purpose of
        event organisation amongst users and their friends. 
        Once an event group has been created, Bregg will use
        its innovative GPS mobile tracking system to lock on to the 
        GPS locations of those in the group and return the location 
        on various entertainment venues and restaurants which are  
        roughly located in a position that is in the middle of 
        all those in the group. Users within the event group will
        then be able to vote on which various recommended venues which they would like to go to.
        Once all users have voted and a venue has a majority vote, 
        an event will be created at the selected venue for all users
        in the group. 


       
        </p>

        <h3 align="center" > How To Use Bregg </h3>
          <p>
       The use of Bregg can be simply described through the following steps:
       <ol>
          <li> Register an Account </li>
          <li> Login to Bregg </li>
          <li> Add friends who are also registered on Bregg</li>
          <li> Create an event group</li>
          <li> Select Find a Venue</li>
          <li> Receive prospective venue names</li>
          <li> Vote on your favourite venue</li>
          <li> Receive highest voted event location</li>
          <li> Finalise event details</li>
          <li> Travel to event location</li>
       </ol>
</p>
       
</body>
      
      </div>
    );
  }
}


export default About



