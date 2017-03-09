import axios from "axios"
import {
  POST_NEW,
  POST_EDIT,
  POST_GET,
  USER_POSTS_INDEX,
  POSTS_INDEX
} from './ActionTypes'


export const postNew = (title='', content='') => {
  let data = new FormData();
  data.append('title', title)
  data.append('content', content)

  return {
    type: POST_NEW,
    payload: axios.post('/api/post/create', data)
  }
}

export const postEdit = (post_id, title, content) => {
  return {
    type: POST_EDIT,
    payload: axios.put(`/api/post/${post_id}`, {
      data: {
        title: title,
        content: content,
      }
    })
  }
}

export const postGet = (post_id) => {
  return {
    type: POST_GET,
    payload: axios.get(`/api/post/${post_id}`)
  }
}

export const userPostsIndex = (user_id, cursor=null) => {
  return {
    type: USER_POSTS_INDEX,
    payload: axios.get(`/api/user/${user_id}/posts`, {
      params:{
        cursor: cursor
      }
    })
  }
}

export const postsIndex = (cursor=null) => {
  return {
    type: POSTS_INDEX,
    payload: axios.get(`/api/posts`, {
      params:{
        cursor: cursor
      }
    })
  }
}
