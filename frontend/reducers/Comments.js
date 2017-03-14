import * as types from '../actions/ActionTypes'


export const postCommentNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_COMMENT_NEW}_LOADING`:
      return {
        ...state,
        fetching: true,
        errors: null
      }

    case `${types.POST_COMMENT_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        comment: action.payload.data,
        errors: null
      }

    case `${types.POST_COMMENT_NEW}_ERROR`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      }

    case `${types.RESET_ERRORS}_COMMENT`:
      return {
        ...state,
        errors: null
      }

    default: return state
  }
}

export const postCommentIndexReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_COMMENT_INDEX}_LOADING`:
      return {
        ...state,
        fetching: true,
        error: null
      }

    case `${types.POST_COMMENT_INDEX}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        cursor: action.payload.data.cursor,
        more: action.payload.data.more,
        comments: [].concat(action.payload.data.comments),
        comments_post_id: action.payload.data.comments_post_id,
        error: null
      }

    case `${types.POST_COMMENT_INDEX}_ERROR`:
      return {
        ...state,
        fetching: false,
        error: action.payload.message
      }

    default: return state
  }
}

export const commentsNextPageReducer = (state={}, action) => {

  switch (action.type) {
    case `${types.COMMENTS_NEXT_PAGE}_LOADING`:
      return {
        ...state,
        fetching: true,
        error: null
      }

    case `${types.COMMENTS_NEXT_PAGE}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        cursor: action.payload.data.cursor,
        more: action.payload.data.more,
        comments: state.comments.concat(action.payload.data.comments),
        comments_post_id: action.payload.data.comments_post_id,
        error: null
      }

    case `${types.COMMENTS_NEXT_PAGE}_ERROR`:
      return {
        ...state,
        fetching: false,
        error: action.payload.message
      }

    default: return state
  }
}


export const addNewCommentReducer = (state={}, action) => {
  switch (action.type) {
    case types.ADD_COMMENT_POST:
      return {
        ...state,
        comments: [action.payload].concat(state.comments)
      }

    default: return state

  }
}
