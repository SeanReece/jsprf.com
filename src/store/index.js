import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers', () => {
    store.replaceReducer(reducers)
  })
}

export default store
