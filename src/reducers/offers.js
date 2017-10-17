import * as constants from '../constants/actions';


export default function offers(
  state = {
    isFetching: false,
    items: [],
    error: null,
    isModalOpen: false,
    currentOffer: {}
  }, action) {

  switch (action.type) {
    case constants.FETCH_OFFERS_START: {
      return {
        ...state,
        isFetching: true,
        error: null
      }
    }
    case constants.FETCH_OFFERS_SUCCESS: {
      return {
        ...state,
        items: action.payload,
        isFetching: false,
        error: null
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
        isCreateModalOpen: !state.isCreateModalOpen,
        error: null
      }
    }

    case constants.CHANGE_MODAL_STATUS: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        error: null
      }
    }
    case constants.SET_CURRENT_OFFER: {
      return {
        ...state,
        currentOffer: action.payload,
        error: null
      }
    }
    default: return state;
  }
}