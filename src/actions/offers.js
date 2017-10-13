import axios from 'axios';
import * as constants from '../constants/actions';
export const getOffers = () =>  {
  return (dispatch) => {
    dispatch({
      type: constants.FETCH_OFFERS_START
    });
    return axios.get('http://localhost:3001/offers')
      .then(res => {
        dispatch({
          type: constants.FETCH_OFFERS_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: constants.FETCH_OFFERS_FAILURE,
          payload: err
        })
      })

  }
};


export function setCurrentOffer(offer) {
  return {
    type: constants.SET_CURRENT_OFFER,
    payload: offer
  }
}

export function changeModalStatus() {
  return {
    type: constants.CHANGE_MODAL_STATUS
  }
}


export function editModalName(name) {
  return {
    type: constants.MODAL_OFFER_NAME_EDITED,
    payload: name
  }

}

export function editModalDescription(description) {
  return {
    type: constants.MODAL_OFFER_DESCRIPTION_EDITED,
    payload: description
  }
}


export function editModalDisposableStatus(status) {
  return {
    type: constants.MODAL_OFFER_DISPOSABLE_EDITED,
    payload: status
  }
}

export function editModalPercentageDiscount(discount) {
  return {
    type: constants.MODAL_OFFER_PERCENTAGE_DISCOUNT_EDITED,
    payload: discount
  }
}

export function editGeolocation(geolocation) {
  return {
    type: constants.MODAL_OFFER_GEOLOCATION_EDITED,
    payload: geolocation
  }
}

export function editModalCurrencyDiscount(discount) {
  return {
    type: constants.MODAL_OFFER_CURRENCY_DISCOUNT_EDITED,
    payload: discount
  }
}

export function editModalUseBonusStatus(use_bonus) {
  return {
    type: constants.MODAL_OFFER_USE_BONUS_EDITED,
    payload: use_bonus
  }
}

export function editModalCurrencyDiscountLimit(currency_discount_limit) {
  return {
    type: constants.MODAL_OFFER_CURRENCY_DISCOUNT_LIMIT_EDITED,
    payload: currency_discount_limit
  }
}

export function editModalPercentageDiscountLimit(percentage_discount_limit) {
  return {
    type: constants.MODAL_OFFER_PERCENTAGE_DISCOUNT_LIMIT_EDITED,
    payload: percentage_discount_limit
  }
}

export function editModalCost(cost) {
  return {
    type: constants.MODAL_OFFER_COST_EDITED,
    payload: cost
  }
}

export const editOffer = (
  name,
  description,
  disposable,
  latitude,
  longitude,
  percentage_discount,
  currency_discount,
  use_bonus,
  percentage_discount_limit,
  currency_discount_limit,
  cost
) => {
  return dispatch => {
    dispatch({
      type: constants.EDIT_OFFERS_START
    });
    return axios.patch('http://localhost:3001/offers', {

      name: name,
      description: description,


    })
      .then(res => {
        dispatch({
          type: constants.EDIT_OFFERS_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: constants.EDIT_OFFERS_FAILURE,
          payload: err
        })
      })
  }
};

