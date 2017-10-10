import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import { connect } from 'react-redux';
import '../styles/registration.css';
import {
  logIn,
  editPassword,
  editUsername
} from "../actions/login";


class Login extends Component {
  componentDidMount() {
    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token')) this.props.history.replace('/')
  }


  render() {
    console.log(this.props.error);
    const {match, location, history} = this.props;
    return(
      <div className="register-page">



        <LoginForm
          editUsername={this.props.editUsername}
          editPassword={this.props.editPassword}
          login={this.props.login}
          username={this.props.username}
          password={this.props.password}
          error={this.props.error}
          history={this.props.history}
          isFetching={this.props.isFetching}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    username: state.loginForm.currentUsername,
    password: state.loginForm.currentPassword,
    isFetching: state.loginForm.isFetching,
    error: state.loginForm.error,
    user: state.loginForm.user
  }),
  dispatch => ({
    editUsername: (username) => {
      dispatch(editUsername(username));
    },
    editPassword: (password) => {
      dispatch(editPassword(password));
    },
    login: (username, password) => {
      return dispatch(logIn(username, password));
    }
  })
)(Login)