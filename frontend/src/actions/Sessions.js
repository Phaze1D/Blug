import axios from "axios"


const LOGIN = (username, password) => {
  return {
    type: 'LOGIN',
    payload: axios.post('/login', {
      data: {
        username: username,
        password: password
      }
    })
  }
}


const LOGOUT = () => {
  return {
    type: 'LOGOUT',
    payload: axios.delete('/logout')
  }
}
