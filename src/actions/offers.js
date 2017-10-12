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
