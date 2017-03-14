import axios from "axios"
import {
  POST_COMMENT_NEW,
  COMMENT_EDIT,
  POST_COMMENT_INDEX,
  ADD_COMMENT_POST,
  COMMENTS_NEXT_PAGE
} from './ActionTypes'


/**
* Redux Async Action for creating a new comment
* @param {string} post_id - The comments post's id
* @param {string} comment - The comment's content
* @return {object} The redux action
*/
export const postCommentNew = (post_id, comment) => {
  let data = new FormData();
  data.append('comment', comment)

  return {
    type: POST_COMMENT_NEW,
    payload: axios.post(`/api/post/${post_id}/comment/create`, data)
  }
}


/**
* Redux Async Action for fetching the first 8 post's comments
* @param {string} post_id
* @return {object} The redux action
*/
export const postCommentIndex = (post_id) => {
  return {
    type: POST_COMMENT_INDEX,
    payload: axios.get(`/api/post/${post_id}/comments`)
  }
}


/**
* Redux Async Action for fetching the next 8 comments of a post
* @param {string} post_id
* @param {string} cursor - a urlsafe string that represents the next page
* @return {object} The redux action
*/
export const commentsNextPage = (post_id, cursor) => {
  return {
    type: COMMENTS_NEXT_PAGE,
    payload: axios.get(`/api/post/${post_id}/comments`, {
      params: {
        cursor: cursor
      }
    })
  }
}


/**
* Redux Action for adding a newly created comment to the comments array
* @param {object} comment - The comment to be added
* @return {object} The redux action
*/
export const addNewComment = (comment) => {
  return {
    type: ADD_COMMENT_POST,
    payload: comment
  }
}
