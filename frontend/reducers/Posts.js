import * as types from '../actions/ActionTypes'


export const postNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_NEW}_LOADING`:

      break;

    case `${types.POST_NEW}_SUCCESS`:

      break;

    case `${types.POST_NEW}_ERROR`:

      break;
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

      break;

    case `${types.POSTS_INDEX}_SUCCESS`:

      break;

    case `${types.POSTS_INDEX}_ERROR`:

      break;
    default: return state
  }
}
