import axios from "axios"
import {
  LOGIN,
  LOGOUT
} from './ActionTypes'


const login = (username, password) => {
  return {
    type: LOGIN,
    payload: axios.post('/login', {
      data: {
        username: username,
        password: password
      }
    })
  }
}


const logout = () => {
  return {
    type: LOGOUT,
    payload: axios.delete('/logout')
  }
}
