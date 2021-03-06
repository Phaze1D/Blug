import * as types from '../actions/ActionTypes'

/**
* Redux reducer for the async postNew action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const postNewReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_NEW}_LOADING`:
      return {
        ...state,
        fetching: true,
        post: null,
        errors: null
      }

    case `${types.POST_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        post: action.payload.data,
        errors: null
      }


    case `${types.POST_NEW}_ERROR`:
      return {
        ...state,
        fetching: false,
        post: null,
        errors: action.payload.response.data
      }

    case `${types.RESET_ERRORS}_POST`:
      return {
        ...state,
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


/**
* Redux reducer for the async postEdit action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const postEditReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POST_EDIT}_LOADING`:
      return {
        ...state,
        fetching: true,
        errors: null
      }

    case `${types.POST_EDIT}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        post: action.payload.data,
        errors: null
      }

    case `${types.POST_EDIT}_ERROR`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      }

    default: return state
  }
}


/**
* Redux reducer for the async postGet action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async postDelete action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async postsNextPage action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const postsNextPageReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POSTS_NEXT_PAGE}_LOADING`:
      return {
        ...state,
        fetching: true,
        error: null
      }

    case `${types.POSTS_NEXT_PAGE}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        cursor: action.payload.data.cursor,
        more: action.payload.data.more,
        error: null,
        posts: state.posts.concat(action.payload.data.posts)
      }

    case `${types.POSTS_NEXT_PAGE}_ERROR`:
      return {
        ...state,
        fetching: false,
        error: action.payload.message
      }

    default: return state
  }
}


/**
* Redux reducer for the async postsIndex action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const postsIndexReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.POSTS_INDEX}_LOADING`:
      return {
        ...state,
        fetching: true,
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
        error: action.payload.message
      }

    default: return state
  }
}


/**
* Redux reducer for the async search action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const searchReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.SEARCH}_LOADING`:
      return {
        ...state,
        fetching: true,
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
        error: action.payload.message
      }

    default: return state
  }
}


/**
* Redux reducer for the async likeNew action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async addUpdatePost action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async removePost action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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
