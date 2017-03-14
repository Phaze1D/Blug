import * as types from '../actions/ActionTypes'

/**
* Redux reducer for the async login action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const loginReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LOGIN}_LOADING`:
      return {
        ...state,
        fetching: true,
        loggedIn: false,
        currentUser: null,
        errors: null
      }

    case `${types.LOGIN}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        currentUser: action.payload.data,
        errors: null
      }

    case `${types.LOGIN}_ERROR`:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        currentUser: null,
        errors: action.payload.response.data
      }

    case `${types.RESET_ERRORS}_SESSION`:
      return {
        ...state,
        loggedIn: false,
        errors: null
      }

    default: return state
  }
}

/**
* Redux reducer for the async logout action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const logoutReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LOGOUT}_LOADING`:
      return{
        ...state,
        fetching: true,
        errors: null
      }

    case `${types.LOGOUT}_SUCCESS`:
      return{
        ...state,
        fetching: false,
        loggedIn: false,
        currentUser: null,
        errors: null
      }

    case `${types.LOGOUT}_ERROR`:
      return{
        ...state,
        fetching: false,
        errors: null
      }

    default: return state
  }
}

/**
* Redux reducer for the async verify action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const verifyReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.SESSION_VERIFY}_LOADING`:
      return {
        ...state,
        verifing: true,
        currentUser: null,
        loggedIn: false
      }

    case `${types.SESSION_VERIFY}_SUCCESS`:
      return {
        ...state,
        verifing: false,
        currentUser: action.payload.data,
        loggedIn: true
      }

    case `${types.SESSION_VERIFY}_ERROR`:
      return {
        ...state,
        verifing: false,
        currentUser: null,
        loggedIn: false
      }


    default: return state
  }
}
