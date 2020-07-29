import { combineReducers } from 'redux'
import scripts from './scripts.reducer'
import dependencies from './dependencies.reducer'
import benchmarks from './bench.reducer'
import settings from './settings.reducer'

export default combineReducers({
  scripts,
  dependencies,
  benchmarks,
  settings,
})
