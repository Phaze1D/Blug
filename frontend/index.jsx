import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promise from "redux-promise-middleware"
import logger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './routes'
import reducers from "./reducers/reducers"

import {userNew} from './actions/Users'

import './index.sass'


document.addEventListener("DOMContentLoaded", function(event) {
  injectTapEventPlugin()

  let middleware = applyMiddleware(logger(), promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))

  if(process.env.NODE_ENV === 'production'){
    middleware = applyMiddleware( promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))
  }
  const store = createStore(reducers, middleware)

  ReactDOM.render(
    <Provider store={store}>{routes()}</Provider>,
    document.getElementById('app')
  )
});
