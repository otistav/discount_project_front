import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getUser} from "../actions/users";
import Paper from 'material-ui/Paper';

import '../styles/home-page.css';




class HomePage extends Component {
  componentDidMount() {
    if (!(localStorage.getItem('access_token') && localStorage.getItem('refresh_token')))
      this.props.history.replace('/sign-in');

  }


  render() {
    return(
      <div className="home-page">
        <Paper style={{width: '10%', height: '100%', display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' }}/>
      </div>
    )

  }
}


export default connect(
  state => ({

  }),
  dispatch => ({
    getUser: (access_token) => {
      return dispatch(getUser(access_token))
    }
  })

)(HomePage);