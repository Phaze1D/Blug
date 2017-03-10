import * as types from '../actions/ActionTypes'



export const likeNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LIKE_NEW}_LOADING`:
      return {
        ...state,
        fetching: true
      }

    case `${types.LIKE_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false
      }

    case `${types.LIKE_NEW}_ERROR`:
      return {
        ...state,
        fetching: false
      }

    default: return state
  }
}

export const likeDeleteReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LIKE_DELETE}_LOADING`:
      return {
        ...state,
        fetching: true
      }

    case `${types.LIKE_DELETE}_SUCCESS`:
      return {
        ...state,
        fetching: false
      }

    case `${types.LIKE_DELETE}_ERROR`:
      return {
        ...state,
        fetching: false
      }

    default: return state
  }
}

export const dislikeNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.DISLIKE_NEW}_LOADING`:
      return {
        ...state,
        fetching: true
      }

    case `${types.DISLIKE_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false
      }

    case `${types.DISLIKE_NEW}_ERROR`:
      return {
        ...state,
        fetching: false
      }

    default: return state
  }
}

export const dislikeDeleteReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.DISLIKE_DELETE}_LOADING`:
      return {
        ...state,
        fetching: true
      }

    case `${types.DISLIKE_DELETE}_SUCCESS`:
      return {
        ...state,
        fetching: false
      }

    case `${types.DISLIKE_DELETE}_ERROR`:
      return {
        ...state,
        fetching: false
      }

    default: return state
  }
}
