import * as types from '../actions/ActionTypes'



export const likeNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LIKE_NEW}_LOADING`:

      break;

    case `${types.LIKE_NEW}_SUCCESS`:

      break;

    case `${types.LIKE_NEW}_ERROR`:

      break;

    default: return state
  }
}

export const likeDeleteReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LIKE_DELETE}_LOADING`:

      break;

    case `${types.LIKE_DELETE}_SUCCESS`:

      break;

    case `${types.LIKE_DELETE}_ERROR`:

      break;

    default: return state
  }
}

export const dislikeNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.DISLIKE_NEW}_LOADING`:

      break;

    case `${types.DISLIKE_NEW}_SUCCESS`:

      break;

    case `${types.DISLIKE_NEW}_ERROR`:

      break;

    default: return state
  }
}

export const dislikeDeleteReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.DISLIKE_DELETE}_LOADING`:

      break;

    case `${types.DISLIKE_DELETE}_SUCCESS`:

      break;

    case `${types.DISLIKE_DELETE}_ERROR`:

      break;

    default: return state
  }
}
