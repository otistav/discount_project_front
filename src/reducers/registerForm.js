import * as constants from '../constants/actions';


export default function registerForm(
  state = {
    error: null,
    user: null,
    currentPassword: '',
    currentUsername: ''
  }, action) {
  switch (action.type) {
    case constants.REGISTER_USERNAME_EDITED: {
      return {
        ...state,
        currentUsername: action.payload
      }
    }
    case constants.REGISTER_PASSWORD_EDITED: {
      return {
        ...state,
        currentPassword: action.payload
      }
    }
    case constants.CREATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isFetching: false
      }
    }
    case constants.CREATE_USER_ERROR: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    }
    case constants.CREATE_USER_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    default: return state;
  }
}