import { ADD_DEPENDENCY_REQUEST, ADD_DEPENDENCY_SUCCESS, ADD_DEPENDENCY_FAILURE, REMOVE_DEPENDENCY } from '../actions/dependencies.action'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEPENDENCY_REQUEST:
      return [ ...state, { ...action.payload, isLoading: true } ]
    case ADD_DEPENDENCY_SUCCESS:
    case ADD_DEPENDENCY_FAILURE:
      return state.map(dep => {
        if (dep.name === action.payload.name) {
          return { ...action.payload, isLoading: false }
        }
        return dep
      })
    case REMOVE_DEPENDENCY:
      return state.filter((dep) => dep.name !== action.payload.name)
    default:
      return state
  }
}
