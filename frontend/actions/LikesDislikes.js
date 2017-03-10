import axios from "axios"
import {
  LIKE_NEW,
  LIKE_DELETE,
  DISLIKE_NEW,
  DISLIKE_DELETE
} from '../actions/ActionTypes'



export const likeNew = (post_id) => {
  return {
    type: LIKE_NEW,
    payload: axios.post(`/api/post/${post_id}/like`)
  }
}

export const likeDelete = (post_id) => {
  return {
    type: LIKE_DELETE,
    payload: axios.delete(`/api/post/${post_id}/like`)
  }
}


export const dislikeNew = (post_id) => {
  return {
    type: DISLIKE_NEW,
    payload: axios.post(`/api/post/${post_id}/dislike`)
  }
}


export const dislikeDelete = (post_id) => {
  return {
    type: DISLIKE_DELETE,
    payload: axios.delete(`/api/post/${post_id}/dislike`)
  }
}
