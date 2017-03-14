import axios from "axios"
import {
  LIKE_NEW,
  LIKE_DELETE,
  DISLIKE_NEW,
  DISLIKE_DELETE
} from '../actions/ActionTypes'


/**
* Redux Async Action for creating a new like
* @param {string} post_id - the id of the post to be like
* @return the redux action
*/
export const likeNew = (post_id) => {
  return {
    type: LIKE_NEW,
    payload: axios.post(`/api/post/${post_id}/like`)
  }
}


/**
* Redux Async Action for deleting a like
* @param {string} post_id - the id of the post to be unliked
* @return the redux action
*/
export const likeDelete = (post_id) => {
  return {
    type: LIKE_DELETE,
    payload: axios.delete(`/api/post/${post_id}/like`)
  }
}


/**
* Redux Async Action for creating a new dislike
* @param {string} post_id - the id of the post to be dislike
* @return the redux action
*/
export const dislikeNew = (post_id) => {
  return {
    type: DISLIKE_NEW,
    payload: axios.post(`/api/post/${post_id}/dislike`)
  }
}


/**
* Redux Async Action for deleting a dislike
* @param {string} post_id - the id of the post to be undisliked
* @return the redux action
*/
export const dislikeDelete = (post_id) => {
  return {
    type: DISLIKE_DELETE,
    payload: axios.delete(`/api/post/${post_id}/dislike`)
  }
}
