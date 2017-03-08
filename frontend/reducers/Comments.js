import * as types from '../actions/ActionTypes'


export const postCommentNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_COMMENT_NEW}_LOADING`:

      break;

    case `${types.POST_COMMENT_NEW}_SUCCESS`:

      break;

    case `${types.POST_COMMENT_NEW}_ERROR`:

      break;

    default: return state
  }
}

export const commentEditReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.COMMENT_EDIT}_LOADING`:

      break;

    case `${types.COMMENT_EDIT}_SUCCESS`:

      break;

    case `${types.COMMENT_EDIT}_ERROR`:

      break;

    default: return state
  }
}

export const postCommentIndexReducer = (state=[], action) => {
  switch (action.type) {
    case `${types.POST_COMMENT_INDEX}_LOADING`:

      break;

    case `${types.POST_COMMENT_INDEX}_SUCCESS`:

      break;

    case `${types.POST_COMMENT_INDEX}_ERROR`:

      break;

    default: return state
  }
}
