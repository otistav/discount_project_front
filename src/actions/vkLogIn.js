import axios from 'axios';

export const signInWithVK = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3001/vk_auth").then((res) => {
      console.log(res)
    })

  }
};