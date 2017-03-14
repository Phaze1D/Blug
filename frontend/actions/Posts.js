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


/**
* Redux async action for creating a new post
* @param {string} title - The title of the new post
* @param {string} content - The content of the new post
* @return {object} The redux action
*/
export const postNew = (title, content) => {
  let data = new FormData();
  data.append('title', title)
  data.append('content', content)

  return {
    type: POST_NEW,
    payload: axios.post('/api/post/create', data)
  }
}


/**
* Redux async action for editing a post
* @param {string} post_id - The id of the post that will be edited
* @param {string} title - The title of the post
* @param {string} content - The content of the post
* @return {object} The redux action
*/
export const postEdit = (post_id, title, content) => {
  let data = new FormData();
  data.append('title', title)
  data.append('content', content)
  return {
    type: POST_EDIT,
    payload: axios.put(`/api/post/${post_id}`, data),
  }
}


/**
* Redux async action for fetching a post
* @param {string} post_id - The id of the post that will be fetched
* @return {object} The redux action
*/
export const postGet = (post_id) => {
  return {
    type: POST_GET,
    payload: axios.get(`/api/post/${post_id}`)
  }
}


/**
* Redux async action for deleting a post
* @param {string} post_id - The id of the post that will be deleted
* @return {object} The redux action
*/
export const postDelete = (post_id) => {
  return {
    type: POST_DELETE,
    payload: axios.delete(`/api/post/${post_id}`)
  }
}

/**
* Redux async action for fetching the first 15 posts
* @return {object} The redux action
*/
export const postsIndex = () => {
  return {
    type: POSTS_INDEX,
    payload: axios.get(`/api/posts`)
  }
}


/**
* Redux async action for searching for posts
* @param {string} search - The search query
* @return {object} The redux action
*/
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


/**
* Redux async action for fetching the next 15 posts
* @param {string} cursor - The cursor that represents the next 15 posts
* @param {string} search - The search query || null
* @return {object} The redux action
*/
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


/**
* Redux action for adding a newly created post into the posts array
* @param {object} post - The post to be added
* @return {object} The redux action
*/
export const addNewPost = (post) => {
  return {
    type: ADD_NEW_POST,
    payload: post
  }
}


/**
* Redux action for adding an updated post to the posts array
* @param {object} post - The post to be updated
* @param {int} index - The index in the post's array to be overrided
* @return {object} The redux action
*/
export const addUpdatePost = (post, index) => {
  return {
    type: ADD_UPDATE_POST,
    payload: {post: post, index: index}
  }
}


/**
* Redux action for removing a post from the post's array
* @param {int} index - The index of the post to be removed
* @return {object} redux action
*/
export const removePost = (index) => {
  return {
    type: REMOVE_POST,
    payload: {index: index}
  }
}
