import axios from "axios"
import {
  POST_NEW,
  POST_EDIT,
  POST_GET,
  USER_POSTS_INDEX,
  POSTS_INDEX
} from './ActionTypes'


const postNew = (title, content, tags) => {
  return {
    type: POST_NEW,
    payload: axios.post('/post/create', {
      data: {
        title: title,
        content: content,
        tags: tags // CAREFUL ERROR
      }
    })
  }
}

const postEdit = (post_id, title, content, tags) => {
  return {
    type: POST_EDIT,
    payload: axios.put(`/post/${post_id}`, {
      data: {
        title: title,
        content: content,
        tags: tags // CAREFUL ERROR
      }
    })
  }
}


const postGet = (post_id) => {
  return {
    type: POST_GET,
    payload: axios.get(`/post/${post_id}`)
  }
}


const userPostsIndex = (user_id) => {
  return {
    type: USER_POSTS_INDEX,
    payload: axios.get(`user/${user_id}/posts`)
  }
}


const postsIndex = () => {
  return {
    type: POSTS_INDEX,
    payload: axios.get(`/posts`)
  }
}
