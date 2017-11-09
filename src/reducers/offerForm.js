import * as constants from '../constants/actions';


export default function offerForm(
  state = {
    geolocation: '',
    visited: false,
    name: '',

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
        disposable: !state.disposable
      }
    }

    case constants.LOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        current_image: action.payload
      }
    }
    case constants.MODAL_OFFER_PERCENTAGE_DISCOUNT_EDITED: {
      return {
        ...state,
        percentage_discount: action.payload,
        currency_discount: null,
        currency_discount_limit: null
      }
    }
    case constants.MODAL_OFFER_CURRENCY_DISCOUNT_EDITED: {
      return {
        ...state,
        currency_discount: action.payload,
        percentage_discount: null,
        percentage_discount_limit: null
      }
    }
    case constants.MODAL_OFFER_USE_BONUS_EDITED: {
      return {
        ...state,
        use_bonus: !state.use_bonus
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
        percentage_discount_limit: action.payload,
        currency_discount: null,
        currency_discount_limit: null
      }
    }
    case constants.MODAL_OFFER_CURRENCY_DISCOUNT_LIMIT_EDITED: {
      return {
        ...state,
        currency_discount_limit: action.payload,
        percentage_discount: null,
        percentage_discount_limit: null
      }
    }
    case constants.MODAL_OFFER_GEOLOCATION_EDITED: {
      return {
        ...state,
        geolocation: action.payload
      }
    }
    case constants.SET_CURRENT_OFFER: {
      return {
        ...state,
        ...action.payload,
        visited: true
      }
    }
    case constants.DISCOUNT_TYPE_CHANGED: {
      return {
        ...state,
        discount_type: action.payload
      }
    }

    case constants.FILE: {
      console.log(action);
      return {
        ...state,
        file: action.payload
      }
    }
    default: return state;
  }
}
