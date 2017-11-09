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
import HomePage from './containers/HomePage';
import SideBar from './containers/SideBar';
import Offers from './containers/Offers';
import Users from './containers/Users';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { withRouter } from 'react-router'
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
    console.log(this.props.location);
    return (
      <Router>
        <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
          <div className='app'>
            <Header signInVK={this.props.vkLogin}
                    history={this.props.history}
            />
            <SideBar/>
            <Route path="/offers" component={Offers}/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/sign-up" component={Register} />
            <Route path="/sign-in" component={Login} />
            <Route path="/users/:id" component={Users}/>

          </div>
        </MuiThemeProvider>
      </Router>

    );

  }
}

export default withRouter(connect(
  state => ({

  }),
  dispatch => ({
    vkLogin: () => {
      return dispatch(signInWithVK())
    }
  })
)(App))
