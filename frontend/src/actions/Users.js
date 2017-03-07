import axios from "axios"


const USER_NEW = (username, password, email) => {
  return {
    type: 'USER_NEW',
    payload: axios.post('/user/create', {
      data: {
        username: username,
        email: email,
        password: password
      }
    })
  }
}

const USER_GET = (username) => {
  return {
    type: 'USER_GET',
    payload: axios.get(`/user/${username}`)
  }
}
