import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import '../styles/header.css'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import Vk from '../icons/vk-128.svg';
import {Icon} from 'react-fa';
import ActionHome from 'material-ui/svg-icons/action/home';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class Header extends Component {
  render() {
    return(
      <AppBar
        className="header"
        title="Camp Discount"
        iconElementLeft={<div/>}
        iconElementRight={
          <div>
            {localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
              ?
              <div>
                <IconButton>
                  <ActionHome />
                </IconButton>
                <FlatButton label= "logout"
                            labelStyle={{color: 'white'}}
                            onClick={
                              () => {
                                localStorage.removeItem('refresh_token');
                                localStorage.removeItem('access_token');
                                this.props.history.replace('/sign-in')
                              }
                            }
                            style={{
                              borderRadius: '20%',
                              border: '2px white solid',
                              marginRight: '10px',
                              bottom: '5px'
                            }}
                />
              </div>
              :
              <div>
                <FlatButton label="sign in"
                            containerElement={<Link to="/sign-in"/>}
                            labelStyle={{color: 'white'}}
                            style={{
                              borderRadius: '20%',
                              border: '2px white solid',
                              marginRight: '10px'
                            }}
                />

                <FlatButton label="sign up"
                            containerElement={<Link to="/sign-up"/>}
                            labelStyle={{color: 'white'}}
                            style={{
                              borderRadius: '20%',
                              border: '2px solid white',
                              marginRight: '10px'
                            }}
                />

                <FlatButton label={<Icon size="2x" style={{color: 'white'}} name="vk" />}
                            onClick={this.props.signInVK}
                            style={{
                              border: '2px solid white',
                              borderRadius: '20%',
                              bottom: '10px'
                            }}
                />
              </div>

            }
          </div>
        }

        titleStyle={{color: 'white'}}
        style={{background: '#7FC7FF'}}
      />
    )
  }

}


export default withRouter(connect()(Header));
