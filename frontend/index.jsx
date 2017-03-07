import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promise from "redux-promise-middleware"
import injectTapEventPlugin from 'react-tap-event-plugin';
import { routes } from './components/routes'
import reducers from "./reducers/reducers"

import './index.sass'


document.addEventListener("DOMContentLoaded", function(event) {
  injectTapEventPlugin()

  // const middleware = applyMiddleware(promise())
  // const store = createStore(reducers, middleware)
  //
  // ReactDOM.render(
  //   <Provider store={store}>{routes()}</Provider>,
  //   document.getElementById('app')
  // )

  ReactDOM.render( routes(),
    document.getElementById('app')
  )
});
