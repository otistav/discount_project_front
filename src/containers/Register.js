import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import { connect } from 'react-redux';
import '../styles/registration.css';
import jwt from 'jsonwebtoken'
import {
  editPassword,
  editUsername,
  createAccount,
  editFirstName,
  editSecondName
} from "../actions/registration";

class Register extends Component {
  componentDidMount() {
    if (localStorage.getItem('access_token') && localStorage.getItem('refresh_token'))
      this.props.history.replace('/')
  }


  render() {

    return(
      <div className="register-page">

        <RegisterForm
          editUsername={this.props.editUsername}
          editPassword={this.props.editPassword}
          editFirstName={this.props.editFirstName}
          editSecondName={this.props.editSecondName}
          createAccount={this.props.createAccount}
          username={this.props.username}
          password={this.props.password}
          firstName={this.props.firstName}
          secondName={this.props.secondName}
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
    firstName: state.registerForm.currentFirstName,
    secondName: state.registerForm.currentSecondName,
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
    editFirstName: (firstName) => {
      dispatch(editFirstName(firstName));
    },
    editSecondName: (secondName) => {
      dispatch(editSecondName(secondName));
    },
    createAccount: (username, password, firstName, secondName) => {
      return dispatch(createAccount(username, password, firstName, secondName));
    }
  })
)(Register)