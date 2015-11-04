require('babel/polyfill')
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './App'
import { setUrl, getProgramCard } from './actions'
import * as reducers from './reducer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducers.stateReducer)

if (__DEV) { // eslint-disable-line
  store.subscribe(() => console.log(store.getState()))
}

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>, document.getElementById('root')
)

document.addEventListener('DOMContentLoaded', () => {
  const search = window.location.search.replace(/^\?/, '')
  if (search) {
    store.dispatch(setUrl(search))
    store.dispatch(getProgramCard())
  }
})

