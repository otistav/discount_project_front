import axios from 'axios';
import * as constants from '../constants/actions';



export const getGames = () => {
  return dispatch => {
    disptch({
      type: constants.FETCH_GAMES_START
    })
    return axios.get('http://localhost:3000/games')
      .then(games => {
        dispatch({
          type: constants.FETCH_GAMES_SUCCESS,
          payload: games.data
        })
        console.log('this is games', games);
      })
  }
}
