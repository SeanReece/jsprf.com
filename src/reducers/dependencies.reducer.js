import { ADD_DEPENDANCY_REQUEST, ADD_DEPENDANCY_SUCCESS, ADD_DEPENDANCY_FAILURE, REMOVE_DEPENDANCY } from '../actions/dependencies.action'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEPENDANCY_REQUEST:
      return [ ...state, { ...action.payload, isLoading: true } ]
    case ADD_DEPENDANCY_SUCCESS:
    case ADD_DEPENDANCY_FAILURE:
      return state.map(dep => {
        if (dep.name === action.payload.name) {
          return { ...action.payload, isLoading: false }
        }
        return dep
      })
    case REMOVE_DEPENDANCY:
      return state.filter((dep) => dep.name !== action.payload.name)
    default:
      return state
  }
}
