import axios from 'axios'
import jwt from 'jsonwebtoken'

export function getUser(access_token, id) {
  return (dispatch) => {
    return axios.get('http://localhost:3001/user_by_token',  {headers: {
      access_token: access_token
    }})
      .then(user => {
        console.log('this is user', user)
      })
      .catch(e => {
        if (e.response.status === 499) {

        }
      })
  }
}


export function getAllUsers() {

}