import * as constants from '../constants/actions';


export default function offerForm(
  state = {
    geolocation: '',
  }, action) {

  switch (action.type) {
    case constants.MODAL_OFFER_NAME_EDITED: {
      return {
        ...state,
        name: action.payload
      }
    }
    case constants.MODAL_OFFER_DESCRIPTION_EDITED: {
      return {
        ...state,
        description: action.payload
      }
    }
    case constants.MODAL_OFFER_DISPOSABLE_EDITED: {
      return {
        ...state,
        disposable: action.payload
      }
    }
    case constants.MODAL_OFFER_PERCENTAGE_DISCOUNT_EDITED: {
      return {
        ...state,
        percentage_discount: action.payload
      }
    }
    case constants.MODAL_OFFER_CURRENCY_DISCOUNT_EDITED: {
      return {
        ...state,
        currency_discount: action.payload
      }
    }
    case constants.MODAL_OFFER_USE_BONUS_EDITED: {
      return {
        ...state,
        use_bonus: action.payload
      }
    }
    case constants.MODAL_OFFER_COST_EDITED: {
      return {
        ...state,
        cost: action.payload
      }
    }
    case constants.MODAL_OFFER_PERCENTAGE_DISCOUNT_LIMIT_EDITED: {
      return {
        ...state,
        percentage_discount_limit: action.payload
      }
    }
    case constants.MODAL_OFFER_CURRENCY_DISCOUNT_LIMIT_EDITED: {
      return {
        ...state,
        currency_discount_limit: action.payload
      }
    }
    case constants.MODAL_OFFER_GEOLOCATION_EDITED: {
      return {
        ...state,
        geolocation: action.payload
      }
    }
    default: return state;
  }
}