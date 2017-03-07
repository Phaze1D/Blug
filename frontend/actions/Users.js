import axios from "axios"
import {
  USER_NEW,
  USER_GET
} from './ActionTypes'


export const userNew = (username, password, email) => {
  return {
    type: USER_NEW,
    payload: axios.post('/user/create', {
      data: {
        username: username,
        email: email,
        password: password
      }
    })
  }
}

export const userGet = (username) => {
  return {
    type: USER_GET,
    payload: axios.get(`/user/${username}`)
  }
}
