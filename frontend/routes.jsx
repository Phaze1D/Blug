import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Intro from './components/Intro/Intro'
import Sessions from './components/Sessions/Sessions'
import Posts from './components/Posts/Posts'


export const routes = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Intro}>
      <IndexRoute component={Sessions}/>
      <Route path="/login" component={Sessions}/>
      <Route path="/posts" component={Posts}/>

    </Route>
  </Router>
)
