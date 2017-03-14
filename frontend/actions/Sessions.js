import axios from "axios"
import {
  LOGIN,
  LOGOUT,
  SESSION_VERIFY
} from './ActionTypes'


/**
* Redux async action for logging in a user
* @param {string} username
* @param {string} password
* @return {object} Redux action
*/
export const login = (username, password) => {
  let data = new FormData();
  data.append('username', username)
  data.append('password', password)

  return {
    type: LOGIN,
    payload: axios.post('/api/login', data)
  }
}


/**
* Redux async action for logging out a user
* @return {object} Redux action
*/
export const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete('/api/logout')
  }
}


/**
* Redux async action for verifing if user is logged in
* @return {object} Redux action
*/
export const verify = () => {
  return {
    type: SESSION_VERIFY,
    payload: axios.get('/api/session/verify')
  }
}
