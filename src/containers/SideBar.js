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
    console.log(localStorage.getItem('access_token'), 'this is access token');
    console.log(this.props.location);

    return(
      <div>
        {localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
          ?
          <Paper className="side-bar" style={{backgroundColor: 'RGB(54, 150, 167)'}} >
            <Menu disableAutoFocus={true}>
              <MenuItem
                className="menu-item"
                primaryText="Dashboard"
                style={{ backgroundColor: this.props.location.pathname === '/' ? 'rgb(94, 194, 214)' : 'transparent'}}
                containerElement={<Link to={'/'} />}
                leftIcon={<Icon name="bar-chart"/>}
              />
              <Divider/>
              <MenuItem
                className="menu-item"
                primaryText="Offers"
                containerElement={<Link to={'/offers'}/>}
                leftIcon={<Icon name="handshake-o"/>}
                style={{ backgroundColor: this.props.location.pathname === '/offers' ? 'rgb(94, 194, 214)' : 'transparent'}}
              />
              <MenuItem
                className="menu-item"
                primaryText="Users"
                containerElement={<Link to={'/users/1'}/>}
                leftIcon={<Icon name="user-o"/>}
                style={{ backgroundColor: this.props.location.pathname.indexOf('/users') > -1 ? 'rgb(94, 194, 214)' : 'transparent'}}
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
