import { ADD_SCRIPT, REMOVE_SCRIPT, UPDATE_SCRIPT } from '../actions/scripts.action'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCRIPT:
      return { ...state, [action.payload.id]: action.payload }
    case REMOVE_SCRIPT:
      const newState = { ...state }
      delete newState[action.payload.id]
      return newState
    case UPDATE_SCRIPT:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], ...action.payload } }
    default:
      return state
  }
}
