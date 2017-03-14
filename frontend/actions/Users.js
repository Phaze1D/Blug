import axios from "axios"
import {
  USER_NEW,
  USER_GET
} from './ActionTypes'

/**
* Redux async action for creating a new userNew
* @param {string} username
* @param {string} password
* @param {string} email
* @return {object} Redux action
*/
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


/**
* Redux async action for fetching a user by username
* @param {string} username - The username to be fetched
* @return {object} Redux action
*/
export const userGet = (username) => {
  return {
    type: USER_GET,
    payload: axios.get(`/api/user/${username}`)
  }
}
