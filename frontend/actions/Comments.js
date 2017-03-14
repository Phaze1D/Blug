import axios from "axios"
import {
  POST_COMMENT_NEW,
  COMMENT_EDIT,
  POST_COMMENT_INDEX,
  ADD_COMMENT_POST,
  COMMENTS_NEXT_PAGE
} from './ActionTypes'


export const postCommentNew = (post_id, comment) => {
  let data = new FormData();
  data.append('comment', comment)

  return {
    type: POST_COMMENT_NEW,
    payload: axios.post(`/api/post/${post_id}/comment/create`, data)
  }
}


export const commentEdit = (comment_id, comment) => {
  let data = new FormData();
  data.append('comment', comment)

  return {
    type: COMMENT_EDIT,
    payload: axios.put(`/api/comment/${comment_id}`, data)
  }
}


export const postCommentIndex = (post_id) => {
  return {
    type: POST_COMMENT_INDEX,
    payload: axios.get(`/api/post/${post_id}/comments`)
  }
}

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


export const addNewComment = (comment) => {
  return {
    type: ADD_COMMENT_POST,
    payload: comment
  }
}
