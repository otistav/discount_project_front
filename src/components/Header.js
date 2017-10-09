import React from 'react'
import AppBar from 'material-ui/AppBar';
import '../styles/header.css'
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import Vk from '../icons/vk-128.svg';
import {Icon} from 'react-fa';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

const Header = (props) => {
  return(
    <AppBar
      className="header"
      title="Camp Discount"
      iconElementLeft={<div/>}
      iconElementRight={
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
                      onClick={props.signInVK}
                      style={{
                        border: '2px solid white',
                        borderRadius: '20%',
                        bottom: '10px'
                      }}
          />
        </div>
      }
      titleStyle={{color: 'white'}}
      style={{background: '#7FC7FF'}}
    />
  )
};


export default Header;