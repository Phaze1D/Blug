import axios from "axios"
import {
  USER_NEW,
  USER_GET
} from './ActionTypes'


export const userNew = (username, password, email) => {
  let data = new FormData();
  data.append('username', username)
  data.append('email', email)
  data.append('password', password)

  return {
    type: USER_NEW,
    payload: axios.post('/api/user/create', data)
  }
}

export const userGet = (username) => {
  return {
    type: USER_GET,
    payload: axios.get(`/api/user/${username}`)
  }
}
