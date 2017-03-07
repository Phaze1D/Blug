import axios from "axios"


const POST_COMMENT_CREATE = (post_id, comment) => {
  return {
    type: 'POST_COMMENT_CREATE',
    payload: axios.post(`/post/${post_id}/comment/create`, {
      data: {
        comment: comment
      }
    })
  }
}


const COMMENT_EDIT = (comment_id, comment) => {
  return {
    type: 'COMMENT_EDIT',
    payload: axios.put(`/comment/${comment_id}`, {
      data: {
        comment: comment
      }
    })
  }
}


const POST_COMMENT_INDEX = (post_id) => {
  return {
    type: 'POST_COMMENT_INDEX',
    payload: axios.get(`/post/${post_id}/comments`)
  }
}
