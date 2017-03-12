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

    case `${types.SESSION_VERIFY}_SUCCESS`:
      return {
        ...state,
        post: null
      }

    default: return state
  }
}

export const postEditReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_EDIT}_LOADING`:
      return {
        ...state,
        fetching: true,
        success: false,
        errors: null
      }

    case `${types.POST_EDIT}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        success: true,
        post: action.payload.data,
        errors: null
      }

    case `${types.POST_EDIT}_ERROR`:
      return {
        ...state,
        fetching: false,
        success: false,
        errors: action.payload.response.data
      }

    default: return state
  }
}

export const postGetReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_GET}_LOADING`:
      return {
        ...state,
        fetching: true,
        post: null,
        errors: null
      }

    case `${types.POST_GET}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        post: action.payload.data,
        errors: null
      }

    case `${types.POST_GET}_ERROR`:
      return {
        ...state,
        fetching: false,
        post: null,
        errors: action.payload.message
      }

    default: return state
  }
}

export const postDeleteReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_DELETE}_LOADING`:
      return {
        ...state,
        fetching: true,
        post: null,
        errors: null
      }

    case `${types.POST_DELETE}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        post: null,
        errors: null
      }

    case `${types.POST_DELETE}_ERROR`:
      return {
        ...state,
        fetching: false,
        post: null,
        errors: action.payload.message
      }

    default: return state
  }
}


export const userPostsIndexReducer = (state={}, action) => {
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

export const postsIndexReducer = (state={}, action) => {
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

export const searchReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.SEARCH}_LOADING`:
      return {
        ...state,
        fetching: true,
        posts: [],
      }

    case `${types.SEARCH}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        cursor: action.payload.data.cursor,
        more: action.payload.data.more,
        posts: action.payload.data.posts,
      }

    case `${types.SEARCH}_ERROR`:
      return {
        ...state,
        fetching: false,
        posts: [],
        error: action.payload.message
      }

    default: return state
  }
}


export const addNewPostReducer = (state={}, action) => {

  switch (action.type) {
    case types.ADD_NEW_POST:
      return {
        ...state,
        posts: [action.payload].concat(state.posts)
      }

    default: return state

  }
}

export const addUpdatePostReducer = (state={}, action) => {
  switch (action.type) {
    case types.ADD_UPDATE_POST:
      let newState = {
        ...state,
        posts: [].concat(state.posts)
      }

      newState.posts[action.payload.index] = action.payload.post
      return newState
    default: return state

  }
}


export const removePostReducer = (state={}, action) => {
  switch (action.type) {
    case types.REMOVE_POST:
      let newPosts = [].concat(state.posts)
      let newState = {
        ...state,
        posts: newPosts
      }
      newState.posts.splice(action.payload.index,1)
      return newState
    default: return state

  }
}
