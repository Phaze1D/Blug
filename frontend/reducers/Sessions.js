import * as types from '../actions/ActionTypes'

export const loginReducer = (state={}, action) => {
  let newState = null
  
  switch (action.type) {
    case `${types.LOGIN}_LOADING`:
      newState = {
        ...state,
        fetching: true,
        loggedIn: false
      }
      return newState

    case `${types.LOGIN}_SUCCESS`:
      newState = {
        ...state,
        fetching: false,
        loggedIn: true
      }
      return newState

    case `${types.LOGIN}_ERROR`:
      newState = {
        ...state,
        fetching: false,
        loggedIn: false,
        errors: action.payload.response.data
      }
      return newState

    default: return state
  }
}

export const logoutReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LOGOUT}_LOADING`:

      break;

    case `${types.LOGOUT}_SUCCESS`:

      break;

    case `${types.LOGOUT}_ERROR`:

      break;
    default: return state
  }
}

export const verifyReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.SESSION_VERIFY}_LOADING`:
      return {
        ...state,
        verifing: true
      }

    case `${types.SESSION_VERIFY}_SUCCESS`:
      return {
        ...state,
        verifing: false,
        loggedIn: true
      }

    case `${types.SESSION_VERIFY}_ERROR`:
      return {
        ...state,
        verifing: false,
        loggedIn: false
      }

    default: return state
  }
}
