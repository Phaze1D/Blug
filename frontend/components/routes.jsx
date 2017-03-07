import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Intro from './Intro/Intro'
import Sessions from './Sessions/Sessions'
import Posts from './Posts/Posts'


export const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Intro}>
      <IndexRoute component={Sessions}/>
      <Route path="/login" component={Sessions}/>
      <Route path="/post" component={Posts}/>

    </Route>
  </Router>
)
