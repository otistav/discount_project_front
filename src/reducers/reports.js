import * as constants from '../constants/actions';



export default function reports(
  state = { gameTop: [] }, action
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
    default: return state
  }
}
