import axios from 'axios'
import * as constants from '../constants/actions';

export function getUser(access_token, id) {
  return (dispatch) => {
    return axios.get('http://localhost:3001/user_by_token',  {headers: {
      access_token: access_token
    }})
      .then(user => {
        console.log('this is user', user)
      })
      .catch(e => {
        if (e.response.status === 499) {

        }
      })
  }
}


export function getAllUsers() {
  return dispatch => {
    dispatch({
      type: constants.FETCH_USERS_START
    });
    return axios.get('http://localhost:3001/users')
      .then(users => {
        dispatch({
          type: constants.FETCH_USERS_SUCCESS,
          payload: users.data
        })
      })
      .catch(e => {
        dispatch({
          type: constants.FETCH_USERS_FAILURE,
          payload: e
        });
        console.log(e);
      })
  }
}