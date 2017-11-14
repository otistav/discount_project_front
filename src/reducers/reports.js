import * as constants from '../constants/actions';



export default function reports(
  state = { gameTop: [], customersTop: [] }, action
) {
  switch(action.type) {
    case constants.GAME_TOP_FETCH_START: {
      return {
        ...state
      }
    }
    case constants.GAME_TOP_FETCH_SUCCESS: {
      return {
        ...state,
        gameTop: action.payload
      }
    }
    case constants.CUSTOMERS_TOP_FETCH_START: {
      return {
        ...state
      }
    }
    case constants.CUSTOMERS_TOP_FETCH_SUCCESS: {
      return {
        ...state,
        customersTop: action.payload
      }
    }
    default: return state
  }
}
