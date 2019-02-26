import {
  BENCHMARK_START,
  BENCHMARK_COMPLETE,
  SCRIPT_BENCHMARK_ADD,
  SCRIPT_BENCHMARK_START,
  SCRIPT_BENCHMARK_COMPLETE,
  SCRIPT_BENCHMARK_ERROR
} from '../actions/bench.action'

const initialState = {
  inProgress: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BENCHMARK_START:
      return { inProgress: true }
    case BENCHMARK_COMPLETE:
      return { ...state, inProgress: false }
    case SCRIPT_BENCHMARK_ADD:
      return { ...state, [action.payload.id]: { id: action.payload.id, data: action.payload, inProgress: false } }
    case SCRIPT_BENCHMARK_START:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], inProgress: true } }
    case SCRIPT_BENCHMARK_COMPLETE:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], ...action.payload, inProgress: false } }
    case SCRIPT_BENCHMARK_ERROR:
      return { ...state, [action.payload.id]: { ...state[action.payload.id], error: action.payload.error, inProgress: false } }
    default:
      return state
  }
}
