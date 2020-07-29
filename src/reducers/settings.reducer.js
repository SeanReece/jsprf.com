import { TOGGLE_TRANSPILE } from '../actions/settings.action'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TRANSPILE:
      return { ...state, shouldTranspile: !state.shouldTranspile }
    default:
      return state
  }
}
