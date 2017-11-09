import * as constants from '../constants/actions';


export default function users(state = {isModalOpen: false, currentUser: {}}, action) {
  switch (action.type) {
    case constants.FETCH_USERS_START: {
      return {
        ...state
      }
    }
    case constants.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        items: action.payload.users,
        count: action.payload.count
      }
    }

    case constants.FETCH_ROLES_SUCCESS: {
      return {
        ...state,
        roles: action.payload
      }
    }
    case constants.CHANGE_USER_MODAL_STATUS: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }
    }
    case constants.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload
      }
    }
    case constants.SET_CURRENT_ROLE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          role_id: action.payload.uuid,
          role: action.payload
        }
      }
    }
    default: return state
  }
}