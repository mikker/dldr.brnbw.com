require('babel/polyfill')
import React from 'react'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { getProgramCard } from './actions'

const initialState = {
  url: window.location.search.replace(/^\?/, '')
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.url }
    case 'SET_PROGRAM_CARD':
      return { ...state, program_card: action.program_card }
    default:
      return state
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(reducer)

store.subscribe(() => console.log(store.getState()))

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>, document.getElementById('root')
)

document.addEventListener('DOMContentLoaded', () => {
  const url = store.getState().url
  if (url) {
    store.dispatch(getProgramCard())
  }
})
