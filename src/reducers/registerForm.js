import * as constants from '../constants/actions';


export default function registerForm(
  state = {
    error: null,
    user: null,
    currentPassword: '',
    currentUsername: '',
    currentFirstName: '',
    currentSecondName: ''
  }, action) {
  switch (action.type) {
    case constants.REGISTER_USERNAME_EDITED: {
      return {
        ...state,
        currentUsername: action.payload,
        error: null
      }
    }
    case constants.REGISTER_FIRST_NAME_EDITED: {
      return {
        ...state,
        currentFirstName: action.payload,
        error: null
      }
    }
    case constants.REGISTER_SECOND_NAME_EDITED: {
      return {
        ...state,
        currentSecondName: action.payload,
        error: null
      }
    }
    case constants.REGISTER_PASSWORD_EDITED: {
      return {
        ...state,
        currentPassword: action.payload,
        error: null
      }
    }
    case constants.CREATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: null
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