import * as types from '../actions/ActionTypes'


/**
* Redux reducer for the globalErrorReducer action
* @param {object} state - previous immutable state
* @param {object} action - redux action
* @return {object} newly created state
*/
export const globalErrorReducer = (state={}, action) => {
  switch (action.type) {
    case `${types.SET_GLOBAL_ERROR}`:
      return {
        error: action.payload.message,
        show: action.payload.show
      }

    default: return state

  }
}
