import * as constants from '../constants/actions';
import axios from 'axios';


export function editUsername(username) {
  return {
    type: constants.REGISTER_USERNAME_EDITED,
    payload: username
  }
}


export function editPassword(password) {
  return {
    type: constants.REGISTER_PASSWORD_EDITED,
    payload: password
  }
}

export function editFirstName(firstName) {
  return {
    type: constants.REGISTER_FIRST_NAME_EDITED,
    payload: firstName
  }
}


export function editSecondName(secondName) {
  return {
    type: constants.REGISTER_SECOND_NAME_EDITED,
    payload: secondName
  }
}


export const createAccount = (username, password, firstName, secondName) =>  {
  return (dispatch) => {
    dispatch({type: constants.CREATE_USER_START});
    console.log(firstName, secondName, 'this is first and second name')
    return axios.post("http://localhost:3001/users", {
      username: username,
      password: password,
      first_name: firstName,
      second_name: secondName,
      role_id: "f2dd5327-3c71-4b54-94ab-e5ae7f5c6198"
    })
      .then(user => {
        dispatch({type: constants.CREATE_USER_SUCCESS, payload: user});
      })
      .catch(err => {
        dispatch({type: constants.CREATE_USER_ERROR, payload: err});
        return Promise.reject(err)
      })
  }
};