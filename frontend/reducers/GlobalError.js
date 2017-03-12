import * as types from '../actions/ActionTypes'


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
