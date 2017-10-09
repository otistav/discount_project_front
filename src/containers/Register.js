import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import { connect } from 'react-redux';
import '../styles/registration.css';
import {
  editPassword,
  editUsername,
  createAccount
} from "../actions/registration";

class Register extends Component {

  render() {
    const {match, location, history} = this.props;
    return(
      <div className="register-page">

        <RegisterForm
          editUsername={this.props.editUsername}
          editPassword={this.props.editPassword}
          createAccount={this.props.createAccount}
          username={this.props.username}
          password={this.props.password}
          error={this.props.error}
          isFetching={this.props.isFetching}
          history={this.props.history}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    username: state.registerForm.currentUsername,
    password: state.registerForm.currentPassword,
    isFetching: state.registerForm.isFetching,
    error: state.registerForm.error,
    user: state.registerForm.user
  }),
  dispatch => ({
    editUsername: (username) => {
      dispatch(editUsername(username));
    },
    editPassword: (password) => {
      dispatch(editPassword(password));
    },
    createAccount: (username, password) => {
      return dispatch(createAccount(username, password));
    }
  })
)(Register)