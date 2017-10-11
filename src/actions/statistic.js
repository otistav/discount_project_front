import axios from 'axios';
import * as constants from '../constants/actions';


export function getStatistic() {
  return (dispatch) => {
    return axios.get('http://localhost:3001/statistic')
      .then(statistic => {
        dispatch(saveStatistic(statistic.data));
      })
      .catch(e => {
        console.log(e);
      })
  }
}


export const saveStatistic = (statistic) => {
  return {
    type: constants.STATISTIC_SAVED,
    payload: statistic
  }
};


export const setCurrentStatisticValue = (value, id) => {
  return {
    type: constants.GET_CURRENT_STATISTIC_VALUE,
    payload: {value: value, id: id}
  }
};