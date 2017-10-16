import * as constants from '../constants/actions';


export default function offers(
  state = {
    isFetching: false,
    items: [],
    isModalOpen: false,
    currentOffer: {}
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
    case constants.CHANGE_CREATE_MODAL_STATUS: {
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen
      }
    }

    case constants.CHANGE_MODAL_STATUS: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      }
    }
    case constants.SET_CURRENT_OFFER: {
      return {
        ...state,
        currentOffer: action.payload
      }
    }
    default: return state;
  }
}