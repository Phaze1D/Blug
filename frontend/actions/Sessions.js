import axios from "axios"
import {
  LOGIN,
  LOGOUT,
  SESSION_VERIFY
} from './ActionTypes'


export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios.post('/api/login', {
      data: {
        username: username,
        password: password
      }
    })
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
