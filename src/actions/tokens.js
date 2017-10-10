import axios from 'axios';



export function refreshToken(refresh_token) {
  return dispatch => {
    return axios.patch('http://localhost:3001/refresh-tokens', {
      refresh_token: refresh_token
    })
      .then(result => {
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
      })
  }
}