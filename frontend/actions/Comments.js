import axios from "axios"
import {
  POST_COMMENT_NEW,
  COMMENT_EDIT,
  POST_COMMENT_INDEX
} from './ActionTypes'


const postCommentCreate = (post_id, comment) => {
  return {
    type: POST_COMMENT_NEW,
    payload: axios.post(`/post/${post_id}/comment/create`, {
      data: {
        comment: comment
      }
    })
  }
}


const commentEdit = (comment_id, comment) => {
  return {
    type: COMMENT_EDIT,
    payload: axios.put(`/comment/${comment_id}`, {
      data: {
        comment: comment
      }
    })
  }
}


const postCommentIndex = (post_id) => {
  return {
    type: POST_COMMENT_INDEX,
    payload: axios.get(`/post/${post_id}/comments`)
  }
}
