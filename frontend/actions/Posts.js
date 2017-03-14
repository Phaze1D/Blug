import axios from "axios"
import {
  POST_NEW,
  POST_EDIT,
  POST_GET,
  POST_DELETE,
  USER_POSTS_INDEX,
  POSTS_INDEX,
  ADD_NEW_POST,
  ADD_UPDATE_POST,
  REMOVE_POST,
  SEARCH,
  POSTS_NEXT_PAGE
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
  let data = new FormData();
  data.append('title', title)
  data.append('content', content)
  return {
    type: POST_EDIT,
    payload: axios.put(`/api/post/${post_id}`, data),
  }
}

export const postGet = (post_id) => {
  return {
    type: POST_GET,
    payload: axios.get(`/api/post/${post_id}`)
  }
}

export const postDelete = (post_id) => {
  return {
    type: POST_DELETE,
    payload: axios.delete(`/api/post/${post_id}`)
  }
}

export const postsIndex = () => {
  return {
    type: POSTS_INDEX,
    payload: axios.get(`/api/posts`)
  }
}

export const search = (search) => {
  return {
    type: SEARCH,
    payload: axios.get('/api/posts', {
      params: {
        search: search
      }
    })
  }
}

export const postsNextPage = (cursor, search=null) => {
  return {
    type: POSTS_NEXT_PAGE,
    payload: axios.get(`/api/posts`, {
      params:{
        cursor: cursor,
        search: search
      }
    })
  }
}


export const addNewPost = (post) => {
  return {
    type: ADD_NEW_POST,
    payload: post
  }
}

export const addUpdatePost = (post, index) => {
  return {
    type: ADD_UPDATE_POST,
    payload: {post: post, index: index}
  }
}

export const removePost = (index) => {
  return {
    type: REMOVE_POST,
    payload: {index: index}
  }
}
