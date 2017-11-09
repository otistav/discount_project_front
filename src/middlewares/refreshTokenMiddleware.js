import axios from 'axios';
export default function refreshToken(request) {
  console.log(request, 'this is axios data')
  return axios(request)
    .then(result => {
      console.log(result, 'hey this is working module that showes result');
      return axios(request);
    })
    .catch(err => {
      if (err.response.status === 499) {
          console.log(err,' heyheyhey this is working module that shows error');
          console.log('this is refresh_token', localStorage.getItem('refresh_token'));
          return axios.patch('http://localhost:3001/refresh-tokens', {
            refresh_token: localStorage.getItem('refresh_token')
          })
            .then(result => {
              localStorage.setItem('access_token', result.data.access_token);
              localStorage.setItem('refresh_token', result.data.refresh_token);
              console.log(result, 'this is result');
              console.log(axios(request), 'this is promise');
              request.headers =  {access_token: localStorage.getItem('access_token')}
              return axios(request);
          }).catch(err => {
            console.log('this is err in refresh_token middlware', err);
          })
      }

    })
}
