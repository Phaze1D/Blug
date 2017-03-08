import * as types from '../actions/ActionTypes'

export const loginReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.LOGIN}_LOADING`:
      return {
        ...state,
        fetching: true,
        loggedIn: false
      }

    case `${types.LOGIN}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        loggedIn: true
      }

    case `${types.LOGIN}_ERROR`:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        errors: action.payload.response.data
      }

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
