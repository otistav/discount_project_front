import axios from 'axios';

export const signInWithVK = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:3001/vk_auth").then((res) => {
      console.log(res)
    })

  }
};
