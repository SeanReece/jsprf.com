import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga';
import { Provider } from 'react-redux'
import store from './store'

import './index.css'
import App from './App'

ReactGA.initialize('UA-80926706-1', { gaOptions: { siteSpeedSampleRate: 100 }});
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root'),
    )
  })
}
