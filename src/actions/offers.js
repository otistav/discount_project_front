import axios from 'axios';
import * as constants from '../constants/actions';
import {EDIT_OFFERS_SUCCESS} from "../constants/actions";
import {FETCH_OFFERS_SUCCESS} from "../constants/actions";
import refreshToken from '../middlewares/refreshTokenMiddleware.js';
export const getOffers = (history) =>  {
  return (dispatch) => {
    dispatch({
      type: constants.FETCH_OFFERS_START
    });
    return refreshToken(
      {
        method: "GET",
        url: 'http://localhost:3001/offers',
        // headers: {access_token: localStorage.getItem('access_token')},
      },
      history
    )
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

export function saveFile(file) {
  return {
    type: constants.FILE,
    payload: file,
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


export const createOffer = (
  image,
  id,
  name,
  description,
  disposable,
  geolocation,
  percentage_discount,
  currency_discount,
  use_bonus,
  percentage_discount_limit,
  currency_discount_limit,
  cost
) => {
  return dispatch => {
    dispatch({
      type: constants.CREATE_OFFERS_START
    });
    if (image.get('image')) {
      return axios.post('http://localhost:3001/files/', image)
        .then(res => {
          return axios.post('http://localhost:3001/offers/', {
            options: {
              name: name,
              description: description,
              disposable: disposable,
              location: geolocation,
              percentage_discount: percentage_discount,
              percentage_discount_limit: percentage_discount_limit,
              currency_discount: currency_discount,
              currency_discount_limit: currency_discount_limit,
              cost: cost,
              use_bonus: use_bonus,
              image: res.data
            }
          })
        })
        .then(() => {
        dispatch({
          type: constants.EDIT_OFFERS_SUCCESS
        });
        dispatch({
          type: constants.FETCH_OFFERS_START
        });
          return dispatch(getOffers());
        })
        .then(() => {
          dispatch({
            type: constants.FETCH_OFFERS_SUCCESS
          });
          dispatch(changeCreateModalStatus());
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: constants.FETCH_OFFERS_FAILURE,
            payload: err
          })
        })
    }
    else {
      dispatch({
        type: constants.CREATE_OFFERS_START
      });
      return axios.post('http://localhost:3001/offers/', {
        options: {
          name: name,
          description: description,
          disposable: disposable,
          location: geolocation,
          percentage_discount: percentage_discount,
          percentage_discount_limit: percentage_discount_limit,
          currency_discount: currency_discount,
          currency_discount_limit: currency_discount_limit,
          cost: cost,
          use_bonus: use_bonus,
        }
      })
        .then((res) => {
          dispatch({
            type: constants.EDIT_OFFERS_SUCCESS
          });
          dispatch({
            type: constants.FETCH_OFFERS_START
          });
          return dispatch(getOffers());
        })
        .then(() => {
          dispatch({
            type: constants.FETCH_OFFERS_SUCCESS
          });
          dispatch(changeCreateModalStatus());
        })
        .catch(err => {
          dispatch({
            type: constants.FETCH_OFFERS_FAILURE,
            payload: err
          })
          console.log(err);
        })
    }
  }
};

export const loadImage = (image) => {
  return dispatch => {
    dispatch({
      type: constants.LOAD_IMAGE_START
    })
    return axios.post('http://localhost:3001/files/', image)
      .then(res => {
        dispatch({
          type: constants.LOAD_IMAGE_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const editOffer = (
  image,
  id,
  name,
  description,
  disposable,
  geolocation,
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
    if (image.get('image')) {
      return axios.post('http://localhost:3001/files/', image)
        .then(res => {
          console.log(res, 'this is result of uploading image')
          return axios.patch('http://localhost:3001/offers/'+ id, {
            options: {
              name: name,
              description: description,
              disposable: disposable,
              location: geolocation,
              percentage_discount: percentage_discount,
              percentage_discount_limit: percentage_discount_limit,
              currency_discount: currency_discount,
              currency_discount_limit: currency_discount_limit,
              cost: cost,
              use_bonus: use_bonus,
              image: res.data
            }
          })
        })
        .then(() => {
          dispatch({
            type: EDIT_OFFERS_SUCCESS
          });
          dispatch({
            type: FETCH_OFFERS_SUCCESS
          });

          return dispatch(getOffers());
        })
        .then(() => {
          dispatch(changeModalStatus());
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: constants.FETCH_OFFERS_FAILURE,
            payload: err
          })
        })
    }
    else {
      return axios.patch('http://localhost:3001/offers/' + id, {
        options: {
          name: name,
          description: description,
          disposable: disposable,
          location: geolocation,
          percentage_discount: percentage_discount,
          percentage_discount_limit: percentage_discount_limit,
          currency_discount: currency_discount,
          currency_discount_limit: currency_discount_limit,
          cost: cost,
          use_bonus: use_bonus,
        }
      })
        .then((res) => {
          return dispatch(getOffers());
        })
        .then(() => {
          dispatch(changeModalStatus());
        })
        .catch(err => {
          dispatch({
            type: constants.FETCH_OFFERS_FAILURE,
            payload: err
          })
          console.log(err);
        })
    }

  }
};


export function changeCreateModalStatus() {
  return {
    type: constants.CHANGE_CREATE_MODAL_STATUS
  }
}

export function changeDiscount(discount) {
  return {
    type: constants.DISCOUNT_TYPE_CHANGED,
    payload: discount
  }
}
