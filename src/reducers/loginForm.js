import * as constants from '../constants/actions';


export default function loginForm(
  state = {
    error: null,
    user: null,
    currentPassword: '',
    currentUsername: ''
  }, action) {

  switch (action.type) {
    case constants.LOGIN_USERNAME_EDITED: {
      return {
        ...state,
        currentUsername: action.payload,
        error: null
      }
    }
    case constants.LOGIN_PASSWORD_EDITED: {
      return {
        ...state,
        currentPassword: action.payload,
        error: null
      }
    }
    case constants.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: null
      }
    }
    case constants.LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    }
    case constants.LOGIN_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    default: return state;
  }
}