import * as constants from '../constants/actions';


export default function offers(
  state = {
    isFetching: false
  }, action) {

  switch (action.type) {
    case constants.FETCH_OFFERS_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    case constants.FETCH_OFFERS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        isFetching: false
      }
    }
    case constants.FETCH_OFFERS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      }
    }
    default: return state;
  }
}