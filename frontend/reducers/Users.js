import * as types from '../actions/ActionTypes'


export const userNewReducer = (state={}, action) => {
  let newState = null

  switch (action.type) {
    case `${types.USER_NEW}_LOADING`:
      return {
        ...state,
        fetching: true,
        loggedIn: false
      }

    case `${types.USER_NEW}_SUCCESS`:
      return {
        ...state,
        fetching: false,
        loggedIn: true
      }

    case `${types.USER_NEW}_ERROR`:
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        errors: action.payload.response.data
      }

    default: return state
  }
}


export const userGetReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.USER_GET}_LOADING`:

      break;

    case `${types.USER_GET}_SUCCESS`:

      break;

    case `${types.USER_GET}_ERROR`:

      break;

    default: return state
  }
}
