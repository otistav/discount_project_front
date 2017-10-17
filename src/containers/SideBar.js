import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import '../styles/side-bar.css';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Icon from 'react-fontawesome'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class SideBar extends Component {

  render() {
    console.log(localStorage.getItem('access_token'), 'this is access token')
    return(
      <div>
        {localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
          ?
          <Paper className="side-bar" >
            <Menu disableAutoFocus={true}>
              <MenuItem
                primaryText="Dashboard"
                style={{width: '85%'}}
                containerElement={<Link to={'/'} />}
                leftIcon={<Icon name="bar-chart"/>}
              />
              <Divider/>
              <MenuItem
                primaryText="Offers"
                containerElement={<Link to={'/offers'}/>}
                leftIcon={<Icon name="handshake-o"/>}
                style={{width: '85%'}}
              />
              <MenuItem
                primaryText="Users"
                containerElement={<Link to={'/users'}/>}
                leftIcon={<Icon name="user-o"/>}
                style={{width: '85%'}}
              />
            </Menu>
          </Paper>
          :
          null
        }

      </div>
    )
  }
}


export default withRouter(connect(
  state => ({

  }),
  dispatch => ({

  })
)(SideBar))