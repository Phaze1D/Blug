import * as types from '../actions/ActionTypes'


/**
* Redux reducer for the async userNew action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
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
