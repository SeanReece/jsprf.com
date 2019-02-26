import { combineReducers } from 'redux'
import scripts from './scripts.reducer'
import dependancies from './dependancies.reducer'
import benchmarks from './bench.reducer'

export default combineReducers({
  scripts,
  dependancies,
  benchmarks
})
