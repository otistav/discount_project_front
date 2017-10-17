import * as constants from '../constants/actions';


export default function users(state = {}, action) {
  switch (action.type) {
    case constants.FETCH_USERS_START: {
      return {
        ...state
      }
    }
    case constants.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload
      }
    }
    default: return state
  }
}