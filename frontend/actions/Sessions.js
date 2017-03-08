import axios from "axios"
import {
  LOGIN,
  LOGOUT,
  SESSION_VERIFY
} from './ActionTypes'


export const login = (username, password) => {
  let data = new FormData();
  data.append('username', username)
  data.append('password', password)
  
  return {
    type: LOGIN,
    payload: axios.post('/api/login', data)
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete('/api/logout')
  }
}


export const verify = () => {
  return {
    type: SESSION_VERIFY,
    payload: axios.get('/api/session/verify')
  }
}
