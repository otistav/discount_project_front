import React, { Component } from 'react';
import Register from './containers/Register';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header';
import { connect } from 'react-redux';
import axios from 'axios';
import {signInWithVK} from './actions/vkLogIn';
import Login from './containers/Login';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends Component {

  render() {

    return (
      <Router>
        <MuiThemeProvider>
          <div>

            <Header signInVK={this.props.vkLogin}/>
            <Route path="/sign-up" component={Register}/>
            <Route path="/sign-in" component={Login}/>
          </div>
        </MuiThemeProvider>
      </Router>

    );

  }
}

export default connect(
  state => ({

  }),
  dispatch => ({
    vkLogin: () => {
      return dispatch(signInWithVK())
    }
  })
)(App)
