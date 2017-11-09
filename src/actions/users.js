import axios from 'axios'
import * as constants from '../constants/actions';
import * as configConstants from '../constants/config';
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


export function getAllUsers(offset) {
  console.log('this is offset', offset);
  return dispatch => {
    dispatch({
      type: constants.FETCH_USERS_START
    });
    return axios.get('http://localhost:3001/users?offset=' + offset + '&limit=' + configConstants.USERS_LIMIT_PER_PAGE)
      .then(users => {
        console.log(users);
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


export const getQueryUsers = (fullName) => {
  return dispatch => {
    return axios.get('http://localhost:3001/users?q=' + fullName)
      .then(users => {
        dispatch({
          type: constants.FETCH_USERS_SUCCESS,
          payload: users.data
        });
        console.log(users)
      })
  }
};



export const getRoles = () => {
  return dispatch => {
    dispatch({
      type: constants.FETCH_USERS_START
    });
    return axios.get('http://localhost:3001/roles')
      .then(roles => {
        dispatch({
          type: constants.FETCH_ROLES_SUCCESS,
          payload: roles.data
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
};


export function setUser(user) {
  return {
    type: constants.SET_CURRENT_USER,
    payload: user
  }
}

export function setCurrentRole(role) {
  return {
    type: constants.SET_CURRENT_ROLE,
    payload: role
  }
}

export function changeModalStatus() {
  return {
    type: constants.CHANGE_USER_MODAL_STATUS
  }
}

export const editUser = (user, offset) => {
  console.log(user);
  return dispatch => {
    return axios.patch('http://localhost:3001/users/' + user.id, {
      role_id: user.role_id

    })
      .then(user => {
        console.log(user);
        return dispatch(getAllUsers(offset));
      })
      .then((users) => {
        console.log(users, 'this is all users');
        dispatch(changeModalStatus())
      })
  }
};
