import axios from 'axios';
import * as constants from '../constants/actions';
import * as config from '../constants/config';



export const getGames = () => {
  return dispatch => {
    dispatch({
      type: constants.GAMES_FETCH_START
    })
    return axios.get(config.APP_URL + '/games')
      .then(games => {
        dispatch({
          type: constants.GAMES_FETCH_SUCCESS,
          payload: games.data
        })
        console.log('this is games', games);
      })
  }
}


export const getTopCustomers = (min_date, max_date) => {
  return dispatch => {
    dispatch({
      type: constants.CUSTOMERS_TOP_FETCH_START
    })
    return axios.get(config.APP_URL + '/reports/purchases?type=q&min_date=' + min_date + '&max_date=' + max_date )
      .then(reports => {
        dispatch({
          type: constants.CUSTOMERS_TOP_FETCH_SUCCESS,
          payload: reports.data
        })
        console.log('this is reports==================>', reports)
      })
      .catch(err => {
        dispatch({
          type: constants.CUSTOMERS_TOP_FETCH_FAUILURE
        })
      })
  }
}


export const getGameStatistic = (game_id) => {
  return dispatch => {
    dispatch({
      type: constants.GAME_TOP_FETCH_START
    })
    return axios.get('http://localhost:3000/reports/games/' + game_id)
      .then(reports => {
        // let sortedData = reports.data.sort((a, b) => {
        //   console.log(a.total_value, b.total_value, 'this is a and b')
        //   if (a.total_value > b.total_value)
        //     return 1
        //   if (a.total_value < b.total_value)
        //     return -1
        // })
        dispatch({
          type: constants.GAME_TOP_FETCH_SUCCESS,
          payload: reports.data
        })
        // console.log(sortedData, 'this is sortedData')
      })
      .catch(err => {
        console.log('this is err', err);
      })
  }
}
