import * as constants from '../constants/actions';
import axios from 'axios';


export function editUsername(username) {
  return {
    type: constants.LOGIN_USERNAME_EDITED,
    payload: username
  }
}


export function editPassword(password) {
  return {
    type: constants.LOGIN_PASSWORD_EDITED,
    payload: password
  }
}


export const logIn = (username, password) =>  {
  return (dispatch) => {
    dispatch({type: constants.LOGIN_START});
    return axios.post("http://localhost:3001/login", {
      username: username,
      password: password
    })
      .then(user => {
        dispatch({type: constants.LOGIN_SUCCESS, payload: user});
        localStorage.setItem('access_token', user.data.access_token);
        localStorage.setItem('refresh_token', user.data.refresh_token);
      })

      .catch(err => {
        dispatch({type: constants.LOGIN_ERROR, payload: err});
        return Promise.reject(err)
      })
  }
};