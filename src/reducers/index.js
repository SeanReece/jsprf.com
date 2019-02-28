import { combineReducers } from 'redux'
import scripts from './scripts.reducer'
import dependencies from './dependencies.reducer'
import benchmarks from './bench.reducer'

export default combineReducers({
  scripts,
  dependencies,
  benchmarks
})
