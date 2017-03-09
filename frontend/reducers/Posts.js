import * as types from '../actions/ActionTypes'


export const postNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_NEW}_LOADING`:
      return {
        ...state,
        fetching: true,
        success: false,
        post: null,
        errors: null
      }

    case `${types.POST_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        success: true,
        post: action.payload.data,
        errors: null
      }


    case `${types.POST_NEW}_ERROR`:
      return {
        ...state,
        fetching: false,
        success: false,
        post: null,
        errors: action.payload.response.data
      }

    case `${types.RESET_ERRORS}_POST`:
      return {
        ...state,
        success: false,
        errors: null
      }

    default: return state
  }
}

export const postEditReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_EDIT}_LOADING`:

      break;

    case `${types.POST_EDIT}_SUCCESS`:

      break;

    case `${types.POST_EDIT}_ERROR`:

      break;
    default: return state
  }
}

export const postGetReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_GET}_LOADING`:

      break;

    case `${types.POST_GET}_SUCCESS`:

      break;

    case `${types.POST_GET}_ERROR`:

      break;
    default: return state
  }
}

export const userPostsIndexReducer = (state=[], action) => {
  switch (action.type) {
    case `${types.USER_POSTS_INDEX}_LOADING`:

      break;

    case `${types.USER_POSTS_INDEX}_SUCCESS`:

      break;

    case `${types.USER_POSTS_INDEX}_ERROR`:

      break;
    default: return state
  }
}

export const postsIndexReducer = (state=[], action) => {
  switch (action.type) {
    case `${types.POSTS_INDEX}_LOADING`:
      return {
        ...state,
        fetching: true,
        posts: [],
      }

    case `${types.POSTS_INDEX}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        cursor: action.payload.data.cursor,
        more: action.payload.data.more,
        posts: action.payload.data.posts,
      }

    case `${types.POSTS_INDEX}_ERROR`:
      return {
        ...state,
        fetching: false,
        posts: [],
        error: action.payload.message
      }

    default: return state
  }
}
