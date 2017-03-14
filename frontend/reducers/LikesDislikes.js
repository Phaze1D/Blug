import * as types from '../actions/ActionTypes'


/**
* Redux reducer for the async likeNewReducer action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async likeDeleteReducer action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async dislikeNewReducer action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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


/**
* Redux reducer for the async dislikeDeleteReducer action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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
