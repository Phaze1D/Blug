export const POST_COMMENT_NEW    = 'POST_COMMENT_NEW'
export const COMMENT_EDIT        = 'COMMENT_EDIT'
export const POST_COMMENT_INDEX  = 'POST_COMMENT_INDEX'
export const POST_NEW            = 'POST_NEW'
export const POST_EDIT           = 'POST_EDIT'
export const POST_GET            = 'POST_GET'
export const USER_POSTS_INDEX    = 'USER_POSTS_INDEX'
export const POSTS_INDEX         = 'POSTS_INDEX'
export const LOGIN               = 'LOGIN'
export const LOGOUT              = 'LOGOUT'
export const USER_NEW            = 'USER_NEW'
export const USER_GET            = 'USER_GET'
export const SESSION_VERIFY      = 'SESSION_VERIFY'
export const RESET_ERRORS        = 'RESET_ERRORS'
export const ADD_NEW_POST        = 'ADD_NEW_POST'
export const ADD_UPDATE_POST     = 'ADD_UPDATE_POST'
export const LIKE_NEW            = 'LIKE_NEW'
export const LIKE_DELETE         = 'LIKE_DELETE'
export const DISLIKE_NEW         = 'DISLIKE_NEW'
export const DISLIKE_DELETE      = 'DISLIKE_DELETE'



export const resetErrors = (type) => {
  return {
    type: `${RESET_ERRORS}_${type}`
  }
}
