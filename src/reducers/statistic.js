import * as constants from '../constants/actions';


export default function statistic(
  state = {
    statisticByDate: null,
    currentStatisticValue: {id: null, value: 0}
  }, action) {

  switch (action.type) {
    case constants.STATISTIC_SAVED: {
      return {
        ...state,
        statisticByDate: action.payload
      }
    }
    case constants.GET_CURRENT_STATISTIC_VALUE: {
      return {
        ...state,
        currentStatisticValue: action.payload
      }
    }

    default: return state;
  }
}