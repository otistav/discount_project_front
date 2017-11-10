import axios from 'axios';
import customHistory from '../history';
export default function refreshToken(request, history) {
  console.log(request, 'this is axios data')
  return axios(request)
    .then(result => {
      return axios(request);
    })
    .catch(err => {
      console.log(err.response.status, 'this is err.response.status')
      if (err.response.status === 499) {
          return axios.patch('http://localhost:3001/refresh-tokens', {
            refresh_token: localStorage.getItem('refresh_token')
          })
            .then(result => {
              localStorage.setItem('access_token', result.data.access_token);
              localStorage.setItem('refresh_token', result.data.refresh_token);
              request.headers =  {access_token: localStorage.getItem('access_token')}
              return axios(request);
          }).catch(err => {
            if (err.response.status === 401) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              customHistory.replace('/sign-in');
            }
            console.log('this is err in refresh_token middlware', err);
          })
      }
      if (err.response.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        customHistory.replace('/sign-in');
      }


    })
}
