import * as types from '../actions/ActionTypes'


export const userNewReducer = (state={}, action) => {
  let newState = null

  switch (action.type) {
    case `${types.USER_NEW}_LOADING`:
      newState = {
        ...state,
        fetching: true,
        loggedIn: false
      }
      return newState

    case `${types.USER_NEW}_SUCCESS`:
      newState = {
        ...state,
        fetching: false,
        loggedIn: true
      }
      return newState


    case `${types.USER_NEW}_ERROR`:
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